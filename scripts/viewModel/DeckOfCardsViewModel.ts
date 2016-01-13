/// <reference path="../typings/deck-of-cards-server/Messages" />

module DeckOfCards.ViewModel {
    export class DeckOfCardsViewModel {
        constructor() {

            WebsocketService.Instance.on('receive', (wsMessage: Message) => {
                if (wsMessage.messageType === 'updatePlayers') {
                    this.onUpdatePlayersMessage(wsMessage);
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

            let requestPlayerUpdateMessage: RequestPlayerUpdate = {
                messageType: 'requestPlayerUpdate',
                data: {}
            }
            WebsocketService.Instance.send(requestPlayerUpdateMessage);

            WebsocketService.Instance.connect();
        }

        onUpdatePlayersMessage = (message: UpdatePlayersMessage) => {
            log('updating all players', message);
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
            log(ko.unwrap(Globals.players));
        }
    }
}