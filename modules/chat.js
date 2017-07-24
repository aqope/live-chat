var chat = function () {
    this.users = [];
    this.colors = [
        {"color": "Green", "value": "#80ff00"},
        {"color": "Blue", "value": "#87cefa"},
        {"color": "Gray", "value": "#d7d7d7"},
        {"color": "Cyan", "value": "#00ffff"},
        {"color": "Orange", "value": "#ffcc80"},
        {"color": "Rose", "value": "#ffb3b3"},
        {"color": "Purple", "value": "#cc99ff"}
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
            this.users.push({"username": data.username, "color": color['color']});

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
