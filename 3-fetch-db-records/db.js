
module.exports = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'exercise-3.db'
  }
});
