'use strict';
var websocket = require('websocket');
var http = require('http');
var Utility = require('./Utility');
var MessageProcessor = require('./MessageProcessor');
var log = require('./log');
var Connection = require('./Connection');
var WebSocketServer = websocket.server;
var server = http.createServer(function (request, response) {
    log('Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(17765, function () {
    log('Server is listening on port 18734');
});
var wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});
wsServer.on('request', function (request) {
    if (!Utility.originIsAllowed(request.origin)) {
        request.reject();
        log('Connection from origin ' + request.origin + ' rejected.');
        return;
    }
    var connection = new Connection(request.accept('deck-of-cards-protocol', request.origin));
    log('Connection accepted.');
    connection.websocketConnection.on('message', function (message) {
        if (message.type === 'utf8') {
            log('Received Message: ' + message.utf8Data);
            var parsedMessage = JSON.parse(message.utf8Data);
            MessageProcessor.Instance.processMessage(connection, parsedMessage);
        }
        else {
            log('Recieved unsupported message type: "' + message.type + '". Message ignored.');
        }
    });
    connection.websocketConnection.on('close', function (reasonCode, description) {
        MessageProcessor.Instance.removeClient(connection);
    });
});
//# sourceMappingURL=deck-of-cards-server.js.map