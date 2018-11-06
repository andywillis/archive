const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../build/index.html`));
});

http.createServer(app).listen(app.get('port'));

console.log('Server created on port', app.get('port'));
