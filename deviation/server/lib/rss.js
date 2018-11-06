var renderRSS = function(content) {
	var fs = require('fs')
	var fileStream = fs.createWriteStream(app.ROOT + '/client/rss/deviation.rss', {flags: 'w', encoding: 'utf-8', mode: 0666})
	fileStream.write(content)
	fileStream.end()
	console.log('RSS created')
}

var processPostRSS = function(entry, iteration, object, callback) {
	var marked = require('marked')
	var data = entry

	switch(data.type) {
		case 'Post':
			postRSS = app.templates.postRSS.replace('{title}', data.title)
				.replace('{description}', marked(data.post))
				.replace('{link}', 'http://deviation.nodejitsu.com/blog/view/' + data._id)
				.replace('{date}', data.date)
			object.posts.push(postRSS)
		break;
		case 'Spotmap':
			postRSS = app.templates.postRSS.replace('{title}', data.title)
				.replace('{description}', 'Spotmap image.')
				.replace('{link}', 'http://deviation.nodejitsu.com/spotmaps/view/' + data._id)
				.replace('{date}', data.date)
			object.spotmaps.push(postRSS)
		break;
	}

	callback(object, iteration)
}

var writeBlogRSS = function() {
	var processList = require('./core').processList
		,	ops = require('./operations')
		,	docid = startKey = null
		,	content = '<?xml version="1.0"?><rss version="2.0"><channel><title>Deviation blog feed</title><link>http://deviation.nodejitsu.com</link><description>All the posts from the Deviation blog.</description>#{posts}</channel><channel><title>Deviation spotmap feed</title><link>http://deviation.nodejitsu.com</link><description>All the spotmaps from the Deviation site.</description>#{spotmaps}</channel></rss>'

	var options = { type: 'all' }

	ops.loadItems(options, function(data){
		var items = {}
		items.posts = []
		items.spotmaps = []
		processList(data, processPostRSS, items, function(data) {
			content = content.replace('#{posts}', data.posts).replace('#{spotmaps}', data.spotmaps)
			renderRSS(content)
		})
	})
}

exports.writeBlogRSS = writeBlogRSS