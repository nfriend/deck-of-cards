import Connection = require('./Connection');

export = GameClientMapping;

interface GameClientMapping {
	[gameId: string]: Array<Connection>
}