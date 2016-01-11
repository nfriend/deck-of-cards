module DeckOfCards.ViewModel {
    export class PlayerInfoViewModel {
        playerName = Globals.playerName;
        playerColor = Globals.playerColor;
        wss = WebsocketService.Instance;

        constructor() {
            this.playerName.subscribe(this.onPlayerInfoChanged);
            this.playerColor.subscribe(this.onPlayerInfoChanged);
        }

        onPlayerInfoChanged = () => {

            Cookies.set('playerName', Globals.playerName(), Globals.cookieSettings);
            Cookies.set('playerColor', Globals.playerColor(), Globals.cookieSettings);

            var updateMyInfoMessage: UpdateMyPlayerInfoMessage = {
                messageType: 'updateMyPlayerInfo',
                data: {
                    playerColor: Globals.playerColor(),
                    playerName: Globals.playerName()
                }
            };
            this.wss.send(updateMyInfoMessage);
        }
    }
}