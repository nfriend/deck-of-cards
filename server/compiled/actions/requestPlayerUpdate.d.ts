import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');
export = requestPlayerUpdate;
declare function requestPlayerUpdate(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.RequestPlayerUpdateMessage): void;
