var init = function() {
	var onRequest = function(req, res) {require('./router').route(req, res)}
		,	server = require('http').createServer(onRequest).listen(app.port)

	console.log(('Server listening on port ' + app.port).server)
}

exports.init = init