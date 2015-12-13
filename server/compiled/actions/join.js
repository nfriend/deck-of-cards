function join(gameIdToClients, connection, message) {
    var gameId = message.data.id;
    if (!gameIdToClients[gameId]) {
        gameIdToClients[gameId] = [];
    }
    connection.gameId = gameId;
    gameIdToClients[gameId].push(connection);
}
module.exports = join;
//# sourceMappingURL=join.js.map