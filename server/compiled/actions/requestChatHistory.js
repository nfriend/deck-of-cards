function requestChatHistory(gameIdToGames, connection, message) {
    var game = gameIdToGames[connection.gameId];
    if (game.chatHistory.length > 0) {
        var chatHistoryMessage = {
            messageType: 'chatHistory',
            data: {
                messages: game.chatHistory
            }
        };
        connection.sendMessage(chatHistoryMessage);
    }
}
module.exports = requestChatHistory;
//# sourceMappingURL=requestChatHistory.js.map