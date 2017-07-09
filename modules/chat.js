// var chat =
//   users: {},
//   chat: function() {
//     console.log('Constructor called');
//   },
//   methods: {
//     addUser: function(socket, user) {
//
//     }
//   }
// };

var chat = function() {
  this.users = [];

  this.isUsernameUsed = function(username) {
    return this.users.indexOf(username) >= 0 ? true : false;
  };

  this.addUser = function(data) {
    if (!this.isUsernameUsed(data.username)) {
        this.users.push(data.username);

        return true;
    }

    return false;
  };

}

module.exports = chat;
