var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000, function() {
  log('listening on 3000 port');
});

app.use('/static', express.static('resources'));

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  })

  socket.on('disconnect', function() {
    log('Used has disconnected');
  })
});

/*
  Logs message to the console with timestamp
*/
function log(message) {
  var date = new Date();
  console.log(
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + " : " + message
  );
}
