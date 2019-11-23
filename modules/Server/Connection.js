const { serverCodes } = require("@constants/global");
const moment = require('moment');

class Connection {
    constructor(server, socket, app) {
        this.socket = socket;
        this.server = server;
        this.app = app;

        // Emitting Server Authorization Request
        this.emitRequest(serverCodes.server.auth);
        this.registerClientResponeHandlers();
    }

    registerClientResponeHandlers() {
        let self = this;
        this.socket.on(serverCodes.client.message, (data) => { self.receivedFromClientMessageHandler(data); });
        this.socket.on(serverCodes.client.auth, (data) => { self.clientAuthorizeHandler(data); });
        this.socket.on(serverCodes.client.users_list,() => { self.clientUsersListHandler(); });
        this.socket.on(serverCodes.client.disconnect, () => { self.clientDisconnectHandler(); });
    }

    receivedFromClientMessageHandler(data) {
        if (data.date === undefined) {
          data.date = moment().format("HH:MM:ss");
        }

        this.server.emit(serverCodes.server.message, data);
    }

    clientAuthorizeHandler(data) {
        let response = {};
        data.id = this.socket.id;

        if (this.app.addUser(data)) {
            this.server.emit(serverCodes.server.users_list, this.app.getUsers());
            response = {
                error: false,
                message: ''
            };
        } else {
            response = {
                error: true,
                message: "Error occured while adding user..."
            };
        }

        this.socket.emit(serverCodes.server.auth_result, response);
    }

    clientDisconnectHandler() {
        this.app.removeUserBySocketId(this.socket.id);
        console.log("Disconnected: " + this.socket.id);
        this.server.emit(serverCodes.server.users_list, this.app.getUsers());
    }

    clientUsersListHandler() {
        this.socket.emit(serverCodes.server.users_list, this.app.getUsers());
    }

    emitRequest(code) {
        this.socket.emit(code);
    }
}

module.exports = Connection;
