//
// The Session Model
//
var Session = module.exports;

var uuid = require('node-uuid');
var list = [];

Session.find = function (id) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.id === id ) return user;
  }
  return null;
};

Session.create = function (userId) {
  var newSession = {
    id: uuid.v1(),
    userId: userId
  };

  list.push(newSession);

  return newSession;
};

