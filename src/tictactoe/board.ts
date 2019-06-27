export class Board {
    private _grid: Array<Array<Square>>;
    private _row: number;
    private _col: number;
    constructor(row: number, col: number) {
        this._grid = new Array<Array<Square>>();
        this._row = row;
        this._col = col;
        for(let i = 0; i < row; i++) {
            this._grid[i] = new Array<Square>(col);
            this._grid[i].fill("-");

        }
    }
    print() {
        for(let i = 0; i < this._row; i++) {
            console.log(this._grid[i].join('|'));
        }
    }
    placeToken(row: number, col: number, value: Square) {
        if(this._grid[row][col] === "-") {
            this._grid[row][col] = value;
        } else {
            throw (`Cannot place ${value} to ${row+1} ${col+1}`);
        }
    }
    checkFull(): boolean {
        for(let i = 0; i < this._row; i++) {
            for(let j = 0; j < this._col;j++) {
                if(this._grid[i][j]==="-") {
                    return false;
                }
            }
        }
        return true;
    }

    autoMove(value: Square): void {
        const i = this._getRandomInt(this._row);
        const j = this._getRandomInt(this._col);
        if(this._grid[i][j] === '-') {
            this._grid[i][j] = value;
        } else {
            throw(`Cannot put ${value} to ${i+1} ${j+1}`);
        }
    }
    private _getRandomInt(max: number): number {
        return Math.floor(Math.random() * Math.floor(max));
    }
}

type Square = "X" | "0" | "-";
const board = new Board(3, 3);
// board.placeToken(0,0,"X");
// board.placeToken(1,1,"0");
// board.placeToken(1,2,"X");
board.autoMove("0");
board.print();
board.autoMove("X");
board.print();
board.autoMove("0");
board.print();
board.autoMove("X");
board.print();
board.autoMove("0");
board.print();
board.autoMove("X");
board.print();
board.autoMove("0");
board.print();
board.autoMove("X");
board.print();
board.autoMove("0");
board.print();
board.autoMove("X");
board.print();
