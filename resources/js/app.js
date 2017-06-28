var user = prompt('Enter your username:');

var socket = io();

new Vue({
  el: "#chat-app",
  data: {
    messages: [],
    message: "",
    username: user
  },
  mounted: function () {
    socket.on('server:message', function(data) {
      this.messages.push(data);
    }.bind(this));
  },
  methods: {
    sendMessage: function(event) {
      event.preventDefault();
      var sendData = {
        username: this.username,
        message: this.message
      }
      socket.emit("client:message", sendData);
      this.message = "";

      Vue.nextTick(function() {
          Materialize.updateTextFields();
      });
    },
    receivedMessage: function(data) {
      this.messages.push(data);
    }
  }
});
