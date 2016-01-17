import Suit = require('./Suit');
import CardValue = require('./CardValue');
export = Card;
interface Card {
    id: string;
    suit: Suit;
    value: CardValue;
    position: {
        x: number;
        y: number;
    };
    rotation: number;
    zIndex: number;
}
