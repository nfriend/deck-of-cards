/// <reference path="../typings/deck-of-cards-server/Messages" />

module DeckOfCards.ViewModel {
    export class ToolbarViewModel {
        constructor() {
        }
        
        addButtonClicked = () => {
            AddCardsViewModel.ShowModal();
        }
        
        infoButtonClicked = () => {
            InfoViewModel.ShowModal();
        }
    }
}