import Connection = require('./Connection');
import Message = require('./Messages');
import Card = require('./Card');
export = Game;
interface Game {
    id: string;
    connections: Connection[];
    chatHistory: Message.ChatMessage[];
    cards: Card[];
}
