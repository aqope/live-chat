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
        this.users.forEach(function(item) {
            if (username == item.username) {
                return true;
            }
        });

        return false;
    };

    this.addUser = function (data) {
        if (!this.isUsernameUsed(data.username)) {
            var color = this.getRandomColor();
            this.users.push({"username": data.username, "color": color});

            return true;
        }

        return false;
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
