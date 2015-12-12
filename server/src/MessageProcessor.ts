'use strict';

import websocket = require('websocket');
import log = require('./log');

export = MessageProcessor;

interface Message {
	messageType: string,
	data: any
}

interface GameClientMapping {
	[gameId: string]: Array<websocket.connection>
}

class MessageProcessor {
	
	public static Instance: MessageProcessor;
	private gameIdToClients: GameClientMapping;
	
	constructor() {
		this.gameIdToClients = {};
	}
	
	processMessage(message: Message) {
		log('Recieved messageType "' + message.messageType + '"');
		
		if (message.messageType === 'join') {
			
		} else {
			log('Unknown messageType "' + message.messageType + '"');
		}
	}
	
	removeClient(connection: websocket.connection) {
		log('Client disconnected');
	}
}

MessageProcessor.Instance = new MessageProcessor();