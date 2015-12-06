ko.bindingHandlers['interact'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        interact(element).draggable({
            inertia: true,
            // restrict: {
            //     restriction: 'parent',
            //     endOnly: true,
            //     elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
            // },
            onmove: dragMoveListener
        });
        function dragMoveListener(event) {
            var target = event.target, 
            // keep the dragged position in the data-x/data-y attributes
            x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx, y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            // translate the element
            target.style.webkitTransform =
                target.style.transform =
                    'translate3d(' + x + 'px, ' + y + 'px,0)';
            // update the posiion attributes
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    },
};
var DeckOfCards;
(function (DeckOfCards) {
    var ViewModel;
    (function (ViewModel) {
        var DeckOfCardsViewModel = (function () {
            function DeckOfCardsViewModel() {
                var cards = [];
                for (var i = 0; i < 4; i++) {
                    var suits = {
                        0: 'Diamonds',
                        1: 'Hearts',
                        2: 'Spades',
                        3: 'Clubs'
                    };
                    for (var j = 0; j < 13; j++) {
                        var card = j + '';
                        if (j === 0) {
                            card = 'Ace';
                        }
                        else if (j === 10) {
                            card = 'Jack';
                        }
                        else if (j === 10) {
                            card = 'Queen';
                        }
                        else if (j === 10) {
                            card = 'King';
                        }
                        cards.push(card + ' of ' + suits[i]);
                    }
                }
                this.cards = ko.observableArray(cards);
            }
            return DeckOfCardsViewModel;
        })();
        ViewModel.DeckOfCardsViewModel = DeckOfCardsViewModel;
    })(ViewModel = DeckOfCards.ViewModel || (DeckOfCards.ViewModel = {}));
})(DeckOfCards || (DeckOfCards = {}));
/// <reference path="bindings/interact-binding" />
/// <reference path="viewModel/DeckOfCardsViewModel" />
var DeckOfCards;
(function (DeckOfCards) {
    ko.applyBindings(new DeckOfCards.ViewModel.DeckOfCardsViewModel, document.getElementById('deck-of-cards-app-container'));
})(DeckOfCards || (DeckOfCards = {}));
//# sourceMappingURL=deck-of-cards.js.map