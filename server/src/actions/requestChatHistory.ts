import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');

export = requestChatHistory;

function requestChatHistory(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.RequestChatHistory) {

    let game = gameIdToGames[connection.gameId]; 
	if (game.chatHistory.length > 0) {
        var chatHistoryMessage: Messages.ChatHistoryMessage = {
            messageType: 'chatHistory',
            data: {
                messages: game.chatHistory
            }
        }
        connection.sendMessage(chatHistoryMessage);
    }
}


