module DeckOfCards {
    export var cardToImagePath: {
        [suit: number]: {
            [cardValue: number]: string
        }
    } = {
            1: {
                1: 'spades/ace.svg',
                2: 'spades/2.svg',
                3: 'spades/3.svg',
                4: 'spades/4.svg',
                5: 'spades/5.svg',
                6: 'spades/6.svg',
                7: 'spades/7.svg',
                8: 'spades/8.svg',
                9: 'spades/9.svg',
                10: 'spades/10.svg',
                11: 'spades/jack.svg',
                12: 'spades/queen.svg',
                13: 'spades/king.svg',
            },
            2: {
                1: 'diamonds/ace.svg',
                2: 'diamonds/2.svg',
                3: 'diamonds/3.svg',
                4: 'diamonds/4.svg',
                5: 'diamonds/5.svg',
                6: 'diamonds/6.svg',
                7: 'diamonds/7.svg',
                8: 'diamonds/8.svg',
                9: 'diamonds/9.svg',
                10: 'diamonds/10.svg',
                11: 'diamonds/jack.svg',
                12: 'diamonds/queen.svg',
                13: 'diamonds/king.svg',
            },
            3: {
                1: 'hearts/ace.svg',
                2: 'hearts/2.svg',
                3: 'hearts/3.svg',
                4: 'hearts/4.svg',
                5: 'hearts/5.svg',
                6: 'hearts/6.svg',
                7: 'hearts/7.svg',
                8: 'hearts/8.svg',
                9: 'hearts/9.svg',
                10: 'hearts/10.svg',
                11: 'hearts/jack.svg',
                12: 'hearts/queen.svg',
                13: 'hearts/king.svg',
            },
            4: {
                1: 'clubs/ace.svg',
                2: 'clubs/2.svg',
                3: 'clubs/3.svg',
                4: 'clubs/4.svg',
                5: 'clubs/5.svg',
                6: 'clubs/6.svg',
                7: 'clubs/7.svg',
                8: 'clubs/8.svg',
                9: 'clubs/9.svg',
                10: 'clubs/10.svg',
                11: 'clubs/jack.svg',
                12: 'clubs/queen.svg',
                13: 'clubs/king.svg',
            },
            5: {
                14: 'blackjoker.svg',
                15: 'redjoker.svg',
            }
        };
}