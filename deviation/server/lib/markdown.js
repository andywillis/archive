var fs = require('fs')
		,	processList = require('./core').processList

/*	--	Looks in the markdown folder and loads the
		--	markdown into the application object. The markdown is
		--	specifically used for the main pages of the site where
		--	the pages are not programmatically produced.
*/

var init = function(callback) {
	var markdownFolder = app.ROOT + '/server/data/markdown'
		,	markdown = {}

	fs.readdir(markdownFolder, function(err, list) {
		if (err) console.log('Error')
		else {
			processList(list, loadMarkdown, markdown, function(markdown) {
				callback(markdown)
			})
		}
	})

	var loadMarkdown = function(entry, iteration, object, callback) {
		fs.readFile(markdownFolder + '/' + entry, 'utf-8', function(err, data) {
			if (err) console.log('Error loading markdown.')
			else {
				var property = entry.split('.')[0]
				object[property] = data
				callback(object, iteration)
			}
		})
	}

}

exports.init = init