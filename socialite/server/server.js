const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const db = require('./db/index')
app.use(express.static(path.join(__dirname, 'build')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  return res.send('Express Connected.');
});

app.listen(process.env.PORT || 8080);
