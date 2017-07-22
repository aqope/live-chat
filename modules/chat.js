var chat = function () {
    this.users = [];

    this.isUsernameUsed = function (username) {
        return this.users.indexOf(username) >= 0 ? true : false;
    };

    this.addUser = function (data) {
        if (!this.isUsernameUsed(data.username)) {
            this.users.push(data.username);

            return true;
        }

        return false;
    };

    this.getUsers = function() {
        return this.users;
    }

}

module.exports = chat;
