import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
import Utility = require('../Utility');

export = addCards;

function addCards(gameIdsToGames: GameIdToGame, connection: Connection, message: Messages.AddCardsMessage) {

	let game = gameIdsToGames[connection.gameId]; 
	if (game) {
        
        message.data.cards.forEach(card => {
            card.id = Utility.newGuid();
            card.position = {
                x: 0,
                y: 0
            },
            card.rotation = 0;
            card.zIndex = 0;
            
            game.cards.push(card);
        });
        
		game.connections.forEach(playerConnection => {
            let updateCardsMessage: Messages.UpdateCardsMessage = {
                messageType: 'updateCards',
                data: {
                    cards: game.cards
                }
            }
            playerConnection.sendMessage(updateCardsMessage);
        });
	}
}
