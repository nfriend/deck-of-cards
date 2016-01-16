module DeckOfCards.ViewModel {

    interface Suit {
        name: string;
        cards: Card[];
    }

    interface Card {
        name: string;
        imageUrl: string;
        count: KnockoutObservable<number>;
    }

    enum MouseButton {
        LeftButton = 1,
        MiddleButton = 2,
        RightButton = 3
    }

    export class AddCardsViewModel {

        isVisible = ko.observable(false);
        suits: Array<Suit> = [];

        constructor() {
            if (AddCardsViewModel.Instance) {
                throw 'AddCardsViewModel is a singleton and has already been instantiated.  Use AddCardsViewModel.Instance instead.';
            }
            AddCardsViewModel.Instance = this;

            this.suits = [
                {
                    name: 'Spades',
                    cards: []
                },
                {
                    name: 'Hearts',
                    cards: []
                },
                {
                    name: 'Diamonds',
                    cards: []
                },
                {
                    name: 'Clubs',
                    cards: []
                },
                {
                    name: 'Jokers',
                    cards: []
                },
            ];

            this.suits.forEach(suit => {
                if (suit.name !== 'Jokers') {
                    for (var i = 2; i <= 10; i++) {
                        suit.cards.push({
                            name: i.toString(),
                            imageUrl: suit.name.toLowerCase() + '/' + i + '.svg',
                            count: ko.observable(0)
                        });
                    }
                    ['Jack', 'Queen', 'King', 'Ace'].forEach(faceCard => {
                        suit.cards.push({
                            name: faceCard,
                            imageUrl: suit.name.toLowerCase() + '/' + faceCard.toLowerCase() + '.svg',
                            count: ko.observable(0)
                        });
                    });
                } else {
                    suit.cards.push({
                        name: 'Black Joker',
                        imageUrl: 'blackjoker.svg',
                        count: ko.observable(0)
                    });
                    suit.cards.push({
                        name: 'Red Joker',
                        imageUrl: 'redjoker.svg',
                        count: ko.observable(0)
                    });
                }
            });
        }

        cardMousedown = (card: Card, ev: JQueryMouseEventObject) => {

            if (ev.which === MouseButton.LeftButton) {
                card.count(card.count() + 1);
            } else if (ev.which === MouseButton.MiddleButton) {
                card.count(0);
            } else if (ev.which === MouseButton.RightButton) {
                if (card.count() > 0) {
                    card.count(card.count() - 1);
                }
            }

            ev.preventDefault();
            return false;
        }
        
        addFullDeck = () => {
            this.suits.forEach(suit => {
               suit.cards.forEach(card => {
                   card.count(card.count() + 1); 
               });
            });
        }
        
        clearAll = () => {
            this.suits.forEach(suit => {
               suit.cards.forEach(card => {
                   card.count(0); 
               });
            });
        }
        
        totalCount = ko.pureComputed(() => {
            let total = 0;
            this.suits.forEach(suit => {
               suit.cards.forEach(card => {
                   total = total + card.count(); 
               });
            });
            return total;
        });

        closeModal = () => {
            this.isVisible(false);
        }

        addCardsButtonClicked = () => {

        }

        static Instance: AddCardsViewModel;

        static ShowModal() {
            AddCardsViewModel.Instance.isVisible(true);
        }

        static HideModal() {
            AddCardsViewModel.Instance.closeModal();
        }
    }
}