interface Message {
    messageType: string;
    data: any;
}
interface ChatMessage extends Message {
    data: {
        playerId: string;
        message: string;
    };
}
interface ChatHistoryMessage extends Message {
    data: {
        messages: ChatMessage[];
    };
}
interface JoinMessage extends Message {
    data: {
        id: string;
        playerId: string;
    };
}
