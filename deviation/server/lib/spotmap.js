var processList = require('./core').processList
	,	canvas = require('./canvas')

var processSpotmap = function(entry, iteration, object, callback) {
	var data = entry
		,	getTagList = require('./tag').getTagList
		,	tagList = getTagList(data.tags.sort(), 'spotmaps')
		,	rgba = eval(data.rgba)
		,	swatchSize = 12
		,	swatchData = require('./canvas').getSwatchData(rgba, swatchSize)
		,	swatchJSON = JSON.stringify(swatchData)
		,	async = require('async')
		,	getWriters = function(writer) { 
				switch(typeof writer) {
					case 'object':
						var string = ''
						for (var w = 0, len = writer.length; w < len; w ++) {
							string += '<a href="/spotmaps/writer/' + writer[w] + '">' + writer[w] + '</a>'
							if (w < len - 1) string += ' & '
						}
						return string
						break;
					case 'string':
						return '<a href="/spotmaps/writer/' + writer + '">' + writer + '</a>'
						break;
				}
			return (typeof writer === 'object') ? writer.join(', ') : writer
			}
		,	description = '<p>Directed by #{director}.</p><p>Written by #{writer}.</p>'
				.replace('#{director}', '<a href="/spotmaps/director/' + data.director + '">' + data.director + '</a>')
				.replace('#{writer}', getWriters(data.writer))

	async.parallel([

		function(callback) {
			require('./canvas').createSpotmap(rgba, function(data) {
				var image = '<img class="spotmapImg" src="' + data.toDataURL() + '" />'
				callback(null, image)
			})
		},
		function(callback) {
			require('./canvas').createSwatchImage(swatchData, function(data) {
				var swatch = '<img class="swatchImg" src="' + data.toDataURL() + '" />'
				callback(null, swatch)
			})
		}
	],

	function(err, results){
		spotmap = app.templates.spotmap.replace('#{title}', data.title)
			.replace('#{body}', results[0])
			.replace(/#{docid}/g, data._id)
			.replace('#{urlTitle}', data.title.replace(/ /g,'_').toLowerCase())
			.replace('#{tags}', tagList)
			.replace('#{description}', description)
			.replace('#{date}', '' /*data.date*/)
			.replace('#{swatch}', results[1])
			.replace('#{ASE}', 'title=' + data.title + '&size=' + swatchSize + '&data=' + swatchJSON)
			.replace('#{spotmapId}', data.spotmapId)
			.replace(/#{category}/g, data.category)
		object.push(spotmap)
		callback(object, iteration)
	})

}

var getContent = function(reqObj, callback) {

	// Dependancies
	var us = require('underscore')
		,	processList = require('./core').processList
		,	ops = require('./operations')

	// Variables
	var action = reqObj.page.action || 'view'
		,	wrapper = '<div id="spotmapGallery">#{content}</div>'
		,	content = ['#{main}','<section id="links">#{links}</section>','<section id="rightSidebar">#{categories}#{tags}</section>','<div id="postForm" hidden>#{addPost}</div>','<div id="deleteForm" hidden>#{deleteItem}</div>'].join('')
		,	currentDate = new Date
		,	addSpotmap = app.templates.addSpotmap.replace('#{currentDate}', currentDate)
		,	selectOptions = '', categoryItems = '',	tagItems = '', item = ''
		,	categoryMenu = '<div id="categoryList"><h2>Categories</h2><ul>#{data}</ul></div>'
		,	tagMenu = '<div id="tagList"><h2>Tags</h2><ul>#{data}</ul></div>'

	// Main

	var postCats = app.spotmapDB.categories
		,	defCats = app.categories.spotmaps

	for (o in defCats) {
		var isCategoryUsed = (us.indexOf(postCats, defCats[o]) !== -1) ? true : false
		if (isCategoryUsed) categoryItems += '<li class="category"><a href="/spotmaps/category/' + defCats[o] + '">' + defCats[o] + '</a></li>'
		selectOptions += '<option value="' + defCats[o] + '">' + defCats[o] + '</option>'
	}

	var tags = app.spotmapDB.tags
	for (var idx = 0, tlen = tags.length-1; idx < tlen; idx ++) {
		var tag = tags[idx]
		tagItems += '<li class="tag"><a href="/spotmaps/tag/' + tag + '">' + tag + '</a></li>'
	}

	categoryMenu = categoryMenu.replace('#{data}', categoryItems)
	tagMenu = tagMenu.replace('#{data}', tagItems)
	addSpotmap = addSpotmap.replace('#{options}', selectOptions)
	content = content.replace('#{addSpotmap}', addSpotmap)
		.replace('#{categories}', categoryMenu)
		.replace('#{tags}', tagMenu)

	var options = {
			type: 'spotmaps'
		,	path: reqObj.path
		,	action: reqObj.page.action
		,	item: reqObj.page.item
		,	title: reqObj.page.title
		,	limit: reqObj.page.objectLimit
		,	page: reqObj.page.query.page || 0
	}

	ops.loadItems(options, function(array) {
		var data = array[0]
			,	len = array[1]
			,	from = array[2]+1
			, to = array[3]
			,	spotmaps = []
			,	linksMenu = '#{links}'
//			,	linksMenu = '<ul id="postMenu"><li class="bold">Spotmaps (#{from} to #{to} of #{count})</li>#{links}</ul>'
					.replace('#{count}', len)
					.replace('#{from}', from)
					.replace('#{to}', to)
			,	links = []
			,	page = parseInt(options.page)
			,	limit = parseInt(options.limit)
			,	lessPage = parseInt(options.page) - 1
			,	morePage = parseInt(options.page) + 1

//		for (el in data) { links.push('<li class="link"><a href="#' + data[el]._id + '">' + data[el].title + '</a></li>') }
		if (lessPage*limit > -1) links.push('<div class="less"><a href="' + reqObj.path + '?page=' + lessPage + '"><< Less</a></div>')
		if (morePage*limit <= len) links.push('<div class="more"><a href="' + reqObj.path + '?page=' + morePage + '">More >></a></div>')

		processList(data, processSpotmap, spotmaps, function(array) {
			content = content
				.replace('#{main}', array.join(''))
				.replace('#{links}', linksMenu.replace('#{links}',links.join('')))

			if (options.action === 'view') {
				var deleteItem = app.templates.deleteItem.replace('#{id}', data[0]._id)
				content = content.replace('#{deleteItem}', deleteItem)
			}

			wrapper = wrapper.replace('#{content}', content)
			callback(wrapper)
		})
	})

}

exports.getContent = getContent