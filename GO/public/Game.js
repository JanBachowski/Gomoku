class Game {
    constructor({ logic, onMove = () => { } }) {
        this.logic = logic;
        this.createBoard();
        this.onMove = onMove;

        document.body.classList.add(this.logic.getPlayer())
    }


// creation of a board filled with 19x19 cells, where each cell is related to 
// a specific value within the array.
    createRow(item, rowIndex) {
        let bounding = document.createElement("div");
        bounding.classList.add("boxes");
        item.forEach((item, index) => {
            let node = document.createElement("div");
            node.classList.add("cell");
            node.classList.add("lines");
            //function which registers moves being made
            node.onclick = () => {
                this.onCellClick(rowIndex, index);
            };

            //function which shows a translucent counter on hovering over an empty cell
            node.onmouseover = () => {
                const player = this.logic.getPlayer().toLowerCase();
                node.classList.add("translucent" + player);
            };

            // function which removes the mousover after a short time
            node.onmouseleave = () => {
                setTimeout(() => {
                    const player = this.logic.getPlayer().toLowerCase();
                    node.classList.remove("translucent" + player);
                }, 300);
            };

            bounding.appendChild(node);
        });

        document.getElementById("board").appendChild(bounding);
    }

    createBoard() {
        // Creates HTML for the board and binds click events
        this.logic.GameBoard.forEach(this.createRow.bind(this));
    }

    onCellClick(rowIndex, index) {
        // Triggers game move
        const player = this.logic.triggerMove(rowIndex, index);

        // prevents Invalid moves from taking place
        if (!player) return;

        this.updateBoard(player, rowIndex, index);
    
        // Triggers custom move event as a socket emit
        this.onMove(player, this.logic.lastPlayed);
    }

    updateBoard(player, rowIndex, index) {
        console.log({player})
        // Updates cell
        const node = document.querySelectorAll(".boxes")[rowIndex].children[index];
        node.classList.add(player.toLowerCase());

        const won = this.logic.checkWin();

        // function which calls the function which checks for a win.
        if (won) {
            this.playerWon(player);
        }
    }

    //function which stops the game upon a player winning
    playerWon(player) {
        const winningMessageElement = document.querySelector(".winning-message");
        const winningMessageText = document.querySelector("[data-winning-message]");
        console.log(player, "win!");

        winningMessageElement.classList.add("show");
        winningMessageText.innerText = `${player} Wins!`;
    }
}

export { Game };