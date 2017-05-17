var db = require('./db.js')
// var knex = require('knex')({
//     client: 'sqlite3',
//     connection: {
//       filename: './exercise-3.db'
//   	}
// })	

exports.scoreRange = function (min, max) {

  //should return player.name in db from (min - max]
  var query = db('players').where('score', '>=', min).andWhere('score', '<', max).orderBy('score', 'desc'); 
  return query; 
};
