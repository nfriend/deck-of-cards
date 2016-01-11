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

    if (gameIdToGames[gameId].chatHistory.length > 0) {
        var chatHistoryMessage: Messages.ChatHistoryMessage = {
            messageType: 'chatHistory',
            data: {
                messages: gameIdToGames[gameId].chatHistory
            }
        }
        connection.sendMessage(chatHistoryMessage);
    }

    var updatedPlayersMessage: Messages.UpdatePlayersMessage = {
        messageType: 'updatePlayers',
        data: {
            players: gameIdToGames[gameId].connections.map(c => {
                return {
                    id: c.player.id,
                    color: c.player.color,
                    name: c.player.name
                }
            })
        }
    };
    connection.sendMessage(updatedPlayersMessage);
}
