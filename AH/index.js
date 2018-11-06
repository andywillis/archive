var express = require('express');
var app = express();
var fs = require('fs');
//var bodyparser = require('body-parser');
//require('body-parser-xml')(bodyparser);

// set up express app
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(bodyparser.json());
//app.use(bodyparser.xml());
app.dataPath = './data/';

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/data/:type', function (req, res) {
  var type = req.params.type;
  var url = app.dataPath + 'response.' + type;
  fs.lstat(url, function (err, stats) {
    if (!err) {
      fs.readFile(url, 'UTF-8', function (err, data) {
        if (err) console.log(err);
        res.send(data);
      });
    }
  });
});

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
