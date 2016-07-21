var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use( bodyParser.json() );


// ---
// TODO:
//  Add persistence!
//
// var db = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: 'shopping-list.db'
//   }
// });
//
// db.schema.createTableIfNotExists(...);
// ---

var items = [];

//
// Retrieve all items
//
app.get('/items', function (req, res) {
  res.send(items);
});

//
// Create a new item
//
app.post('/items', function (req, res) {
  items.push({ name: req.body.name, quantity: req.body.quantity });
  res.sendStatus(201);
});

//
// Clear all items
//
app.delete('/items', function (req, res) {
  items = [];
  res.sendStatus(200);
});
