var express = require('express')
var bodyParser = require('body-parser')

var chats = []
var server = express()

server.use(bodyParser.json() )

server.post('/chats', function (req, res) {
  console.log("Received chat:", req.body)
  chats.push(req.body)
  console.log("Total # of chats:", chats.length)
  res.sendStatus(201)
})

// TODO: Define a handler for a `GET /chats` request

server.get('/chats', function(req,res){
	res.send(chats);
})

server.get('/', function (req, res) {
  res.sendFile( __dirname + '/client.html' ) //	
})

server.listen(3030)
console.log("Listening on port 3030"); 
