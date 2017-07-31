var socket = io();

new Vue({
    el: "#chat-app",
    data: {
        messages: [],
        message: "",
        username: "",
        users: []
    }, mounted: function () {
        socket.on('server:message', function (data) {
            this.messages.push(data);
        }.bind(this));

        socket.on('server:auth', function () {
            this.authClient();
        }.bind(this));
    },
    methods: {
        sendMessage: function (event) {
            event.preventDefault();
            var sendData = {
                username: this.username,
                message: this.message
            }
            socket.emit("client:message", sendData);
            this.message = "";

            Vue.nextTick(function () {
                Materialize.updateTextFields();
            });
        },
        receivedMessage: function (data) {
            this.messages.push(data);
        },
        authClient: function () {
            this.username = prompt("Enter your username:");
            var sendData = {
                username: this.username
            };
            socket.emit('client:auth', sendData);

            socket.on('server:auth:result', function (data) {
                this.authHandle(data);
            }.bind(this));
        },
        authHandle: function (response) {
            if (response.error) {
                alert(response.message);
                socket.disconnect();
                jQuery(this.el).addClass('disconnected');

                return;
            }

            socket.on("server:users:list", function (data) {
                this.usersUpdateHandle(data);
            }.bind(this));

            // Requesting a Users List
            socket.emit("client:users:list");
        },
        usersUpdateHandle: function (response) {
            console.log(response);
            this.users = response;
        }
    }
});
