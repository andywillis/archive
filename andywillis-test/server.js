const http = require('http');
const express = require('express');
const path = require('path');
const fetch = require('request-promise');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine',` 'pug');

const endpoint = 'http://www.matchesfashion.com/nms/ajax/p/1095470,1095483,1095472,1095467';

app.get('/json', (req, res) => {
  fetch(endpoint)
    .then(data => res.send(data))
    .catch(err => console.log(err));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'));
  // res.render('index', { title: 'MATCHESFASHION.COM' });
});

http.createServer(app).listen(app.get('port'));

console.log('Server created on port', app.get('port'));
