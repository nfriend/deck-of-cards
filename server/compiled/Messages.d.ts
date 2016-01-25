import Card = require('./Card');
export interface Message {
    messageType: string;
    data: any;
}
export interface ChatMessage extends Message {
    data: {
        playerId: string;
        message: string;
    };
}
export interface ChatHistoryMessage extends Message {
    data: {
        messages: ChatMessage[];
    };
}
export interface RequestChatHistory extends Message {
}
export interface RequestPlayerUpdate extends Message {
}
export interface JoinMessage extends Message {
    data: {
        gameId: string;
        playerId: string;
        playerName: string;
        playerColor: string;
    };
}
export interface UpdatePlayersMessage extends Message {
    data: {
        players: Array<{
            id: string;
            name: string;
            color: string;
        }>;
    };
}
export interface UpdateMyPlayerInfoMessage extends Message {
    data: {
        playerName: string;
        playerColor: string;
    };
}
export interface AddCardsMessage extends Message {
    data: {
        cards: Card[];
    };
}
export interface UpdateCardsMessage extends Message {
    data: {
        cards: Card[];
    };
}
export interface UpdateCardMessage extends Message {
    data: {
        card: Card;
    };
}
