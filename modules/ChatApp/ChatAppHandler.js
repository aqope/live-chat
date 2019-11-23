const { bubbleColours } = require('@constants/global');

class ChatAppHandler {
    constructor() {
        this.users = [];
    }

    isUsernameUsed(username) {
        for (let index in this.users) {
            if (this.users[index].username == username) {
                return true;
            }
        }

        return false;
    }

    addUser(user) {
        if (!this.isUsernameUsed(user.username)) {
            let colour = this.getRandomColour();
            this.users.push({
                "username": user.username,
                "color": colour,
                "socketId": user.id
            });

            return true;
        }

        return false;
    }

    getUsers() {
        return this.users;
    }

    getRandomColour() {
        let random = Math.floor(Math.random() * bubbleColours.length);
        return bubbleColours[random];
    }

    removeUserBySocketId(socketId) {
        this.users = this.users.filter(function(user) {
            if (socketId !== user.socketId) {
                return user;
            }
        });
    }
}

module.exports = ChatAppHandler;
