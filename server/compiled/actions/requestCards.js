function requestCards(gameIdToGames, connection, message) {
    var game = gameIdToGames[connection.gameId];
    if (game.cards.length > 0) {
        var chatHistoryMessage = {
            messageType: 'updateCards',
            data: {
                cards: game.cards
            }
        };
        connection.sendMessage(chatHistoryMessage);
    }
}
module.exports = requestCards;
//# sourceMappingURL=requestCards.js.map