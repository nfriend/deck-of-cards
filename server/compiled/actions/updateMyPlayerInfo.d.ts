import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');
export = updateMyPlayerInfo;
declare function updateMyPlayerInfo(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.UpdateMyPlayerInfoMessage): void;
