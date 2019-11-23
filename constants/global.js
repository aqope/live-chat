const bubbleColours = [
    {"name": "Green", "value": "#80ff00"},
    {"name": "Blue", "value": "#87cefa"},
    {"name": "Gray", "value": "#d7d7d7"},
    {"name": "Cyan", "value": "#00ffff"},
    {"name": "Orange", "value": "#ffcc80"},
    {"name": "Rose", "value": "#ffb3b3"},
    {"name": "Purple", "value": "#cc99ff"}
];

const serverCodes = {
    server: {
        auth: "server:auth",
        message: "server:message",
        auth_result: "server:auth:result",
        users_list: "server:users:list",
    },
    client: {
        message: "client:message",
        auth: "client:auth",
        users_list: "client:users:list",
        disconnect: "disconnect",
    }
};

module.exports = { bubbleColours, serverCodes };
