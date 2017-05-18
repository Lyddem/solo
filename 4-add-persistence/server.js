var express = require('express');
var bodyParser = require('body-parser');

var app = express();
module.exports = app;

app.use( bodyParser.json() );

// ---
// TODO:
//  Add persistence!
var db = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'shopping-list.db' //Q
  },
  useNullAsDefault: true
});

db.schema.createTableIfNotExists('groceries', function(table){
	table.string('name');
	table.integer('quantity');
})
.then(function(){
  console.log('successfully created groceries table');
})				

var items = [];

//
// Retrieve all items
//
app.get('/items', function (req, res) {
	db.select('*').from('groceries')
    .then( results => {
      console.log('QUERY RESULTS::', results); 
      res.status(200).send(results)
      // res.status(200).send({name: results[0].name, quantity: results[0].quantity })
    })
});
//res.json(results)
//
// Create a new item 
//

app.post('/items', function (req, res) {
	db('groceries').insert({name: req.body.name, quantity: req.body.quantity})
  .then( data => {
    console.log('RESPONSE', data);
    res.sendStatus(201);
  })
  // items.push({ name: req.body.name, quantity: req.body.quantity });
  
});

//
// Clear all items
//

app.delete('/items', function (req, res) {
db('groceries').del().then( results =>  res.sendStatus(200))
});




