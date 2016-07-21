var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

// --
// TODO: Look up body-parser docs and
//       parse each incoming request body as JSON.
// app.use(...)
// --


var jokes = [];

app.get('/jokes', function(req, res) {
  res.send(jokes);
});

// --
// TODO
// app.post(...)
// --
