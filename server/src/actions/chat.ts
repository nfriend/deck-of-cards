import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');

export = chat;

function chat(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.ChatMessage) {

	let game = gameIdToClients[connection.gameId]; 
	if (game) {
		game.connections.forEach(playerConnection => {
			if (connection !== playerConnection) {
				playerConnection.sendMessage(message);
			}
		});
		
		game.chatHistory.push(message);
		if (game.chatHistory.length > 50) {
			game.chatHistory.shift();
		}
	}
}
