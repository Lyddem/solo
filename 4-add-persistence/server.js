var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use( bodyParser.json() );


// ---
// TODO:
//  Add persistence!
//
var db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'shopping-list.db'
  }
});

db.schema.createTableIfNotExists('groceries', function(table){
	table.increments();
	table.string('name');
	table.integer('quantity');
});				

var items = [];

//
// Retrieve all items
//
app.get('/items', function (req, res) {
	var query = db.select('*').from('groceries');//me
  res.status(200).send(query);
});

//
// Create a new item
//
app.post('/items', function (req, res) {
	db('groceries').insert({name: req.body.name, quantity: req.body.quantity}); //me
  // items.push({ name: req.body.name, quantity: req.body.quantity });
  res.sendStatus(201);
});

//
// Clear all items
//
app.delete('/items', function (req, res) {
  items = [];
  res.sendStatus(200);
});
