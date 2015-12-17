import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');
export = chat;
declare function chat(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.ChatMessage): void;
