const express = require('express');
const Connection = require('@modules/Server/Connection');
const ChatApp = require('@modules/ChatApp/ChatApp');
const path = require('path');

class Server {
    constructor(port) {
        this.server = {};
        this.app = {};
        this.io = {};
        this.port = port;
        this.chatApp = {};
        this.connections = [];
    }

    start() {
        let self = this;
        this.app = express();

        this.server = require('http').Server(this.app);
        this.server.listen(this.port, () => {
            self.listenHandler();
        });

        this.io = require('socket.io')(this.server);

        this.chatApp = new ChatApp();

        this.prepareRoutes();
        this.prepareSocket();
    }

    prepareRoutes() {
        this.app.get('/', function (req, res) {
            res.sendFile(path.resolve('public/index.html'));
        });
        this.app.use('/static', express.static('public/resources'));
    }

    prepareSocket() {
        let self = this;
        this.io.on('connection', (socket) => {
            self.newConnectionHandler(socket);
        });
    }

    newConnectionHandler(socket) {
        console.log("Connected: " + socket.id);
        const connection = new Connection(this.io, socket, this.chatApp);
        this.connections.push(connection);
    }

    listenHandler() {
        console.log("Server is listening on " + this.port + " port.");
    }
}

module.exports = Server;
