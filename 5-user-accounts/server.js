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

// User sign up
app.post('/signup', function (req, res) {

  //   1. Make sure username is not taken 
       // console.log('username', req.body.username)
        if(User.findByUsername(req.body.username) === null){ //<-- not taken
          // console.log( User.findByUsername(req.body.username) === null);
  //   2. Create user
         User.create(req.body.username, req.body.password); 
          // console.log( User.findByUsername(req.body.username) === null);

  //   3. Send back 201
         res.sendStatus(201); //<-- changed from sendStatus 
        } else {
         res.status(400).send({reason:'username_is_taken'});
        }
});
  
// User sign in
app.post('/signin', function (req, res) {
  // console.log('USER', req.body)
  //   1. Attempt to find user by username
  //   2. Make sure passwords match
  //   3. Create a new session
  //   4. Send back new session's id (201)
  // console.log(req.body)
      var user = User.findByUsername(req.body.username);

      //if the user already exists...
      if(user !== null){
        //if password matches...
        if(User.matchesPassword(user, req.body.password)){ //<--user given by client, password given by test
         //create session
          var session = Session.create(user.id)
          //send 201 and session id
          res.status(201).send({sessionId: session.id })
        //else send a 401
          }
         //if pw does not match...
         else if(!User.matchesPassword(user, req.body.password)){
          res.status(401)
          res.send({reason: 'incorrect_password'})
         }
         //user does not exist
      } else {
          res.status(400)
          res.send({reason: 'no_such_username'});
        }
});
// request(app)
//         .post('/signin')
//         .send({ username: 'carl', password: '123' })
//         .expect(201)
//         .end(function (err, response) {
//           assert.error(err);
//           assert.ok(response.body.sessionId, "The server should create a session.");
//           assert.end();

// Create chat message (requires a valid session)
//
app.post('/messages', function (req, res) {
  // ---
  // TODO:
  //   1. Extract the sessionId from the `Authorization` header
          // var session = extractSessionId(req);
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

// [Helper] Extracts a token from the Authorization header
//
//   e.g. extractSessionId(req) //=> 'abc123'
//
function extractSessionId (req) {
  var header = req.get('Authorization')
  return header && header.substring( header.indexOf('=') + 1 );
}



