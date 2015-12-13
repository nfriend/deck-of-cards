import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameClientMapping');

export = chat;

function chat(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.ChatMessage) {
	(gameIdToClients[connection.gameId] || []).forEach(playerConnection => {
		if (connection !== playerConnection) {
			playerConnection.sendUTF(JSON.stringify(message));
		}
	});
}
