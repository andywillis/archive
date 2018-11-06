var processPost = function processPost(entry, iteration, object, callback) {

	// Dependancies
	var marked = require('marked')
	var core = require('./core')

	// Variables
	var data = entry
		,	getTagList = require('./tag').getTagList
		,	tagList = getTagList(data.tags.sort(), 'blog')
		,	post = app.templates.post
				.replace('#{title}', data.title)
				.replace('#{body}', marked(data.post))
				.replace('#{markup}', data.post)
				.replace(/#{docid}/g, data._id)
				.replace('#{urlTitle}', data.title.replace(/ /g,'_').toLowerCase())
				.replace('#{tags}', tagList)
				.replace('#{date}', '' /*data.date*/)
				.replace('#{postId}', data.postId)
				.replace(/#{category}/g, data.category)

	// Main
	object.push(post)
	callback(object, iteration)

}

var getContent = function(reqObj, callback) {

	// Dependancies
	var us = require('underscore')
		,	processList = require('./core').processList
		,	ops = require('./operations')

	// Variables
	var action = reqObj.page.action || 'view'
		,	wrapper = '<div id="posts">#{content}</div>'
		,	content = ['#{main}','<section id="links">#{links}</section>','<section id="rightSidebar">#{categories}#{tags}</section>','<div id="postForm" hidden>#{addPost}</div>','<div id="editForm" hidden>#{editPost}</div>','<div id="deleteForm" hidden>#{deleteItem}</div>'].join('')
		,	currentDate = new Date
		,	addPost = app.templates.addPost.replace('#{currentDate}', currentDate)
		,	selectOptions = '', categoryItems = '',	tagItems = '', item = ''
		,	categoryMenu = '<div id="categoryList"><h2>Categories</h2><ul>#{data}</ul></div>'
		,	tagMenu = '<div id="tagList"><h2>Tags</h2><ul>#{data}</ul></div>'

	// Main

	var postCats = app.blog.categories
		,	defCats = app.categories.blog

	for (o in defCats) {
		var isCategoryUsed = (us.indexOf(postCats, defCats[o]) !== -1) ? true : false
		if (isCategoryUsed) categoryItems += '<li class="category"><a href="/blog/category/' + defCats[o] + '">' + defCats[o] + '</a></li>'
		selectOptions += '<option value="' + defCats[o] + '">' + defCats[o] + '</option>'
	}

	var tags = app.blog.tags
	for (var idx = 0, tlen = tags.length; idx < tlen; idx ++) {
		var tag = tags[idx]
		tagItems += '<li class="tag"><a href="/blog/tag/' + tag + '">' + tag + '</a></li>'
	}

	categoryMenu = categoryMenu.replace('#{data}', categoryItems)
	tagMenu = tagMenu.replace('#{data}', tagItems)
	addPost = addPost.replace('#{options}', selectOptions)
	content = content.replace('#{addPost}', addPost)
		.replace('#{categories}', categoryMenu)
		.replace('#{tags}', tagMenu)

	var options = {
			type: 'posts'
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
			,	posts = []
			,	linksMenu = '#{links}'
//			,	linksMenu = '<ul id="postMenu"><li class="bold">Posts (#{from} to #{to} of #{count})</li>#{links}</ul>'
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

		processList(data, processPost, posts, function(array) {
			content = content
				.replace('#{main}', array.join(''))
				.replace('#{links}', linksMenu.replace('#{links}', links.join('')))

			if (options.action === 'view') {
				var deleteItem = app.templates.deleteItem.replace('#{id}', data[0]._id)
					,	editPost = app.templates.editPost.replace('#{currentDate}', currentDate)
							.replace('#{id}', data[0]._id)
							.replace('#{title}', data[0].title)
							.replace('#{body}', data[0].post)
							.replace('#{tags}', data[0].tags.join(','))
							.replace('#{options}', selectOptions.replace('value="' + data[0].category + '"', 'value="' + data[0].category + '" selected'))
				content = content
										.replace('#{deleteItem}', deleteItem)
										.replace('#{editPost}', editPost)
			}

			wrapper = wrapper.replace('#{content}', content)
			callback(wrapper)

		})
	})

}

exports.getContent = getContent