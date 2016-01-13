import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');
export = requestChatHistory;
declare function requestChatHistory(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.RequestChatHistory): void;
