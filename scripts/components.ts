/// <reference path="./viewModel/ChatViewModel" />
/// <reference path="./viewModel/PlayerInfoViewModel" />
/// <reference path="./viewModel/ToolbarViewModel" />
/// <reference path="./viewModel/modals/AddCardsViewModel" />
/// <reference path="./viewModel/modals/InfoViewModel" />

module DeckOfCards {
	
	ko.components.register('chat', {
		template: { url: './views/chat.html' },
		viewModel: ViewModel.ChatViewModel
	});
	
	ko.components.register('playerinfo', {
		template: { url: './views/player-info.html' },
		viewModel: ViewModel.PlayerInfoViewModel
	});
    
    ko.components.register('toolbar', {
		template: { url: './views/toolbar.html' },
		viewModel: ViewModel.ToolbarViewModel
	});
    
    ko.components.register('add-cards-modal', {
		template: { url: './views/modals/add-cards.html' },
		viewModel: ViewModel.AddCardsViewModel
	});
    
    ko.components.register('info-modal', {
		template: { url: './views/modals/info.html' },
		viewModel: ViewModel.InfoViewModel
	});
}