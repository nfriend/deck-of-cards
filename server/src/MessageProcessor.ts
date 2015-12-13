'use strict';

import Connection = require('./Connection');
import log = require('./log');
import Messages = require('./Messages');
import GameClientMapping = require('./GameClientMapping');
import chat = require('./actions/chat');
import join = require('./actions/join');

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
		} else {
			log('Unknown messageType "' + message.messageType + '"');
		}
	}
	
	removeClient(connection: Connection) {
		var game = this.gameIdToClients[connection.gameId];
		if (game && game.indexOf(connection) !== -1) {
			game.splice(game.indexOf(connection), 1); 
		}
	}
}

MessageProcessor.Instance = new MessageProcessor();