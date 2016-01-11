/// <reference path="../typings/deck-of-cards-server/Messages" />

module DeckOfCards.ViewModel {

    export class ChatViewModel {
        messages: KnockoutObservableArray<ChatMessage> = ko.observableArray([]);
        chatInput: KnockoutObservable<string> = ko.observable(null);
        chatHistory: Array<string> = [];
        chatHistoryPointer: number;
        pop: HTMLAudioElement;
        wss = WebsocketService.Instance;

        constructor() {
            this.wss.on('receive', this.onWebsocketReceive);
            this.wss.connect();

            this.pop = new Audio('./audio/pop.mp3');
            this.pop.volume = .2;
        }

        onWebsocketReceive = (wsm: Message) => {
            log('recieved messages');
            if (wsm.messageType === 'chat') {
                let wsMessage = <ChatMessage>wsm;
                this.pop.play();
                this.messages.push(wsMessage);
            } else if (wsm.messageType === 'chatHistory') {
                let wsMessage = <ChatHistoryMessage>wsm;
                this.messages.pushRange(wsMessage.data.messages);
            }
        }

        chatInputKeyDown = (e: KeyboardEvent) => {
            if (e.which === Key.Enter && !e.shiftKey) {
                e.preventDefault();
                this.send();
                return false;
            } else if (e.which === Key.UpArrow) {
                if (this.chatHistoryPointer > 0 && this.getSelectionStart() === 0) {
                    this.chatInput(this.chatHistory[--this.chatHistoryPointer]);
                }
            } else if (e.which === Key.DownArrow) {
                if (this.chatHistoryPointer < this.chatHistory.length - 1 && this.getSelectionStart() === this.chatInput().length) {
                    this.chatInput(this.chatHistory[++this.chatHistoryPointer]);
                }
            }

            return true;
        }

        sendIsDisabled = ko.pureComputed(() => {
            return Utility.isNullUndefinedOrWhitespace(this.chatInput());
        });

        send = () => {
            if (this.sendIsDisabled()) {
                return;
            }

            let chatMessage: ChatMessage = {
                messageType: 'chat',
                data: {
                    playerId: Globals.playerId(),
                    message: this.chatInput()
                }
            };

            this.wss.send(chatMessage);
            
            this.messages.push(chatMessage);

            // save the chat history for shell-like autocomplete
            this.chatHistory.push(this.chatInput());
            if (this.chatHistory.length > 50) {
                this.chatHistory.shift();
            }
            this.chatHistoryPointer = this.chatHistory.length;
            this.chatInput('');
        }
		
        // not at all very Knockout-like, but it's much simpler and more
        // performant than setting up a binding
        private getSelectionStart() {
            return (<HTMLTextAreaElement>$('#chat-input')[0]).selectionStart;
        }

        private prepareMessage(s: string): string {
            return Utility.emoticonize(Utility.linkatize(Utility.escapeHtml(s)));
        }
        
        getPlayerColor(playerId: string) {
            if (this.playerInfoLookup()[playerId]) {
                return this.playerInfoLookup()[playerId].color;
            } else {
                return 'red';
            }
        }
        
        getPlayerName(playerId: string) {
            if (this.playerInfoLookup()[playerId]) {
                return this.playerInfoLookup()[playerId].name;
            } else {
                return 'Player';
            }
        }
        
        playerInfoLookup = ko.pureComputed(() => {
            var colorLookup: {
                [id: string]: { color: string, name: string }
            } = {};
            Globals.players().forEach(p => {
               colorLookup[p.id] = {
                   color: p.color,
                   name: p.name
               } 
            });
            return colorLookup;
        });
    }
}