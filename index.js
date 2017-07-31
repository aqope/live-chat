var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var chat = require('./modules/chat');
var chatapp = new chat();

server.listen(3000, function() {
  log('Listening on 3000 port');
});

// Serving Static Content
app.use('/static', express.static('public/resources'));

// Serving Index Page
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
  var socketId = socket.id;
  log("Connected: " + socketId);
  
  socket.emit('server:auth');

  socket.on('client:message', function(data) {
    io.emit('server:message', data);
  });

  socket.on('client:auth', function(data) {
    var response = {};
    data.id = socketId;

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
    var usersData = chatapp.getUsers();
    socket.emit("server:users:list", usersData);
  });

  socket.on('disconnect', function(socket) {
    chatapp.removeUserBySocketId(socketId);
    log("Disconnected: " + socketId);
    var usersData = chatapp.getUsers();
    io.emit("server:users:list", usersData);
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
