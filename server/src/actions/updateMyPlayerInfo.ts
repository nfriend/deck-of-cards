import Connection = require('../Connection');
import Messages = require('../Messages');
import GameClientMapping = require('../GameIdToGame');

export = updateMyPlayerInfo;

function updateMyPlayerInfo(gameIdToClients: GameClientMapping, connection: Connection, message: Messages.UpdateMyPlayerInfoMessage) {

    connection.player.name = message.data.playerName;
    connection.player.color = message.data.playerColor;
        
    // alert all other players about the updates player info
    gameIdToClients[connection.gameId].connections.forEach(playerConnection => {
        if (connection !== playerConnection) {
            let updateMessage: Messages.UpdatePlayersMessage = {
                messageType: 'updatePlayers',
                data: {
                    players: gameIdToClients[connection.gameId].connections.map(c => {
                       return {
                           id: c.player.id,
                           name: c.player.name,
                           color: c.player.color     
                       } 
                    })
                }
            }
            
            playerConnection.sendMessage(updateMessage);
        }
    });
}
