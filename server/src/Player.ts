import Connection = require('./Connection');
import Message = require('./Messages');

export = Player;

interface Player {
	id: string;
	name: string;
	color: string;
	game: Game;
	connection: Connection;
}