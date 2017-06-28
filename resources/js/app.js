var socket = io();

new Vue({
  el: "#chat-app",
  data: {
    messages: [],
    message: ""
  },
  mounted: function () {
    socket.on('chat message', function(data) {
      this.messages.push(data);
    }.bind(this));
  },
  methods: {
    sendMessage: function(event) {
      event.preventDefault();
      socket.emit("chat message", this.message);
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
