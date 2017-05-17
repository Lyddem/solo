	//
// The Message Model
//
var Message = module.exports;

var list = [];
var idCounter = 1;

Message.all = function (id) {
  return list.slice() // Return copy to prevent mutation
};

Message.create = function (userId, content) {
  var newMessage = {
    id: idCounter,
    userId: userId,
    content: content
  };

  list.push(newMessage);
  idCounter += 1;

  return newMessage;
};
