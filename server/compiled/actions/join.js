function join(gameIdToGames, connection, message) {
    var gameId = message.data.gameId;
    var playerId = message.data.playerId;
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
    };
    gameIdToGames[gameId].connections.push(connection);
    if (gameIdToGames[gameId].chatHistory.length > 0) {
        var chatHistoryMessage = {
            messageType: 'chatHistory',
            data: {
                messages: gameIdToGames[gameId].chatHistory
            }
        };
        connection.sendMessage(chatHistoryMessage);
    }
    var updatedPlayersMessage = {
        messageType: 'updatePlayers',
        data: {
            players: gameIdToGames[gameId].connections.map(function (c) {
                return {
                    id: c.player.id,
                    color: c.player.color,
                    name: c.player.name
                };
            })
        }
    };
    connection.sendMessage(updatedPlayersMessage);
}
module.exports = join;
//# sourceMappingURL=join.js.map