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
interface RequestChatHistory extends Message {
}
interface RequestPlayerUpdate extends Message {
}
interface JoinMessage extends Message {
    data: {
        gameId: string;
        playerId: string;
        playerName: string;
        playerColor: string;
    };
}
interface UpdatePlayersMessage extends Message {
    data: {
        players: Array<{
            id: string;
            name: string;
            color: string;
        }>;
    };
}
interface UpdateMyPlayerInfoMessage extends Message {
    data: {
        playerName: string;
        playerColor: string;
    };
}
