'use strict';

import websocket = require('websocket');
import http = require('http');
import Utility = require('./Utility');
import MessageProcessor = require('./MessageProcessor');
import log = require('./log'); 

var WebSocketServer = websocket.server;

var server = http.createServer((request, response) => {
	log('Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(17765, () => {
	log('Server is listening on port 18734');
});

var wsServer = new WebSocketServer({ 
	httpServer: server, 
	autoAcceptConnections: false
});
wsServer.on('request', request => {
	if (!Utility.originIsAllowed(request.origin)) {
		request.reject();
		log('Connection from origin ' + request.origin + ' rejected.');
		return;
	}

	var connection = request.accept('deck-of-cards-protocol', request.origin);
	log('Connection accepted.');

	connection.on('message', message => {
		if (message.type === 'utf8') {
			log('Received Message: ' + message.utf8Data);
			var parsedMessage = JSON.parse(message.utf8Data);
			MessageProcessor.Instance.processMessage(parsedMessage);
		} else {
			log('Recieved unsupported message type: "' + message.type + '". Message ignored.');
		}
	});

	connection.on('close', (reasonCode, description) => {
		MessageProcessor.Instance.removeClient(connection);
	});
});