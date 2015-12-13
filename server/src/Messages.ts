export interface Message {
	messageType: string,
	data: any
}

export interface ChatMessage extends Message {
	data: {
		message: string;
	};
}

export interface JoinMessage extends Message {
	data: {
		id: string;
	};
}

