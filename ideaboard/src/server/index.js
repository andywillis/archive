// const aws = require('aws-sdk');
const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('root', __dirname);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../../dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../dist', 'index.html'));
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});
