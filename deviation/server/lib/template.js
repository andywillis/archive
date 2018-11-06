var 	fs = require('fs')
		,	processList = require('./core').processList

/*	--	Looks in the templates folder and loads the
		--	templates into the application object.
*/

var init = function(callback) {
	var templatesFolder = app.ROOT + '/server/data/templates'
		,	templates = {}

	fs.readdir(templatesFolder, function(err, list) {
		if (err) console.log('Error loading templates.')
		else {
			processList(list, loadTemplate, templates, function(templates) {
				callback(templates)
			})
		}
	})

	var loadTemplate = function(entry, iteration, object, callback) {
		fs.readFile(templatesFolder + '/' + entry, 'utf-8', function(err, data) {
			if (err) console.log('Error loading ' + entry + ' template.')
			else {
				var property = entry.split('.')[0]
				object[property] = data
				callback(object, iteration)
			}
		})
	}

}

exports.init = init