import Connection = require('./Connection');
import Message = require('./Messages');
export = Game;
interface Game {
    id: string;
    connections: Connection[];
    chatHistory: Message.ChatMessage[];
}
