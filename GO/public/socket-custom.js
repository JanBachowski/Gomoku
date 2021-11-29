import { game, logic, makeMove, currentPlayer } from "./boardGO.js";

const socket = io();

//definition of the trigger function which restricts which calls
// the make a move function if the opposite player moved.
function triggerMove([row, cell]) {
    const opposite = logic.currentPlayer === "white"
        ? "black"
        : "white";

    logic.makeMove(row, cell);
    game.updateBoard(opposite, row, cell);
}

//check if connected
socket.on("connect", function () {
    console.log("Connected");
});

// Listen
socket.on("disconnect", function () {
    console.log("Lost connection");
});

// Listen
socket.on("move", function (data) {
    console.log("From Server:", data);
    var myObj = JSON.parse(data);  
    console.log(myObj.player);
    console.log(currentPlayer);

    // Ignore own move
    if (myObj.player.toLowerCase() === currentPlayer) return; // black === Black

    var xmove = [myObj.move.r, myObj.move.c]
    triggerMove(xmove);
});

// fucntion which sends the move to the server
function emitMove(player, move) {
    var data = {
        "player": player,
        "move"  : {
            "r":move[0],
            "c":move[1]
        }
      };
      let dataToSend = JSON.stringify(data);
      console.log(dataToSend);

    socket.emit("move",dataToSend, function (resp){
        console.log(resp)
    })

}

export { emitMove };