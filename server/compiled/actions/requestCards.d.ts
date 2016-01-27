import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');
export = requestCards;
declare function requestCards(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.UpdateCardsMessage): void;
