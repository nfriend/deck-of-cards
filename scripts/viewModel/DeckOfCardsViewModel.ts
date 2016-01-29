/// <reference path="../typings/deck-of-cards-server/Messages" />

module DeckOfCards.ViewModel {
    export class DeckOfCardsViewModel {
        constructor() {

            WebsocketService.Instance.on('receive', (wsMessage: Message) => {
                if (wsMessage.messageType === 'updatePlayers') {
                    this.onUpdatePlayersMessage(wsMessage);
                } else if (wsMessage.messageType === 'updateCards') {
                    this.onUpdateCardsMessage(wsMessage);
                } else if (wsMessage.messageType === 'updateCard') {
                    this.onUpdateCardMessage(wsMessage);
                }
                    
            });

            let joinMessage: JoinMessage = {
                messageType: 'join',
                data: {
                    gameId: Globals.gameId(),
                    playerId: Globals.playerId(),
                    playerName: Globals.playerName(),
                    playerColor: Globals.playerColor()
                }
            };
            WebsocketService.Instance.send(joinMessage);

            let requestPlayerUpdateMessage: RequestPlayerUpdateMessage = {
                messageType: 'requestPlayerUpdate',
                data: {}
            }
            WebsocketService.Instance.send(requestPlayerUpdateMessage);
            
            let requestCardUpdate: RequestCardUpdateMessage = {
                messageType: 'requestCardUpdate',
                data: {}
            }
            WebsocketService.Instance.send(requestCardUpdate);
            

            WebsocketService.Instance.connect();
        }

        onUpdatePlayersMessage = (message: UpdatePlayersMessage) => {
            Globals.players.removeAll();
            Globals.players.pushRange(message.data.players.map(p => {
                return {
                    id: p.id,
                    name: p.name,
                    color: p.color,
                    
                    //for now
                    orientation: null
                }
            }));
        }
        
        onUpdateCardsMessage = (message: UpdateCardsMessage) => {
            log('updating all cards', message);
            Globals.cards(message.data.cards);
        }
        
        onUpdateCardMessage = (message: UpdateCardMessage) => {
            log('updating card', message)
            let cardToUpdate = Globals.cards().filter(c => c.id === message.data.card.id)[0];
            if (cardToUpdate) {
                Globals.cards.splice(Globals.cards().indexOf(cardToUpdate), 1, message.data.card);
            }
        }
    }
}