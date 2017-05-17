	
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('players', function (table) {
    table.integer('id');
    table.string('name');
    table.string('hobby');
    table.integer('score');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('players');
};
