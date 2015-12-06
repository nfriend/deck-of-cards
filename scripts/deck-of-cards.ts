/// <reference path="bindings/interact-binding" />
/// <reference path="viewModel/DeckOfCardsViewModel" />

module DeckOfCards {
	ko.applyBindings(new ViewModel.DeckOfCardsViewModel, document.getElementById('deck-of-cards-app-container'));
}