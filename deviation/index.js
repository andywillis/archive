// Clear the console
console.log('\033[2J')

/**
 * Application object is created from the configuration file and
 * initialised. The server is started.
 */

var args = process.argv.slice(2)

app = require('./server/lib/config').app
app.ROOT = __dirname
app.ENV = (args.length === 1) ? args[0] : 'prod'
app.cache = {}

colors = require('colors').setTheme(app.colorTheme)
console.log((app.name + ' ' + app.version).appName)

require('./server/lib/app').init(function(){
	require('./server/lib/server').init()
})