import Connection = require('./Connection');
import Message = require('./Messages');
import Game = require('./Game');

export = Player;

interface Player {
	id: string;
	name: string;
	color: string;
	game: Game;
	connection: Connection;
}