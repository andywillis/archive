// Module dependencies.

var fs = require('fs')
  , express = require('express')
  , config = require('./config')
  , colors = require('colors').setTheme(config.colorTheme)
  , core = require('./lib/core/core')
  , http = require('http')
  , path = require('path')
  , versionator = require('versionator')

// Vars

var app

// Blank the console and configure express

core.clear()
console.log((config.name + ' v' + config.version).appName);
app = express();
app.version = '0.1'

app.configure(function () {
  var basic = versionator.createBasic('v' + app.version);
  app.locals({ versionPath: basic.versionPath });
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view options', { layout: false });
  app.set('view engine', 'jade');
  app.use(express.favicon('public/favicon.ico'));
  app.use(require('less-middleware')({ 
    compress:true, 
    debug: false, 
    force: true,
    prefix: '/stylesheets',
    src: __dirname + '/less', 
    dest: __dirname + '/public/stylesheets/'
  }));
  app.use(app.router);
  app.use(express.compress());
  app.use(basic.middleware)
  app.use(express.static(path.join(__dirname, "public"), { maxAge: 360000 }));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/*
 * Describe the site routes, passing app as a parameter.
 * The last 'route' is middleware to catch 404s.
 */

app.get(/^(\/|\/home)$/, require('./routes/index')(app));

// Run the server

http.createServer(app).listen(app.get('port'), function(){
  console.log(('Express server listening on port ' + app.get('port')).server);
});