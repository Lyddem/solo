var test    = require('tape');
var request = require('supertest');
var app     = require('./server.js');

test('GET /messages', function (assert) {
  request(app)
    .get('/messages')
    .expect(200)
    .end(function(err, response) {
      assert.error(err);
      assert.deepEqual(response.body, [], "The server should begin with zero messages.");
      assert.end();
    });
});


test('POST /signup', function (assert) {
  assert.timeoutAfter(1500)

  request(app)
    .post('/signup')
    .send({ username: 'alice', password: '123' })
    .expect(201)
    .end(function(err, response) {
      assert.error(err);
      assert.end();
    });
});


test.skip('POST /signup (taken username)', function (assert) {
  assert.timeoutAfter(1500)

  // First sign up...
  request(app)
    .post('/signup')
    .send({ username: 'bob', password: '123' })
    .expect(201)
    .end(function(err, response) {
      assert.error(err);

      // Then attempt to sign up with the same username
      request(app)
        .post('/signup')
        .send({ username: 'bob', password: '789' })
        .expect(400)
        .end(function(err, response) {
          assert.error(err);
          assert.equal(response.body.reason, 'username_is_taken', "Server should handle taken usernames.")
          assert.end();
        });

    });
})


test.skip('POST /signin', function (assert) {
  assert.timeoutAfter(1500)

  // First create the user account...
  request(app)
    .post('/signup')
    .send({ username: 'carl', password: '123' })
    .expect(201)
    .end(function(err, response) {
      assert.error(err);

      // Now attempt to sign in
      request(app)
        .post('/signin')
        .send({ username: 'carl', password: '123' })
        .expect(201)
        .end(function (err, response) {
          assert.error(err);
          assert.ok(response.body.sessionId, "The server should create a session.");
          assert.end();
        });

    });
});


test.skip('POST /signin (incorrect password)', function (assert) {
  assert.timeoutAfter(1500)

  // First create the user account...
  request(app)
    .post('/signup')
    .send({ username: 'daniel', password: '123' })
    .expect(201)
    .end(function(err, response) {
      assert.error(err);

      // Now attempt to sign in (with the wrong password!)
      request(app)
        .post('/signin')
        .send({ username: 'daniel', password: 'bad password' })
        .expect(401)
        .end(function (err, response) {
          assert.error(err);

          assert.equal(response.body.reason, 'incorrect_password', "Server should handle incorrect passwords.");
          assert.equal(response.body.sessionId, undefined, "Server should not create a session");

          assert.end();
        });

    });
});


test.skip('POST /signin (no such user)', function (assert) {
  assert.timeoutAfter(1500)

  // Now attempt to sign in
  request(app)
    .post('/signin')
    .send({ username: 'idontexist', password: '123' })
    .expect(400)
    .end(function (err, response) {
      assert.error(err);
      assert.equal(response.body.reason, 'no_such_username', "Server should handle non-existing usernames.");
      assert.end();
    });
});


test.skip('POST /messages (without signing in)', function (assert) {
  assert.timeoutAfter(1500)

  request(app)
    .post('/messages')
    .send({ content: 'hack!' })
    .expect(403) // <--- 403 means "unauthorized"
    .end(function(err) {
      assert.error(err);
      assert.end();
    });
});


test.skip('POST /messages', function (assert) {
  assert.timeoutAfter(1500)

  // First create the user account...
  request(app)
    .post('/signup')
    .send({ username: 'dan', password: '123' })
    .expect(201)
    .end(function(err, response) {
      assert.error(err);

      // Then sign in...
      request(app)
        .post('/signin')
        .send({ username: 'dan', password: '123' })
        .expect(201)
        .end(function (err, response) {
          assert.error(err);
          var sessionId = response.body.sessionId;

          // Now attempt to create a chat message
          request(app)
            .post('/messages')
            .set('Authorization', 'token SessionId=' + sessionId)
            .send({ content: "Hello!" })
            .expect(201)
            .end(function (err, response) {
              assert.error(err);

              // Finally, grab all chat messages to ensure ours has been created
                request(app)
                  .get('/messages')
                  .expect(200)
                  .end(function(err, response) {
                    assert.error(err);
                    var chats = response.body;

                    assert.equal(chats.length, 1, "The message should persist.")
                    assert.equal(chats[0].content, "Hello!", "The message content should persist.")
                    assert.ok(chats[0].userId, "The message should be assigned to its author.")

                    assert.end();
                  });
            });

        });
    });
});


test('teardown (ignore this)', function (assert) {
  assert.end()
  process.exit(0)
})
