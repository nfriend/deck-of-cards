import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
export = addCards;
declare function addCards(gameIdsToGames: GameIdToGame, connection: Connection, message: Messages.AddCardsMessage): void;
