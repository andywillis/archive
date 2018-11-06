var	us 		= require('underscore')
	,	async = require('async')
	,	dbox 	= require('dbox')
	,	fs 		= require('fs')
	,	core 	= require('./core')

/*	--	Init() loads the controllers, templates and markdown.
		--	It sets up the dropbox connection.
		--	Originally it set up the connection to the database,
		--	but this was abandoned late in the programme for reasons of performance
		--	and flexibilty.	The data is stored as a JSON object on dropbox.
*/

var init = function(callback) {

	async.parallel([

		function(callback) {
			control = require('./controller').control
			console.log('Controls loaded'.ok)
			callback(null, control)
		},

		function(callback) {
			if (us.indexOf(app.stack, 'templates') >= 0) {
				require('./template').init(function(templates) {
					console.log('Templates loaded'.ok)
					callback(null, templates)
				})
			} else {
				callback(null, null)
			}
		},

		function(callback) {
			if (us.indexOf(app.stack, 'markdown') >= 0) {
				require('./markdown').init(function(markdown) {
					console.log('Markdown loaded'.ok)
					callback(null, markdown)
				})
			} else {
				callback(null, null)
			}
		},

		function(callback) {
			switch(app.ENV) {
				case 'prod':
					if (us.indexOf(app.stack, 'dropbox') >= 0) {
						var d = dbox.app({app_key: app.dropbox.consumer_key, app_secret: app.dropbox.consumer_secret})
						app.dropbox = d.client(app.dropbox.access_token)
		  			app.dropbox.metadata('db', function(status, data) {
		  				var files = us.sortBy(data.contents, function(el) { return el.revision	})
		  				var dbInfo = files[files.length-1]
		  				app.dropbox.get(dbInfo.path, function(status, data, metadata) {
		  					app.db = JSON.parse(data.toString())
								core.loadPostsToMemory()
								callback(null, null)
		  				})
		  			})
			  	}
		  		else {
						callback(null, null)
					}
				break;
				case 'dev':
					fs.readFile(app.ROOT + '/server/data/db/dev.deviation', 'utf-8', function(err, data) {
						if (err) console.log('Error loading dev db file.')
						else {
	  					app.db = JSON.parse(data.toString())
							core.loadPostsToMemory()
							callback(null, null)
						}
					})
				break;
			}
		},

	],

	function(err, results){
		app.control = results[0]
		app.templates = results[1]
		app.markdown = results[2]
		callback()
	})

}

exports.init = init