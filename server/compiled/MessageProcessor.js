'use strict';
var log = require('./log');
var chat = require('./actions/chat');
var join = require('./actions/join');
var MessageProcessor = (function () {
    function MessageProcessor() {
        if (MessageProcessor.Instance) {
            throw 'MessageProcessor is a singleton and has already been instantiated.  Use MessageProcessor.Instance instead.';
        }
        this.gameIdToClients = {};
    }
    MessageProcessor.prototype.processMessage = function (connection, message) {
        log('Recieved messageType "' + message.messageType + '"');
        if (message.messageType === 'join') {
            join(this.gameIdToClients, connection, message);
        }
        else if (message.messageType === 'chat') {
            chat(this.gameIdToClients, connection, message);
        }
        else {
            log('Unknown messageType "' + message.messageType + '"');
        }
    };
    MessageProcessor.prototype.removeClient = function (connection) {
        var game = this.gameIdToClients[connection.gameId];
        if (game && game.indexOf(connection) !== -1) {
            game.splice(game.indexOf(connection), 1);
        }
    };
    return MessageProcessor;
})();
MessageProcessor.Instance = new MessageProcessor();
module.exports = MessageProcessor;
//# sourceMappingURL=MessageProcessor.js.map