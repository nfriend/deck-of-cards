module DeckOfCards.ViewModel {
	
	interface ChatMessage {
		name: string;
		message: string;
		isMe?: boolean;
	}
	
	export class ChatViewModel {
		messages: KnockoutObservableArray<ChatMessage> = ko.observableArray([])
		chatInput: KnockoutObservable<string> = ko.observable(null);
		chatHistory: Array<string> = [];
		chatHistoryPointer: number;
		pop: HTMLAudioElement;
		
		wss = new WebsocketService();
		
		constructor() {
			this.messages.push({
				name: 'Nathan',
				message: 'Hey, this is pretty neat!',
				isMe: true
			});
			
			this.messages.push({
				name: 'Derek',
				message: 'Yeah it is.'
			});
			
			this.messages.push({
				name: 'Emily',
				message: 'Cool.'
			});
			
			this.messages.push({
				name: 'Nathan',
				message: 'Hey, this is pretty neat!',
				isMe: true
			});
			
			//temporary
			
			this.wss.on('connect', () => {
				this.wss.send({
					messageType: 'join',
					data: {
						id: 'abc'
					}
				});
			})
			this.wss.on('receive', (data) => {
				this.pop.play();
				this.messages.push({
					name: 'Player',
					message: this.prepareMessage(data.data.message)
				});
			});
			this.wss.connect();
			
			this.pop = new Audio('./audio/pop.mp3');
			this.pop.volume = .2;
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
			
			this.wss.send({
				messageType: 'chat',
				data: {
					message: this.chatInput()
				}
			});
			
			this.messages.push({
				name: 'Nathan',
				message: this.prepareMessage(this.chatInput()),
				isMe: true
			});
			
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
	}
}