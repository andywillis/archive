var us = require('underscore')
	,	core = require('./core')
	,	fs = require('fs')

var getBlogPosts = function(callback) {
	db.view('Post/dateCreated', function(err, data) {	
		if (err) console.log(err)
		else callback(data)
	})
}

var getDashboardData = function(callback) {
	var items = [], limit = 10, count = 0, record = 0
	for (var p = 0, l = limit; p<l; p++){ 
		items.push(app.db[p])
	}
/*
	while (count < 10){
		if (app.db[record].type === 'Post') {			
			items.push(app.db[record])
			count ++
		}
		record ++
	}
*/
	callback(items)
}

var deleteItem = function(form) {
	var newArr
	for (item in app.db) {
		if (app.db[item]._id === form.id) {
			app.db.splice(item,1)
			var newDate = core.getFileDate()
			var db = JSON.stringify(app.db, null, '\t')
			fs.writeFile(app.ROOT + '/server/db/dev.deviation', db)
			if (app.ENV === 'prod') {
				app.dropbox.put('db/' + newDate + '.deviation', db, function(status, reply) {
					console.log('Backup created'.ok)
				})
			}
			core.loadPostsToMemory()
			break
		}
	}
}

var loadItems = function(options, callback) {

	var type = options.type

	if (type === 'all') {
		callback(app.db)
	} else {
		var action = options.action
			,	item = options.item
			,	title = options.title
			,	limit = options.limit
			,	page = options.page
			,	db = (type === 'posts') ? 'blog' : 'spotmapDB'
			,	from = (page <= 0) ? 0 : (limit*page)
			,	to = (from + limit < app[db][type].length) ? from + limit : app[db][type].length
			
		if (item === null) {
			var data = core.jsonPath(app[db], '$..' + type)
				,	from = (page <= 0) ? 0 : (limit*page)
				,	to = (from + limit < data[0].length) ? from + limit : data[0].length

			callback([data[0].slice(from,to),data[0].length,from,to])
		}
		else {
			switch(action) {
				case 'view':
					data = core.jsonPath(app[db], '$..'+ type + '[?(@._id==="' + item + '")]')
					break;
				case 'tag':
					data = core.jsonPath(app[db], '$..'+ type + '[?(@.tags.indexOf("' + core.decode(item) + '") > -1)]')
					break;
				case 'category':
					data = core.jsonPath(app[db], '$..'+ type + '[?(@.category==="' + core.decode(item) + '")]')
					break;
				case 'director':
					data = core.jsonPath(app[db], '$..'+ type + '[?(@.director==="' + core.decode(item) + '")]')
					break;
				case 'writer':
					data = core.jsonPath(app[db], '$..'+ type + '[?(@.writer.indexOf("' + core.decode(item) + '") > -1)]')
					break;
			}
			from = (page <= 0) ? 0 : (limit*page)
			to = (from + limit < data.length) ? from + limit : data.length
			callback([data.slice(from,to), data.length, from, to])
		}
	}
}

var loadSpotmapsWithTag = function(tag, callback) {
	;(tag === null)
		?	data = core.jsonPath(app.spotmapDB, '$..spotmaps')
		: data = core.jsonPath(app.spotmapDB, '$..spotmaps[?(@.tags.indexOf("' + core.decode(tag) + '") > -1)]')
	callback(data)
}

var loadSpotmapsWithCategory= function(category, callback) {
	;(category === null)
		?	data = core.jsonPath(app.spotmapDB, '$..spotmaps')
		: data = core.jsonPath(app.spotmapDB, '$..spotmaps[?(@.category==="' + core.decode(category) + '")]')
	callback(data)
}

var savePost = function(data) {
	var tags = require('./tag')
	
	if (data.id) {
		var id = data.id
		var appPos = (function(){
			for(post in app.db) {
				if (app.db[post]._id === data.id) return post
			}
		}())
		var blogPos = (function(){
			for(post in app.blog.posts) {
				if (app.blog.posts[post]._id === data.id) return post
			}
		}())
	} else {
		var id = core.randomString(32)
	}

	data.type = 'Post', data._id = id, data.dateCreated = data.lastUpdated = new Date()
	if (data.id) {
		app.db.splice(appPos,1,data)
		app.blog.posts.splice(blogPos,1,data)
	} else{	
		app.db.unshift(data)
		app.blog.posts.unshift(data)
	}
	tags.saveTagsToMemory(data.tags)
	console.log('Post added'.ok)
	var newDate = core.getFileDate()
	var db = JSON.stringify(app.db, null, '\t')
	fs.writeFile(app.ROOT + '/server/db/dev.deviation', db)
	if (app.ENV === 'prod') {
		app.dropbox.put('db/' + newDate + '.deviation', db, function(status, reply) {
			console.log('Backup created'.ok)
		})
	}
	require('./rss').writeBlogRSS()

}

var saveSpotmap = function(data) {
	var tags = require('./tag')
		,	id = core.randomString(32)

	data.type = 'Spotmap', data._id = id, data.dateCreated = data.lastUpdated = new Date()
//	app.spotmapDB.spotmaps.unshift(data)
	app.db.unshift(data)
	tags.saveSpotmapTagsToMemory(data.tags)
	console.log('Post added'.ok)
	var newDate = core.getFileDate()
	var db = JSON.stringify(app.db, null, '\t')
	fs.writeFile(app.ROOT + '/server/db/dev.deviation', db)
	if (app.ENV === 'prod') {
		app.dropbox.put('db/' + newDate + '.deviation', db, function(status, reply) {
			console.log('Backup created'.ok)
		})
	}
	require('./rss').writeBlogRSS()
}

exports.getDashboardData = getDashboardData
exports.loadItems = loadItems
exports.loadSpotmapsWithTag = loadSpotmapsWithTag
exports.loadSpotmapsWithCategory = loadSpotmapsWithCategory
exports.savePost = savePost
exports.deleteItem = deleteItem
exports.saveSpotmap = saveSpotmap