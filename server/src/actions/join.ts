import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
import log = require('../log');

export = join;

function join(gameIdToGames: GameIdToGame, connection: Connection, message: Messages.JoinMessage) {

	let gameId = message.data.id;
	let playerId = message.data.playerId;
	

	if (!gameIdToGames[gameId]) {
		gameIdToGames[gameId] = {
			id: gameId,
			chatHistory: [],
			connections: []
		};
	}

	connection.gameId = gameId;
	gameIdToGames[gameId].connections.push(connection);

	if (gameIdToGames[gameId].chatHistory.length > 0) {
		connection.sendMessage({
			messageType: 'chatHistory',
			data: {
				messages: gameIdToGames[gameId].chatHistory
			}
		});
	}
}
