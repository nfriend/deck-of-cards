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
interface RequestChatHistoryMessage extends Message {
}
interface RequestPlayerUpdateMessage extends Message {
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
interface AddCardsMessage extends Message {
    data: {
        cards: Card[];
    };
}
interface UpdateCardsMessage extends Message {
    data: {
        cards: Card[];
    };
}
interface UpdateCardMessage extends Message {
    data: {
        card: Card;
    };
}
interface RequestCardUpdateMessage extends Message {
}
