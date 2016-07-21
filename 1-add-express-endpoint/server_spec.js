var test    = require('tape');
var request = require('supertest');
var app     = require('./server.js');


test('GET /jokes', function (assert) {
  request(app)
    .get('/jokes')
    .expect(200)
    .end(function(err, response) {
      assert.error(err);
      assert.deepEqual(response.body, [], "The server should begin with zero jokes.");
      assert.end();
    });
});


test('POST /jokes', function (assert) {

  var joke = {
    question: "What's red and smells like blue paint?",
    answer: "red paint"
  };

  // First make a POST request...
  request(app)
    .post('/jokes')
    .send(joke)
    .expect(201)
    .end(function(err) {
      assert.error(err)

      // Now make a GET request to see if the data persisted
      request(app)
        .get('/jokes')
        .expect(200)
        .end(function (err, response) {
          assert.error(err);
          assert.deepEqual(response.body, [joke], "The joke data should persist.");
          assert.end();
        });
    });
});
