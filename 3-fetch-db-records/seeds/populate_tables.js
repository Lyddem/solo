
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('players').del(),

    // Inserts seed entries
    knex('players').insert({ id: 1, score: 100, name: 'Alice', hobby: 'programming' }),
    knex('players').insert({ id: 2, score: 200, name: 'Bob',   hobby: 'gaming' }),
    knex('players').insert({ id: 3, score:  15, name: 'Carl',  hobby: 'reading' }),
    knex('players').insert({ id: 4, score:  35, name: 'Dan',   hobby: 'biking' }),
    knex('players').insert({ id: 5, score: 120, name: 'Erl',   hobby: 'gaming' }),
    knex('players').insert({ id: 6, score:   0, name: 'Frank', hobby: 'sleeping' })
  );
};
