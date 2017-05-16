var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json())
// --			
// TODO: Look up body-parser docs and
//       parse each incoming request body as JSON.
// app.use(...)
// --

var jokes = [];


// TODO
// app.post(...)
app.post('/jokes', function(req,res){
	jokes.push(req.body);
	res.send(201);
})

app.get('/jokes', function(req, res) {
  res.send(jokes);
});


module.exports = app;
