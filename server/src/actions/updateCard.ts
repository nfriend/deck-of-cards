import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
import Utility = require('../Utility');

export = updateCard;

function updateCard(gameIdsToGames: GameIdToGame, connection: Connection, message: Messages.UpdateCardMessage) {

	let game = gameIdsToGames[connection.gameId]; 
	if (game) {
        game.cards.forEach((card, index) => {
            if (card.id === message.data.card.id) {
                game.cards.splice(index, 1, message.data.card);    
            }
        });
        
		game.connections.forEach(playerConnection => {
			if (connection !== playerConnection) {
				playerConnection.sendMessage(message);
			}
		});
	}
}
