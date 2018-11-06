// Get tag list
var getTagList = function(arr, type){
	var tags = '<ul>#{tags}</ul>'
		,	tagList = ''

	for (var t = 0, tl = arr.length; t < tl; t++){
		tagList += '<li><a href="/' + type + '/tag/' + arr[t] +'">' + arr[t] + '</a></li>'
	}
	
	tags = tags.replace('#{tags}', tagList)
	return tags
}

var saveTagsToMemory = function(tags) {
	var tagExists
	for (t in tags) {
		tagExists =  (app.blog.tags.indexOf(tags[t]) > -1) ? true : false
		if (tagExists === false) app.blog.tags.push(tags[t])
	}
	app.blog.tags.sort()
}

var saveSpotmapTagsToMemory = function(tags) {
	var tagExists
	for (t in tags) {
		tagExists =  (app.spotmapDB.tags.indexOf(tags[t]) > -1) ? true : false
		console.log(tagExists);
		if (tagExists === false) app.spotmapDB.tags.push(tags[t])
	}
	app.spotmapDB.tags.sort()
}

exports.getTagList = getTagList
exports.saveTagsToMemory = saveTagsToMemory
exports.saveSpotmapTagsToMemory = saveSpotmapTagsToMemory