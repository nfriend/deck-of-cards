/// <reference path="./viewModel/ChatViewModel" />

module DeckOfCards {
	ko.components.register('chat', {
		template: { url: './views/chat.html' },
		viewModel: ViewModel.ChatViewModel
	});
}