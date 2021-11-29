import { Game } from "./Game.js";
import { Logic } from "./logic.js";
import { emitMove } from "./socket-custom.js";

// This file links all the other javascript files

const logic = new Logic();
const game = new Game({ logic, onMove: emitMove });
const turncounter = game.turnCounter;
const lastPlayed = game.lastPlayed;
const makeMove = game.makeMove;
const currentPlayer = game.currentPlayer;


//export { game }
export {
    Game,
    Logic,
    game,
    logic,
    turncounter,
    lastPlayed,
    makeMove,
    currentPlayer
};


