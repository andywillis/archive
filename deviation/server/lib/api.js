var core = require('./core')

var getData = function(query, callback) {
	
	var type = query.type
		,	category = query.category || ''
		,	tag = query.tag || ''
		,	db = ''
		,	result = ''
		,	json = ''

	if (type === 'posts') db = 'blog'
	if (type === 'spotmaps') db = 'spotmapDB'

	if (category === '' && tag === '') {
		result = core.jsonPath(app[db], '$..' + type)[0]
	} else {
		if (category != '') result = core.jsonPath(app[db], '$..' + type + '[?(@.category==="' + core.decode(category) + '")]')
		if (tag != '') result = core.jsonPath(app[db], '$..' + type + '[?(@.tags.indexOf("' + core.decode(tag) + '") >-1)]')
	}

	json = JSON.stringify(result, null, 2)

	callback(json)

}

exports.getData = getData