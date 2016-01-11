function updateMyPlayerInfo(gameIdToClients, connection, message) {
    connection.player.name = message.data.playerName;
    connection.player.color = message.data.playerColor;
    // alert all other players about the updates player info
    gameIdToClients[connection.gameId].connections.forEach(function (playerConnection) {
        if (connection !== playerConnection) {
            var updateMessage = {
                messageType: 'updatePlayers',
                data: {
                    players: gameIdToClients[connection.gameId].connections.map(function (c) {
                        return {
                            id: c.player.id,
                            name: c.player.name,
                            color: c.player.color
                        };
                    })
                }
            };
            playerConnection.sendMessage(updateMessage);
        }
    });
}
module.exports = updateMyPlayerInfo;
//# sourceMappingURL=updateMyPlayerInfo.js.map