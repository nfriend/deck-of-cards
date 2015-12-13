import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameClientMapping');
import log = require('../log');

export = join;

function join(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.JoinMessage) {
	
	let gameId = message.data.id;
	
	if (!gameIdToClients[gameId]) {
		gameIdToClients[gameId] = [];
	}
	
	connection.gameId = gameId;
	
	gameIdToClients[gameId].push(connection);
}
