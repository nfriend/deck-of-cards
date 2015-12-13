/// <refernce

module DeckOfCards.ViewModel {
	
	interface ChatMessage {
		name: string;
		message: string;
		isMe?: boolean;
	}
	
	export class ChatViewModel {
		messages: KnockoutObservableArray<ChatMessage> = ko.observableArray([])
		chatInput: KnockoutObservable<string> = ko.observable(null);
		
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
			
			this.messages.push({
				name: 'Nathan',
				message: this.chatInput(),
				isMe: true
			})
			this.chatInput('');
		}
	}
}