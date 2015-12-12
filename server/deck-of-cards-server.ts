import websocket = require('websocket');
import http = require('http');
import utility = require('Utility');
import MessageProcessor = require('MessageProcessor');

module DeckOfCardsServer {
	'use strict';
	var WebSocketServer = websocket.server;
	var allowedOrigins = [/^http:\/\/localhost/, /^http:\/\/127.0.0.1/, /^http:\/\/nathanfriend.com/, /^http:\/\/www.nathanfriend.com/, /^http:\/\/nathanfriend.io/, /^http:\/\/www.nathanfriend.io/, /^http:\/\/dev.nathanfriend.com/, /^http:\/\/dev.nathanfriend.io/, /^http:\/\/nathanfriend.cloudapp.net/, /^http:\/\/www.nathanfriend.cloudapp.net/];

	var server = http.createServer((request, response) => {
		console.log((new Date()) + ' Received request for ' + request.url);
		response.writeHead(404);
		response.end();
	});
	server.listen(18734, () => {
		console.log((new Date()) + ' Server is listening on port 18734');
	});

	var wsServer = new WebSocketServer({
		httpServer: server,
		autoAcceptConnections: false
	});

	wsServer.on('request', request => {
		if (!utility.originIsAllowed(request.origin)) {
			// Make sure we only accept requests from an allowed origin
			request.reject();
			console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
			return;
		}

		var connection = request.accept('deck-of-cards-protocol', request.origin);
		console.log((new Date()) + ' Connection accepted.');

		connection.on('message', message => {
			if (message.type === 'utf8') {
				console.log('Received Message: ' + message.utf8Data);
				var parsedMessage = JSON.parse(message.utf8Data);
				MessageProcessor.Instance.processMessage(parsedMessage);				
			} else {
				console.log('recieved unsupported message type: "' + message.type + '". Message ignored.');
			}
		});

		connection.on('close', (reasonCode, description) => {
			console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		});
	});
}