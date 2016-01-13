function requestPlayerUpdate(gameIdToGames, connection, message) {
    var gameId = connection.gameId;
    var updatedPlayersMessage = {
        messageType: 'updatePlayers',
        data: {
            players: gameIdToGames[gameId].connections.map(function (c) {
                return {
                    id: c.player.id,
                    color: c.player.color,
                    name: c.player.name
                };
            })
        }
    };
    connection.sendMessage(updatedPlayersMessage);
}
module.exports = requestPlayerUpdate;
//# sourceMappingURL=requestPlayerUpdate.js.map