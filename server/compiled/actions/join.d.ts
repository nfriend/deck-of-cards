import Connection = require('../Connection');
import Messages = require('../Messages');
import GameIdToGame = require('../GameIdToGame');
export = join;
declare function join(gameIdToGames: GameIdToGame, connection: Connection, message: Messages.JoinMessage): void;
