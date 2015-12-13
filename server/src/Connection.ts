import websocket = require('websocket');

export = Connection;

interface Connection extends websocket.connection {
	gameId?: string;
}
