var processList = require('./core').processList
	,	ops = require('./operations')

var getContent = function(callback) {

	ops.getDashboardData(function(dashboardData) {
		var processData = function(entry, iteration, object, callback) {
			var entry = entry
				,	portal = '<a href="/#{page}/view/#{id}/#{title}"><div class="dashboardStrip #{type}"><img src="/client/images/db_#{img}.png" />#{label}</div></a>'

			if (entry.type.toLowerCase() === 'post') page = 'blog'
			if (entry.type.toLowerCase() === 'spotmap') page = 'spotmaps'

			portal = portal.replace(/#{page}/g, page)
										 .replace(/#{id}/g, entry._id)
										 .replace(/#{title}/g, entry.title.replace(/ /g, '_').toLowerCase())
										 .replace(/#{type}/g, entry.type.toLowerCase() + 'strip')
										 .replace(/#{img}/g, entry.type.toLowerCase())
 										 .replace(/#{label}/g, entry.title)

			object.push(portal)
			callback(object, iteration)
		}
		
		// Main logic

		var content = '<div class="dashboard"><div class="strips">#{main}</div></div>'
		
		switch(dashboardData) {
			case '':
				content = content.replace('#{main}', 'No data')
				callback(content)
			break
			default:
				var portals = []
				processList(dashboardData, processData, portals, function(array) {
					content = content.replace('#{main}', array.join(''))
					callback(content)
				})
			break
		}
	})

}

exports.getContent = getContent