module DeckOfCards.ViewModel {
	
	interface ChatMessage {
		name: string;
		message: string;
		isMe?: boolean;
	}
	
	export class ChatViewModel {
		messages: KnockoutObservableArray<ChatMessage> = ko.observableArray([])
		chatInput: KnockoutObservable<string> = ko.observable(null);
		
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
				this.messages.push({
					name: 'Player',
					message: data.data.message
				});
			});
			this.wss.connect();
		}
		
		chatInputKeyDown = (e: KeyboardEvent) => {
			if (e.which === Key.Enter && !e.shiftKey) {
				e.preventDefault();
				this.send();
				return false;
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
				message: this.chatInput(),
				isMe: true
			})
			this.chatInput('');
		}
	}
}