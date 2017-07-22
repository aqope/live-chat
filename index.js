var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chat = require('./modules/chat');
var chatapp = new chat();

server.listen(3000, function() {
  log('listening on 3000 port');
});

// Serving Static Content
app.use('/static', express.static('resources'));

// Serving Index Page
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.emit('server:auth');

  socket.on('client:message', function(data) {
    io.emit('server:message', data);
  });

  socket.on('client:auth', function(data) {
    var response = {};
    if (chatapp.addUser(data)) {
      response = {
        error: false,
        message: ''
      };

      var usersData = chatapp.getUsers();
      io.emit("server:users:list", usersData);
    } else {
      response = {
        error: true,
        message: 'User with this username already exists.'
      };
    }
    socket.emit('server:auth:result', response)
  });

  socket.on('client:users:list', function() {
    log("this was triggered");
    var usersData = chatapp.getUsers();
    socket.emit("server:users:list", usersData);
  });

  socket.on('disconnect', function(socket) {
    console.log(socket);
    log('Used has disconnected');
  })
});

/*
  Logs message to the console with timestamp
*/
function log(message) {
  var date = new Date();

  if (typeof message == "object") {
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " : ");
    console.log(message);
  } else {
      console.log(
          date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " : " + message
      );
  }

}
