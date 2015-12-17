export interface Message {
	messageType: string,
	data: any
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

export interface JoinMessage extends Message {
	data: {
		gameId: string;
		playerId: string;
		playerName: string;
		playerColor: string;
	};
}

