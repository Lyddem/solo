  //
// The User Model
//
var User = module.exports;

var list = [];
var idCounter = 1;

User.find = function (id) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.id === id ) return user;
  }
  return null;
};

User.findByUsername = function (username) {
  for (var i=0; i < list.length; i++) {
    var user = list[i];
    if ( user.username === username ) return user;
  }
  return null;
};

User.create = function (username, password) {
  var newUser = {
    id: idCounter,
    username: username,
    password: hashPassword(password)
  };

  list.push(newUser);
  idCounter += 1;

  return newUser;
};

User.matchesPassword = function (user, incomingPassword) {
  return hashPassword(user.password) === hashPassword(incomingPassword); //<-- me 
}

//
// Password Hashing
// NOTE:
//   Real apps will use a hashing algorithm stronger than md5 (such as bcrypt)
//
var crypto = require('crypto');

function hashPassword (password) {
  return crypto.createHash('md5').update(password).digest("hex");
}













