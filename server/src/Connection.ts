import websocket = require('websocket');
import Message = require('./Messages');
import Player = require('./Player');

export = Connection;

class Connection {
	
	websocketConnection: websocket.connection;
	gameId: string;
	player: Player;
	
	constructor(connection: websocket.connection) {
		this.websocketConnection = connection;
	}
	
	sendMessage(message: Message.JoinMessage|Message.ChatMessage|Message.ChatHistoryMessage) {
		this.websocketConnection.sendUTF(JSON.stringify(message));
	}
}



