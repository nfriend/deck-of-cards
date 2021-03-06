module DeckOfCards {

    export class WebsocketService {

        static Instance: WebsocketService;

        connection: WebSocket;
        _recieveHandlers = [];
        _errorHandlers = [];
        _connectHandlers = [];
        _disconnectHandlers = [];
        _messageQueue = [];

        // used to differentiate between a disconnect and a failure to connect initially
        connectionWasOpen = false;

        constructor() {
            if (WebsocketService.Instance) {
                throw 'WebsocketService is a singleton and has already been instantiated.  Use WebsocketService.Instance instead.';
            }
            WebsocketService.Instance = this;
        }

        connect = () => {
            if (document.location.hostname === 'nathanfriend.com' || document.location.hostname === 'nathanfriend.io' || document.location.hostname === 'nathanfriend.cloudapp.net') {
                this.connection = new WebSocket('ws://nathanfriend.io:17765/deckofcards/server', 'deck-of-cards-protocol');
            } else if (document.location.hostname === 'dev.nathanfriend.com' || document.location.hostname === 'dev.nathanfriend.io' || document.location.hostname === 'dev.nathanfriend.cloudapp.net') {
                this.connection = new WebSocket('ws://dev.nathanfriend.io:17765/deckofcards/server', 'deck-of-cards-protocol');
            } else {
                this.connection = new WebSocket('ws://127.0.0.1:17765', 'deck-of-cards-protocol');
            }

            this.connection.onopen = () => {
                this.connectionWasOpen = true;
                this._connectHandlers.forEach(function(element, index, array) { element(); });
                
                // send any messages that were sent before the connection was open
                let messageQueueLength = this._messageQueue.length;
                this._messageQueue.forEach(m => {
                    this.send(m);
                });
                // remove all of the items just sent from the queue
                this._messageQueue.splice(0, messageQueueLength);
            };
            this.connection.onclose = () => {
                if (this.connectionWasOpen) {
                    this._disconnectHandlers.forEach(function(element, index, array) { element(); });
                }
            };
            this.connection.onerror = () => {
                if (!this.connectionWasOpen) {
                    this._errorHandlers.forEach(function(element, index, array) { element(); });
                }
            };
            this.connection.onmessage = (message) => {
                try {
                    var data = JSON.parse(message.data);
                } catch (e) {
                    console.log('DeckOfCards: websocketConnection service: failed to JSON.parse data: ' + data);
                    this._errorHandlers.forEach(function(element, index, array) { element(data); });
                }

                this._recieveHandlers.forEach(function(element, index, array) { element(data); });
            };
        }

        send = (data) => {
            if (!this.connection || this.connection.readyState !== WebSocket.OPEN) {
                this._messageQueue.push(data);
            } else {
                this.connection.send(JSON.stringify(data));
            }
        }

        on = (eventType, handler) => {
            if (eventType === 'receive') {
                this._recieveHandlers.push(handler);
            } else if (eventType === 'error') {
                this._errorHandlers.push(handler);
            } else if (eventType === 'connect') {
                this._connectHandlers.push(handler);
            } else if (eventType === 'disconnect') {
                this._disconnectHandlers.push(handler);
            }
        }

        off = (eventType, handler) => {
            if (eventType === 'recieve') {
                if (this._recieveHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    this._recieveHandlers.splice(this._recieveHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'error') {
                if (this._errorHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    this._errorHandlers.splice(this._errorHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'connect') {
                if (this._connectHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    this._connectHandlers.splice(this._connectHandlers.indexOf(handler), 1);
                    return true;
                }
            } else if (eventType === 'disconnect') {
                if (this._disconnectHandlers.indexOf(handler) === -1) {
                    return false;
                } else {
                    this._disconnectHandlers.splice(this._disconnectHandlers.indexOf(handler), 1);
                    return true;
                }
            }
        }
    }

    new WebsocketService();
}