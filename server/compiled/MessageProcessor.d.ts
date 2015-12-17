import Connection = require('./Connection');
import Messages = require('./Messages');
export = MessageProcessor;
declare class MessageProcessor {
    static Instance: MessageProcessor;
    private gameIdToClients;
    constructor();
    processMessage(connection: Connection, message: Messages.Message): void;
    removeClient(connection: Connection): void;
}
