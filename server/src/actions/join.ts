import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
import log = require('../log');

export = join;

function join(gameIdToGames: GameIdToGame, connection: Connection, message: Messages.JoinMessage) {

    let gameId = message.data.gameId;
    let playerId = message.data.playerId;


    if (!gameIdToGames[gameId]) {
        gameIdToGames[gameId] = {
            id: gameId,
            chatHistory: [],
            connections: []
        };
    }

    connection.gameId = gameId;
    connection.player = {
        id: message.data.playerId,
        name: message.data.playerName,
        color: message.data.playerColor,
        connection: connection,
        game: gameIdToGames[gameId]
    }

    gameIdToGames[gameId].connections.push(connection);
}
