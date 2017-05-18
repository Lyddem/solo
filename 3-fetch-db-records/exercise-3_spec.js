  var db       = require('./db');
var test     = require('tape');
var exercise = require('./exercise-3')

test('setup', function (assert) {
  db.migrate.latest()
    .then(function() {
      return db.seed.run();
    })
    .then(function() {
      assert.end();
    });
});

test('scoreRange', function (assert) {

  exercise.scoreRange(0, 100)
    .then(function (players) {
      assert.equal(players.length, 3, 'Lower bound is inclusive, while upper bound is exclusive');

      var names = players.map(function(p){ return p.name });
      assert.deepEqual(
        names,
        ['Dan', 'Carl', 'Frank'],
        "Players are returned in descending score order"
      );

      assert.end(); 
    });
});

test('scoreRange (2)', function (assert) {

  exercise.scoreRange(100, 250)
    .then(function (players) {
      assert.equal(players.length, 3); //changed

      var scores = players.map(function(p){ return p.score });
      assert.deepEqual(
        scores,
        [200, 120, 100],
        "Players are returned in descending score order"
      );

      assert.end();
    });
});


test('teardown', function (assert) {
  db.destroy();
  assert.end();
});








