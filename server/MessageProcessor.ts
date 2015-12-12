import websocket = require('websocket');

interface Message {
	messageType: string,
	data: any
}

interface GameClientMapping {
	[gameId: string]: Array<websocket.connection>
}

var gameIdToClients: GameClientMapping = {};

class MessageProcessor {
	processMessage(message: Message) {
		if (message.messageType === 'join') {

		} else {
			console.log('Unknown messageType "' + message.messageType + '"');
		}
	}
}

export = MessageProcessor;