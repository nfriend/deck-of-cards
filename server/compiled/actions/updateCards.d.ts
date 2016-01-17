import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
export = updateCards;
declare function updateCards(gameIdsToGames: GameIdToGame, connection: Connection, message: Messages.UpdateCardsMessage): void;
