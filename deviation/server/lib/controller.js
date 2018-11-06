var inspect 		= require('util').inspect
	,	fs 					= require('fs')
	,	us 					= require('underscore')
	,	marked 			= require('marked')
	,	processList = require('./core').processList
	, core 				= require('./core')
	,	ops 				=	require('./operations')

//--- HOME/DASHBOARD --------------------------------------------------------------------------------------------------------------

var home = function(reqObj, res) {
	require('./dashboard').getContent(function(content) {
		renderHTML(reqObj, content, res)
	})
}

//--- BLOG --------------------------------------------------------------------------------------------------------------

var blog = function(reqObj, res) {
	require('./blog').getContent(reqObj, function(content){
		renderHTML(reqObj, content, res)
	})
}

//--- SPOTMAPS --------------------------------------------------------------------------------------------------------------

var spotmaps = function(reqObj, res) {
	require('./spotmap').getContent(reqObj, function(content) {
		renderHTML(reqObj, content, res)
	})
}

//--- API --------------------------------------------------------------------------------------------------------------

var api = function(reqObj, res) {
	var page = reqObj.page.name
		,	isQuery = (us.keys(reqObj.page.query).length > 0) ? true : false

	switch(isQuery){
		case true:
			require('./api').getData(reqObj.page.query, function(json){
				var content = json
				renderHTML(reqObj, content, res)
			})
			break;
		case false:
			var content = '<div class="content">#{content}</div>'
				.replace('#{content}', marked(app.markdown[page]))
			renderHTML(reqObj, content, res)
			break;
	}

}

//--- WIP --------------------------------------------------------------------------------------------------------------

var wip = function(reqObj, res) {
	var page = reqObj.page.name
			,	content = marked(app.markdown[page])

	renderHTML(reqObj, content, res)
}

var tweetnation = function(reqObj, res) {
	var page = reqObj.page.name
//		,	content = app.templates.tweetnation
	
	require('./tweetnation').info(function(data) {
		var content = data
		renderHTML(reqObj, content, res)
	})

}

//--- CONTACT --------------------------------------------------------------------------------------------------------------

var contact = function(reqObj, res) {
	var page = reqObj.page.name

			var content = '<div class="content">#{content}</div>'
				.replace('#{content}', marked(app.markdown[page]))

	renderHTML(reqObj, content, res)
}

//--- CONTACT --------------------------------------------------------------------------------------------------------------

var radio = function(reqObj, res) {
	var page = reqObj.page.name
		,	station = reqObj.page.query.station || ''

	require('./radio').getContent(reqObj,res,'tracks','search', station, function(data){
		var content = []
		content.push('<div id="playlist" hidden>' + JSON.stringify(data[2]) + '</div>')
//		content.push(jp.join(''))
		content.push('<div class="main">' + data[1] + '</div>')
		renderHTML(reqObj, content.join(''), res)
	})

}

//--- DELETE POST ----------------------------------------------------------------------------------------------------------------

var deleteItem = function(reqObj, res) {
	var form = reqObj.form
	require('./security').checkPassword(form.password, function(status) {
		switch(status) {
			case true:
				console.log('Password ok.'.ok)
				delete form.password
				ops.deleteItem(form)
				res.writeHead(200, {'Content-Type': 'text/plain'})
			  res.end('statusCallback(\'{"status":"ok","data": "Post deleted."}\')')
  		break;
			case false:
				res.writeHead(200, {'Content-Type': 'text/plain'})
				res.end('statusCallback(\'{"status":"error","data": "Password incorrect."}\')')
			break;
		}
	})
}

//--- ADD POST ----------------------------------------------------------------------------------------------------------------

var addPost = function(reqObj, res) {
	var form = reqObj.form
	require('./security').checkPassword(form.password, function(status) {
		switch(status) {
			case true:
				console.log('Password ok.'.ok);
				form.active = true
				form.tags = form.tags.split(',')
				form.count = 1
				delete form.password
				ops.savePost(form)
				res.writeHead(200, {'Content-Type': 'text/plain'})
			  res.end('statusCallback(\'{"status":"ok","data": "Post saved."}\')')
  		break;
			case false:
				res.writeHead(200, {'Content-Type': 'text/plain'})
				res.end('statusCallback(\'{"status":"error","data": "Password incorrect."}\')')
			break;
		}
	})
}

var editPost = function(reqObj, res) {
	var form = reqObj.form
	require('./security').checkPassword(form.password, function(status) {
		switch(status) {
			case true:
				console.log('Password ok.'.ok);
				form.active = true
				form.tags = form.tags.split(',')
				form.count = 1
				delete form.password
				ops.savePost(form)
				res.writeHead(200, {'Content-Type': 'text/plain'})
			  res.end('statusCallback(\'{"status":"ok","data": "Post saved."}\')')
  		break;
			case false:
				res.writeHead(200, {'Content-Type': 'text/plain'})
				res.end('statusCallback(\'{"status":"error","data": "Password incorrect."}\')')
			break;
		}
	})
}

//--- ADD SPOTMAP ----------------------------------------------------------------------------------------------------------------

var addSpotmap = function(reqObj, res) {
	var form = reqObj.form
	require('./security').checkPassword(form.password, function(status){
		switch(status) {
			case true:
				console.log('Password ok.'.ok);
				form.active = true
				form.tags = form.tags.split(',')
				form.count = 1
				delete form.password
				ops.saveSpotmap(form)
				res.writeHead(200, {'Content-Type': 'text/plain'})
			  res.end('statusCallback(\'{"status":"ok","data": "Post saved."}\')')
  		break;
			case false:
				res.writeHead(200, {'Content-Type': 'text/plain'})
				res.end('statusCallback(\'{"status":"error","data": "Password incorrect."}\')')
			break;
		}
	})

}

