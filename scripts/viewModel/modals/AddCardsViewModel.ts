/// <reference path="../../typings/deck-of-cards-server/Suit" />
/// <reference path="../../typings/deck-of-cards-server/CardValue" />
/// <reference path="../../typings/deck-of-cards-server/Card" />

module DeckOfCards.ViewModel {

    interface SuitForBinding {
        name: string;
        cards: CardForBinding[];
        suitEnum: Suit;
    }

    interface CardForBinding {
        name: string;
        imageUrl: string;
        count: KnockoutObservable<number>;
        cardValueEnum: CardValue;
    }

    enum MouseButton {
        LeftButton = 1,
        MiddleButton = 2,
        RightButton = 3
    }

    export class AddCardsViewModel {

        isVisible = ko.observable(false);
        suits: Array<SuitForBinding> = [];

        constructor() {
            if (AddCardsViewModel.Instance) {
                throw 'AddCardsViewModel is a singleton and has already been instantiated.  Use AddCardsViewModel.Instance instead.';
            }
            AddCardsViewModel.Instance = this;

            this.suits = [
                {
                    name: 'Spades',
                    cards: [],
                    suitEnum: Suit.Spades
                },
                {
                    name: 'Hearts',
                    cards: [],
                    suitEnum: Suit.Hearts
                },
                {
                    name: 'Diamonds',
                    cards: [],
                    suitEnum: Suit.Diamonds
                },
                {
                    name: 'Clubs',
                    cards: [],
                    suitEnum: Suit.Clubs
                },
                {
                    name: 'Jokers',
                    cards: [],
                    suitEnum: Suit.Jokers
                },
            ];

            this.suits.forEach(suit => {
                if (suit.name !== 'Jokers') {
                    for (var i = 2; i <= 10; i++) {
                        suit.cards.push({
                            name: i.toString(),
                            imageUrl: suit.name.toLowerCase() + '/' + i + '.svg',
                            count: ko.observable(0),
                            cardValueEnum: i
                        });
                    }

                    suit.cards.push({
                        name: 'Jack',
                        imageUrl: suit.name.toLowerCase() + '/jack.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.Jack
                    });

                    suit.cards.push({
                        name: 'Queen',
                        imageUrl: suit.name.toLowerCase() + '/queen.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.Queen
                    });

                    suit.cards.push({
                        name: 'King',
                        imageUrl: suit.name.toLowerCase() + '/king.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.King
                    });

                    suit.cards.push({
                        name: 'Ace',
                        imageUrl: suit.name.toLowerCase() + '/ace.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.Ace
                    });

                } else {
                    suit.cards.push({
                        name: 'Black Joker',
                        imageUrl: 'blackjoker.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.BlackJoker
                    });
                    suit.cards.push({
                        name: 'Red Joker',
                        imageUrl: 'redjoker.svg',
                        count: ko.observable(0),
                        cardValueEnum: CardValue.RedJoker
                    });
                }
            });
        }

        shuffled = ko.observable(true);
        faceDown = ko.observable(true);

        cardMousedown = (card: CardForBinding, ev: JQueryMouseEventObject) => {

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
            let cards: Array<Card> = [];

            this.suits.forEach(suit => {
                suit.cards.forEach(card => {
                    for (var i = 0; i < card.count(); i++) {
                        cards.push({
                            suit: suit.suitEnum,
                            value: card.cardValueEnum,
                            
                            // these are all filled in by the server
                            id: null,
                            position: null,
                            rotation: null,
                            zIndex: null
                        });
                    }
                });
            });
            
            if (this.shuffled()) {
                Utility.shuffle(cards);
            }

            let addCardsMessage: AddCardsMessage = {
                messageType: 'addCards',
                data: {
                    cards: cards
                }
            }
            WebsocketService.Instance.send(addCardsMessage);

            this.closeModal();
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