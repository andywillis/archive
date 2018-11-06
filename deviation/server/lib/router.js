var route = function(req, res) {

	// Dependancies
	var us = require('underscore')

	// Main
	createReqObj(req, function(reqObj) {

		var pageName = reqObj.page.name
			,	isStaticFile = (us.isEmpty(reqObj.file)) ? false : true
			,	control = reqObj.page.control
			,	isControl = (typeof app.control[control] === 'function')

		;(isStaticFile)
			? app.control['static'](reqObj, res)
			: (isControl)
				? app.control[control](reqObj, res)
				: app.control['error'](reqObj, res)

		require('./metrics').store(req);
			
	})

}

var createReqObj = function(req, callback) {

	// Dependancies
	var async = require('async')
		,	querystring = require('querystring')
		,	url = require('url')
		,	categorizr = require('./categorizr')
		,	us = require('underscore')
		,	contentTypes = app.contentTypes
		, objectTypes = app.objectTypes
		,	formidable = require('formidable')
		,	form = new formidable.IncomingForm()

	// Variables
	var reqUrl = req.url
		,	path = url.parse(reqUrl).pathname
		,	query = url.parse(reqUrl).query || ''
		,	pathArray = us.compact(path.split('/'))
		,	lastElement = pathArray[pathArray.length-1] || []
		, device = categorizr.test(req.headers['user-agent'])
		,	reqObj = { path: path, device: device, file:{}, page:{}, form:{} }

	isStaticFile = (lastElement.indexOf('.') !== -1) ? true : false
	
	switch(isStaticFile) {
		case true:
			var f = reqObj.file
			f.name = lastElement.split('.')[0]
			f.ext = us.last(lastElement.split('.'))
			f.contentType = contentTypes[f.ext] || ''
			f.cache = contentTypes[f.ext[1]] || 'nocache'	
			if (f.contentType === '') console.log(('Missing content type for ' + f.ext).warn)
			callback(reqObj)
			break;

		// Grab the page info any form info in parallel
		case false:
			async.parallel([
				function(callback) {
					var page = reqObj.page
					page.name = pathArray[0] || 'home'
					page.objectType = objectTypes[page.name] || ''
					page.objectLimit = (device === 'mobile') ? 1 : app.limit
					page.control = '/' + (pathArray[0] || '')
					page.action = pathArray[1] || ''
					page.item = pathArray[2] || null
					page.title = pathArray[3] || ''
					page.query = (query !== '') ? querystring.parse(query) : {}
					callback(null, page)
				},
				function(callback) {
					var fields = {}
					if (req.method === 'POST') {
						form.parse(req, function(err, fields, files) {
							callback(null, fields)
						})
					} else {
						callback(null,fields)
					}
				}
			],
			function(err, results){
				reqObj.page = results[0]
				reqObj.form = results[1]
				callback(reqObj)
			})
			break;
	}

}

exports.route = route