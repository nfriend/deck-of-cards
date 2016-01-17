function join(gameIdToGames, connection, message) {
    var gameId = message.data.gameId;
    var playerId = message.data.playerId;
    if (!gameIdToGames[gameId]) {
        gameIdToGames[gameId] = {
            id: gameId,
            chatHistory: [],
            connections: [],
            cards: []
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
}
module.exports = join;
//# sourceMappingURL=join.js.map