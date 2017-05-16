var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use(bodyparser.JSON())
// --
// TODO: Look up body-parser docs and
//       parse each incoming request body as JSON.
// app.use(...)
// --
// app.use(bodyParser.urlencoded({ extended: false }))


var jokes = [];

app.get('/jokes', function(req, res) {
  res.send(jokes);
});

app.post('/chats', function(req,res){
	jokes.push(req.body)
})


// --
// TODO
// app.post(...)
// --
