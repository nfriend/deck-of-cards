import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');

export = requestCards;

function requestCards(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.UpdateCardsMessage) {

    let game = gameIdToGames[connection.gameId]; 
	if (game.cards.length > 0) {
        var chatHistoryMessage: Messages.UpdateCardsMessage = {
            messageType: 'updateCards',
            data: {
                cards: game.cards
            }
        }
        connection.sendMessage(chatHistoryMessage);
    }
}


