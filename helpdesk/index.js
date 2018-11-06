require('core').clear()

var fs = require('fs') 
  , mexpress = require( 'mexpress' )
  , colors = require( 'colors' )
  ;

var app = mexpress();

app.set('root', __dirname)
app.use('', mexpress.staticFile(__dirname));
app.use('', mexpress.fourohfour());
app.use('', mexpress.logger());
app.use('', mexpress.metrics());
app.use('', mexpress.errorHandler());

app.get('/', function(req, res) {
  var path = '/client/index.htm';
  fs.stat(app.root + path, function(err, stats){
    if (err) next()
    else {
      fs.createReadStream(app.root + path, { flags: 'r', mode: 0666 })
        .on('error', function() { next() })
        .pipe(res)
    }
  })
})

app.listen(80);