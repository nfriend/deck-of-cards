module DeckOfCards.ViewModel {
	
	export class DeckOfCardsViewModel {
		cards: KnockoutObservableArray<string>;
		
		constructor() {
			var cards = [];
			
			for (var i = 0; i < 4; i++) {
				var suits = {
					0: 'Diamonds',
					1: 'Hearts',
					2: 'Spades',
					3: 'Clubs'
				}
				
				for (var j = 0; j < 13; j++) {
					
					var card = j + '';
					if (j === 0) {
						card = 'Ace'; 
					} else if (j === 10) {
						card = 'Jack';
					} else if (j === 10) {
						card = 'Queen';
					} else if (j === 10) {
						card = 'King';
					}
					
					cards.push(card + ' of ' + suits[i]);	
				}
			}
			
			this.cards = ko.observableArray(cards);	
		}
	}
}