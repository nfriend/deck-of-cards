function chat(gameIdToClients, connection, message) {
    var game = gameIdToClients[connection.gameId];
    if (game) {
        gameIdToClients[connection.gameId].connections.forEach(function (playerConnection) {
            if (connection !== playerConnection) {
                playerConnection.sendMessage(message);
            }
        });
        game.chatHistory.push(message);
        if (game.chatHistory.length > 50) {
            game.chatHistory.shift();
        }
    }
}
module.exports = chat;
//# sourceMappingURL=chat.js.map