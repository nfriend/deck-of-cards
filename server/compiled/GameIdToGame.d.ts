import Game = require('./Game');
export = GameIdToGame;
interface GameIdToGame {
    [gameId: string]: Game;
}
