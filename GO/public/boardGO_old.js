import { checkWin } from "./logic.js";
import { emitMove } from "./socket-custom.js";

console.log({ checkWin });

class Game {
    constructor() {
        this.nbRows = 19;
        this.nbColumns = 19;
        this.GameBoard = new Array(nbRows).fill().map(() => new Array(nbColumns).fill(0));
        this.winner = false;
        this.turncounter = 0;
        this.lastPlayed = [];
        this.blackWins = false;
        this.whiteWins = false;
        this.currentPlayer = (
            window.location.search.match(/player=([a-z]*)/) || []
        )[1];
    }
    
}

//constants to create a 19x19 board

const nbRows = 19;
const nbColumns = 19;

// creation of array of arrays as well as definition of variables for later use

let GameBoard = new Array(nbRows).fill().map(() => new Array(nbColumns).fill(0));
let winner = false;
let turncounter = 0;
let lastPlayed = [];
const currentPlayer = (window.location.search.match(/player=([a-z]*)/) || [])[1];

// creation of a board filled with 19x19 cells, where each cell is related to 
// a specific value within the array.

GameBoard.forEach(function (item, rowIndex) {
    let bounding = document.createElement("div");
    bounding.classList.add("boxes");
    item.forEach(function (item, index) {
        let node = document.createElement("div");
        node.classList.add("cell");
        node.classList.add("lines");

        // function which places down a counter on the array once a cell is clicked. 
        node.onclick = function () {
            if (GameBoard[rowIndex][index] !== 0) return;

            let owner;
            let player;

            // determine which player placed the counter based on turncounter.
            if (turncounter % 2 === 0) {
                owner = "1";
                player = 'Black';
            } else {
                owner = "2";
                player = 'White';
            }

            // prevents one instance from moving twice in a row
            if (player.toLowerCase() !== currentPlayer) return;

            //calls makemove function
            makeMove(player, rowIndex, index);
        };

        //creates the hover effect when mouse is moved over an empty cell
        node.onmouseover = function () {
            if (turncounter % 2 === 0) {
                node.classList.add("translucentblack");
            } else {
                node.classList.add("translucentwhite");
            }
        };

        //removes hover effect after a short time delay after mouse moves away.
        node.onmouseleave = function () {
            setTimeout(function () {
                node.classList.remove("translucentblack", "translucentwhite");
            }, 300);
        };

        bounding.appendChild(node);
    });
    document.getElementById("board").appendChild(bounding);
});

const winningMessageElement = document.querySelector(".winning-message")
const winningMessageText = document.querySelector("[data-winning-message]")

function makeMove(player, rowIndex, index, avoidEmit) {
    console.log(player, rowIndex, index)

    const owner = player === 'black' ? '0' : '1';
    const node = document.querySelectorAll('.boxes')[rowIndex].children[index];

    turncounter += 1;
    lastPlayed = [rowIndex, index];

    node.classList.add(player.toLowerCase());

    //begins the ping process by noting down which cell has been played.
    GameBoard[rowIndex][index] = owner;
    if (!avoidEmit) {
        emitMove(player, lastPlayed);
    }

    const won = checkWin(GameBoard, rowIndex, index, owner);

    //calls the function which checks for wins
    if (won) {
        playerWon(player);
    }
}
//function which responds to a win being detected and stops the game.
function playerWon(player) {
    console.log(player, 'win!');

    winningMessageElement.classList.add("show");
    winningMessageText.innerText = `${player} Wins!`; 
}

const restartButton = document.getElementById('restartButton')

//exports the necessary files
export {
    turncounter,
    lastPlayed,
    makeMove,
    currentPlayer
};
