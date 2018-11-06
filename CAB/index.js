var core = require('core')
var url = require('url')
var fs = require('fs')
var stack = {}

core.clear();

fs.readdirSync(__dirname + '/server/html/').forEach(function(file){
	stack[file.split('.')[0]] = fs.readFileSync(__dirname + '/server/html/'+file, 'UTF-8');
})

require('http').createServer(function(req,res) {

	var path = url.parse(req.url).pathname
	var mime = {
		'js':'text/plain',
		'htm':'text/html',
		'css':'text/css',
		'gif':'image/gif',
		'jpg':'image/jpeg',
		'png':'image/png'
		}

	var data =''

	var contentType = path.split('.')[path.split('.').length-1]

	if (~path.indexOf('assets')) {

		console.log(__dirname + path);
		data = fs.createReadStream(__dirname + path, {flags: 'r', mode: 0666}).pipe(res)

	} else {

	path = path.substr(1,this.length).split('.')[0]
	path = path.length === 0 ? 'index' : path

	var re = new RegExp(Object.keys(stack).join('|'))

	data = re.test(path) === true ? stack[path] : 'Not found'
	res.writeHead(200,{'Content-type': mime[contentType]})
	res.end(data)

	}

}).listen(80)

console.log('Server on',80);