var getASEFile = function(reqObj, res) {
	
	var array = eval(JSON.parse(reqObj.page.query.data))
		,	title = reqObj.page.query.title.replace(',','').replace(' ','')
		,	size = reqObj.page.query.size

	var path = app.ROOT + '/server/temp/'
//		,	title = 'Terminator'
		,	filename = path + title + size + '.ase'
//		,	array = [[130,30,112],[255,255,255],[0,0,0],[244,130,12]]

		fs.stat(filename, function(err, data) {
			if (err) {
				require('./ase').createASEFile(title, array, size, function(location) {
					var path = location[0]
						,	filename = location[1]

					fs.readFile(location[0]+location[1], function(err, data) {
						if (err) console.log(err)
						else {
							res.writeHead(200, {'Content-Type' : 'application/illustrator', 'Content-Length': data.length, 'Content-disposition': 'filename=' + filename})
			    		res.write(data)
			    		res.end()
						}
					})
				})

			} else {
				fs.readFile(filename, function(err, data) {
					if (err) console.log(err)
					else {
						res.writeHead(200, {'Content-Type' : 'application/illustrator', 'Content-Length': data.length, 'Content-disposition': 'filename=' + title + size + '.ase'})
		    		res.write(data)
		    		res.end()
					}
				})		
			}

		})

}

//--- OTHER --------------------------------------------------------------------------------------------------------------

var staticFile = function(reqObj, res) {
	var path = reqObj.path
		,	cacheReset = 600

//	console.log(reqObj);
	if (path !== '/robots.txt') {
		if (path.indexOf('/deviation/') === 0) {
			if (app.ENV === 'prod') {
				app.dropbox.get(path.replace('/deviation/',''), function(status, data, metadata) {
					var contentType = reqObj.file.contentType
					if (contentType.indexOf('image') !== -1) {
						res.writeHead(200, {'Content-Type': contentType})
					  res.write(data)
					  res.end()
					}
				})
			} else {
					res.writeHead(200, {'Content-Type': 'text/html'})
				  res.write('Data unavailable.')
				  res.end()
			}
		} else {
			fs.stat(app.ROOT + path, function(err, stats){
				if (err) console.log(err)
				else {
					var mtime = stats.mtime.getTime()
						,	currentTime = new Date().getTime()
						,	contentType = reqObj.file.contentType
						,	ext = reqObj.file.ext

					if (app.cacheOn = true
						&& us.has(app.cache, path)
						&& (us.has(app.cache, path) && (app.cache[path][1] === mtime))
						&& (((currentTime - app.cache[path][2])/1000) < cacheReset)
						&& (stats.size <= 1024*256)
						) {
						res.writeHead(200, {'Content-Type': contentType})
					  res.write(app.cache[path][0])
					  res.end()
					}
					else {
						var buffer = new Buffer(stats.size)
							,	offset = 0

						fs.createReadStream(app.ROOT + path,{
							flags: 'r',
							mode: 0666}
						).on('data', function(chunk){
			        chunk.copy(buffer, offset);
			        offset += chunk.length;
						}).on('end',function() {
							if (buffer.length <= 1024*256 && us.indexOf(app.cacheExceptions, ext) === -1) {
								app.cache[path] = []
								app.cache[path][0] = buffer
								app.cache[path][1] = mtime
								app.cache[path][2] = currentTime
							}
						}).on('error',function(err){
							console.log('Error loading static content: ' + path)
						}).pipe(res)
					}
				}
			})
		}
	}
	else console.log('Robot text!');
}

var error = function(reqObj, res) {
	reqObj.page.name = (res.statusCode === 503) ? 'unavailable' : 'error'
	console.log(res.statusCode);
	var page = reqObj.page.name
		,	content = '<div class="content">#{content}</div>'
				.replace('#{content}', marked(app.markdown[page]))

	
	renderHTML(reqObj, content, res)
}

//--- FUNCTIONS --------------------------------------------------------------------------------------------------------------

var renderHTML = function(reqObj, content, res) {
	var page = reqObj.page.name

	;(reqObj.device === 'mobile') ? layout = 'layout_m' : layout = 'layout'

	;(page === error) ? code = 200 : code = 404
	;(page === 'api') ? queryTest = us.keys(reqObj.page.query).length : queryTest = null

	if (page === 'api' && queryTest > 0) {
			res.writeHead(code, {'Content-Type': 'text/plain'})
			res.write(content)
			res.end()
	} else {

			var html = app.templates[layout].replace(/\{page\}/g, page)
				.replace('#{name}', app.name)
				.replace('#{header}', app.templates.header)
				.replace('#{content}', content)
				.replace('#{footer}', app.templates.footer)

			res.writeHead(code, {'Content-Type': 'text/html'})
			res.write(html)
			res.end()
	}

}

//--- EXPORTS --------------------------------------------------------------------------------------------------------------

var control = {}
control['static'] = staticFile
control['error'] = error
control['/'] = home
control['/home'] = home
control['/blog'] = blog
control['/spotmaps'] = spotmaps
control['/api'] = api
control['/tweetnation'] = tweetnation
control['/radio'] = radio
control['/addPost'] = addPost
control['/editPost'] = editPost
control['/deleteItem'] = deleteItem
control['/getASEFile'] = getASEFile
control['/addSpotmap'] = addSpotmap
control['/contact'] = contact
control['/wip'] = wip

exports.control = control