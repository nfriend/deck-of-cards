function updateCard(gameIdsToGames, connection, message) {
    var game = gameIdsToGames[connection.gameId];
    if (game) {
        game.cards.forEach(function (card, index) {
            if (card.id === message.data.card.id) {
                game.cards.splice(index, 1, message.data.card);
            }
        });
        game.connections.forEach(function (playerConnection) {
            if (connection !== playerConnection) {
                playerConnection.sendMessage(message);
            }
        });
    }
}
module.exports = updateCard;
//# sourceMappingURL=updateCard.js.map