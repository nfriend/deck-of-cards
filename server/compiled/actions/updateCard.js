function updateCard(gameIdsToGames, connection, message) {
    var game = gameIdsToGames[connection.gameId];
    if (game) {
        game.connections.forEach(function (playerConnection) {
            if (connection !== playerConnection) {
                playerConnection.sendMessage(message);
            }
        });
    }
}
module.exports = updateCard;
//# sourceMappingURL=updateCard.js.map