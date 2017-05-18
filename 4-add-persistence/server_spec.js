var test    = require('tape');
var request = require('supertest');
var app     = require('./server.js');

test('GET /items', function (assert) {
  assert.timeoutAfter(1500)

  request(app)
    .get('/items')
    .expect(200)
    .end(function(err, response) {
      assert.error(err);
      assert.deepEqual(response.body, [], "The server should begin with zero items.");
      assert.end();
    });
});

test('POST /items', function (assert) {
  assert.timeoutAfter(1500)

  // First make a POST request...
  request(app)
    .post('/items')
    .send({ name: 'milk', quantity: 1 })
    .expect(201)
    .end(function(err) {
      assert.error(err);

      // Now make a GET request to see if the data persisted
      request(app)
        .get('/items')  
        .expect(200)
        .end(function (err, response) {
          assert.error(err);
          assert.deepEqual(response.body, [{ name: 'milk', quantity: 1 }], "The item data should persist.");
          assert.end();
        });
    });
});

test('DELETE /items', function (assert) {
  assert.timeoutAfter(1500)

  // First make a POST request...
  request(app)
    .post('/items')
    .send({ name: 'milk', quantity: 1 })
    .expect(201)
    .end(function(err) {
      assert.error(err)

      // Now make the subjected DELETE request
      request(app)
        .delete('/items')
        .expect(200)
        .end(function (err, response) {
          assert.error(err);

          // Now make a GET request to see if data was deleted properly
          request(app)
            .get('/items')
            .expect(200)
            .end(function (err, response) {
              assert.error(err);
              assert.deepEqual(response.body, [], "The item data should be cleared.");
              assert.end();
            });

        });
    });
});