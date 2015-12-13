/// <reference path="./viewModel/ChatViewModel" />
/// <reference path="./viewModel/PlayerInfoViewModel" />

module DeckOfCards {
	
	ko.components.register('chat', {
		template: { url: './views/chat.html' },
		viewModel: ViewModel.ChatViewModel
	});
	
	ko.components.register('playerinfo', {
		template: { url: './views/player-info.html' },
		viewModel: ViewModel.PlayerInfoViewModel
	});
}