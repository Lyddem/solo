var express = require('express');
var bodyParser = require('body-parser');

//
// Require our models
//
var User    = require('./models/user')
var Session = require('./models/session')
var Message = require('./models/message')


var app = express();
module.exports = app;

app.use( bodyParser.json() );


//
// User sign up
//
app.post('/signup', function (req, res) {
  // ---
  // TODO:
  //   1. Make sure username is not taken
  //   2. Create user
          
  //   3. Send back 201
       res.sendStatus(201);
  // ---
});


//
// User sign in
//
app.post('/signin', function (req, res) {
  // ---
  // TODO:
  //   1. Attempt to find user by username
  //   2. Make sure passwords match
  //   3. Create a new session
  //   4. Send back new session's id (201)
  // ---
});


//
// Create chat message (requires a valid session)
//
app.post('/messages', function (req, res) {
  // ---
  // TODO:
  //   1. Extract the sessionId from the `Authorization` header
  //   2. Look up session by its id
  //   3. Find user by the userId from the looked-up session
  //   4. Create a new message, with userId as the logged in user's id
  //   5. Send back 201
  // ---
});


//
// [Public] chat messages
//
app.get('/messages', function (req, res) {
  res.send( Message.all() );
});



//
// [Helper] Extracts a token from the Authorization header
//
//   e.g. extractSessionId(req) //=> 'abc123'
//
function extractSessionId (req) {
  var header = req.get('Authorization')
  return header && header.substring( header.indexOf('=') + 1 );
}
