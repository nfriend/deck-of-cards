import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');

export = requestPlayerUpdate;

function requestPlayerUpdate(gameIdToGames: GameClientMapping, connection: Connection, message: Messages.RequestPlayerUpdate) {

    let gameId = connection.gameId;
     
    let updatedPlayersMessage: Messages.UpdatePlayersMessage = {
        messageType: 'updatePlayers',
        data: {
            players: gameIdToGames[gameId].connections.map(c => {
                return {
                    id: c.player.id,
                    color: c.player.color,
                    name: c.player.name
                }
            })
        }
    };
    connection.sendMessage(updatedPlayersMessage);
}


