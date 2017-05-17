var db = require('./db.js')
// var knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//       filename: './exercise-3.db'
//   	}
// })	

// var knex = require('./knexfile.js');


exports.scoreRange = function (min, max) {
  // TODO: WRITE THIS FUNCTION (you won't need Promise.resolve)

  //should return player.name in db from (min - max]
  var query = db('players').where('score', '>=', min).andWhere('score', '<', max).orderBy('score', 'desc'); 
  return query; 
  // return // [{},{},{}]
};
