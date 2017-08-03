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
            this.receivedMessage(data);
        }.bind(this));

        socket.on('server:auth', function () {
            this.getUsernameDialog(this.onUsernameDialogComplete);
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
            data.colorVal = this.getUserColor(data.username);
            this.messages.push(data);
        },
        authClient: function () {
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
            this.users = response;
        },
        getUserColor: function (username) {
            var color = "";
            this.users.forEach(function(user) {
                if (user.username == username) {
                    color = user.color.value;
                    return;
                }
            });
            return color;
        },
        getUsernameDialog: function(callback) {
           jQuery('#loginModal').modal('open', {
               inDuration: 100,
               outDuration: 100,
               complete: callback.bind(this)
            });
        },
        onUsernameDialogComplete: function () {
            this.username = jQuery('#loginModal input[name="username"]').val();
            this.authClient();
        }
    }
});


jQuery(document).ready(function() {
// var colors = [
//     {"name": "Green", "value": "#80ff00"},
//     {"name": "Blue", "value": "#87cefa"},
//     {"name": "Gray", "value": "#d7d7d7"},
//     {"name": "Cyan", "value": "#00ffff"},
//     {"name": "Orange", "value": "#ffcc80"},
//     {"name": "Rose", "value": "#ffb3b3"},
//     {"name": "Purple", "value": "#cc99ff"}
// ];
//     var grid = jQuery("#color-picker .color-grid");
//     var index = 0;
//     var columns = 5;
//     var i = 0;
//     var row;
//     colors.forEach(function(color) {
//     if (i == 0) {
//         row = grid.append('<div class="row"></div>');
//         row.append(
//             '<div class="col s1"></div>'
//         );
//     }
//     console.log("this");
//     console.log(color);
//     row.append(
//         '<div class="col s2"><div class="color-icon" data-color-value="' + color.name + ' style="background-color: '+ color.value +'"></div></div>'
//     );

//     if (i == columns) {
//         i = 0;
//         row.append(
//             '<div class="col s1"></div>'
//         );
//     }
//     i++;
//     });


});
