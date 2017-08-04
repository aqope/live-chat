var chat = function () {
    this.users = [];
    this.colors = [
        {"name": "Green", "value": "#80ff00"},
        {"name": "Blue", "value": "#87cefa"},
        {"name": "Gray", "value": "#d7d7d7"},
        {"name": "Cyan", "value": "#00ffff"},
        {"name": "Orange", "value": "#ffcc80"},
        {"name": "Rose", "value": "#ffb3b3"},
        {"name": "Purple", "value": "#cc99ff"}
    ];

    this.isUsernameUsed = function (username) {
        for (index in this.users) {
            if (this.users[index].username == username) {
                return true;
            }
        }

        return false;
    };

    this.addUser = function (data) {
        if (!this.isUsernameUsed(data.username)) {
            var color = this.getRandomColor();
            this.users.push({"username": data.username, "color": color, "socketId": data.id});
            return true;
        }

        return false;
    };

    this.removeUserBySocketId = function (socketId) {
        this.users = this.users.filter(function(user) {
            if (socketId != user.socketId) {
                return user;
            }
        });
    };

    this.getUsers = function() {
        return this.users;
    };

    this.getRandomColor = function() {
        var random = Math.floor((Math.random() * this.colors.length) + 1);
        return this.colors[random];
    };

};

module.exports = chat;
