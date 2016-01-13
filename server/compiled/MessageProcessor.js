'use strict';
var log = require('./log');
var chat = require('./actions/chat');
var join = require('./actions/join');
var updateMyPlayerInfo = require('./actions/updateMyPlayerInfo');
var requestChatHistory = require('./actions/requestChatHistory');
var requestPlayerUpdate = require('./actions/requestPlayerUpdate');
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
        else if (message.messageType === 'updateMyPlayerInfo') {
            updateMyPlayerInfo(this.gameIdToClients, connection, message);
        }
        else if (message.messageType === 'requestChatHistory') {
            requestChatHistory(this.gameIdToClients, connection, message);
        }
        else if (message.messageType === 'requestPlayerUpdate') {
            requestPlayerUpdate(this.gameIdToClients, connection, message);
        }
        else {
            log('Unknown messageType "' + message.messageType + '"');
        }
    };
    MessageProcessor.prototype.removeClient = function (connection) {
        var game = this.gameIdToClients[connection.gameId];
        if (game && game.connections.indexOf(connection) !== -1) {
            game.connections.splice(game.connections.indexOf(connection), 1);
        }
    };
    return MessageProcessor;
})();
MessageProcessor.Instance = new MessageProcessor();
module.exports = MessageProcessor;
//# sourceMappingURL=MessageProcessor.js.map