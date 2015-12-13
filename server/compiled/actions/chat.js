function chat(gameIdToClients, connection, message) {
    (gameIdToClients[connection.gameId] || []).forEach(function (playerConnection) {
        if (connection !== playerConnection) {
            playerConnection.sendUTF(JSON.stringify(message));
        }
    });
}
module.exports = chat;
//# sourceMappingURL=chat.js.map