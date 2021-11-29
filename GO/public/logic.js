
const nbRows = 19;
const nbColumns = 19;

class Logic {
    constructor() {
        this.nbRows = 19;
        this.nbColumns = 19;
        this.GameBoard = new Array(this.nbRows).fill().map(() => new Array(this.nbColumns).fill(0));
        this.winner = false;
        this.turncounter = 0;
        this.lastPlayed = [];

        if (typeof window !== "undefined") {
            this.currentPlayer = (
                window.location.search.match(/player=([a-z]*)/) || []
            )[1];
        } else {
            this.currentPlayer = "black";
        }
    }

    getPlayer() {
        return this.turncounter % 2
            ? "White"
            : "Black";
    }

    getOwner() {
        return this.turncounter % 2
            ? "2"
            : "1";
    }

    //function which specifies how long a row of counters has to be to win
    five(cells = [], lastOwner) {
        let count = 0;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i] === 0) {
                count = 0;
            }
            else if (cells[i] === lastOwner) {
                count++;
            }
            else {
                count = 1;
            }

            lastOwner = cells[i];

            if (count === 5) {
                return true;
            }
        }

        return false;
    }

    //function which checks for wins in all directions
    _checkWin(grid, rowIndex, index, lastOwner) {

        let diagL = [], diagR = [], horiz = [], vert = [];

        for (let i = 0; i < nbRows; i++) {
            for (let j = 0; j < nbColumns; j++) {

                if (i === rowIndex) {
                    horiz.push(grid[i][j]);
                }

                if (j === index) {
                    vert.push(grid[i][j]);
                }

                if (i - j === rowIndex - index) {
                    diagL.push(grid[i][j]);
                }

                if (i + j === rowIndex + index) {
                    diagR.push(grid[i][j]);
                }
            }
        }

        const lines = [
            this.five(diagL, lastOwner),
            this.five(diagR, lastOwner),
            this.five(horiz, lastOwner),
            this.five(vert, lastOwner)
        ];

        return lines.some(Boolean);
    }

    checkWin() {
        const grid = this.GameBoard;
        const [rowIndex, index] = this.lastPlayed
        const lastOwner = this.getOwner();

        return this._checkWin(grid, rowIndex, index, lastOwner);
    }

    //function which begins the new move process
    triggerMove(rowIndex, index) {
        if (this.GameBoard[rowIndex][index] != 0) return false;

        const player = this.getPlayer();

        // Move not allowed
        if (player.toLowerCase() !== this.currentPlayer) return false;

        this.makeMove(rowIndex, index);

        return player;
    }

    //funciton which finishes the make move process
    makeMove(rowIndex, index) {
        const owner = this.getOwner();
        this.GameBoard[rowIndex][index] = owner;
        this.lastPlayed = [rowIndex, index];
        this.turncounter += 1;
    }
}

export { Logic };
