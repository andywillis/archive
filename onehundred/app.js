const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const loader = require('./lib/loader');

const app = express();

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

function getData(req, res) {
  loader((data) => {
    const arr = data.split('\r\n\r\n----\r\n\r\n').reverse();
    let key = 0;
    app.dataStore = arr.map((el) => {
      return { key: ++key, md: el };
    });
    if (res) res.send('Reloaded data!')
  });
}

app.get('/reload', (req, res) => {
  getData(req, res);
});

app.get('/users', (req, res) => {
  res.json(app.dataStore);
});

getData();

http.createServer(app).listen(3001);
