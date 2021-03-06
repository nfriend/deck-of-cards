'use strict';

import Connection = require('./Connection');
import log = require('./log');
import Messages = require('./Messages');
import GameClientMapping = require('./GameIdToGame');
import chat = require('./actions/chat');
import join = require('./actions/join');
import updateMyPlayerInfo = require('./actions/updateMyPlayerInfo');
import requestChatHistory = require('./actions/requestChatHistory');
import requestPlayerUpdate = require('./actions/requestPlayerUpdate');
import addCards = require('./actions/addCards');
import updateCard = require('./actions/updateCard');
import requestCards = require('./actions/requestCards');

export = MessageProcessor;

class MessageProcessor {

    public static Instance: MessageProcessor;
    private gameIdToClients: GameClientMapping;

    constructor() {
        if (MessageProcessor.Instance) {
            throw 'MessageProcessor is a singleton and has already been instantiated.  Use MessageProcessor.Instance instead.';
        }

        this.gameIdToClients = {};
    }

    processMessage(connection: Connection, message: Messages.Message) {
        log('Recieved messageType "' + message.messageType + '"');

        if (message.messageType === 'join') {
            join(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'chat') {
            chat(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'updateMyPlayerInfo') {
            updateMyPlayerInfo(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'requestChatHistory') {
            requestChatHistory(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'requestPlayerUpdate') {
            requestPlayerUpdate(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'addCards') {
            addCards(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'updateCard') {
            updateCard(this.gameIdToClients, connection, message);
        } else if (message.messageType === 'requestCardUpdate') {
            requestCards(this.gameIdToClients, connection, message);
        } else {
            log('Unknown messageType "' + message.messageType + '"');
        }
    }

    removeClient(connection: Connection) {
        var game = this.gameIdToClients[connection.gameId];
        if (game && game.connections.indexOf(connection) !== -1) {
            game.connections.splice(game.connections.indexOf(connection), 1);
        }
    }
}

MessageProcessor.Instance = new MessageProcessor();