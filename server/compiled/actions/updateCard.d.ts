import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
export = updateCard;
declare function updateCard(gameIdsToGames: GameIdToGame, connection: Connection, message: Messages.UpdateCardMessage): void;
