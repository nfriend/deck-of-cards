function join(gameIdToGames, connection, message) {
    var gameId = message.data.id;
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
        connection.sendMessage({
            messageType: 'chatHistory',
            data: {
                messages: gameIdToGames[gameId].chatHistory
            }
        });
    }
}
module.exports = join;
//# sourceMappingURL=join.js.map