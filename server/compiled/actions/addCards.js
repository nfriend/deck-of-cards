var Utility = require('../Utility');
function addCards(gameIdsToGames, connection, message) {
    var game = gameIdsToGames[connection.gameId];
    if (game) {
        message.data.cards.forEach(function (card) {
            card.id = Utility.newGuid();
            card.position = {
                x: 0,
                y: 0
            },
                card.rotation = 0;
            card.zIndex = 0;
            game.cards.push(card);
        });
        game.connections.forEach(function (playerConnection) {
            var updateCardsMessage = {
                messageType: 'updateCards',
                data: {
                    cards: game.cards
                }
            };
            playerConnection.sendMessage(updateCardsMessage);
        });
    }
}
module.exports = addCards;
//# sourceMappingURL=addCards.js.map