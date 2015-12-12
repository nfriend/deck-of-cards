'use strict';
var log = require('./log');
var MessageProcessor = (function () {
    function MessageProcessor() {
        this.gameIdToClients = {};
    }
    MessageProcessor.prototype.processMessage = function (message) {
        log('Recieved messageType "' + message.messageType + '"');
        if (message.messageType === 'join') {
        }
        else {
            log('Unknown messageType "' + message.messageType + '"');
        }
    };
    MessageProcessor.prototype.removeClient = function (connection) {
        log('Client disconnected');
    };
    return MessageProcessor;
})();
MessageProcessor.Instance = new MessageProcessor();
module.exports = MessageProcessor;
//# sourceMappingURL=MessageProcessor.js.map