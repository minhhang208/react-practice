"use strict";
exports.__esModule = true;
var Board = /** @class */ (function () {
    function Board(row, col) {
        this._grid = new Array();
        this._row = row;
        this._col = col;
        for (var i = 0; i < row; i++) {
            this._grid[i] = new Array(col);
            this._grid[i].fill("-");
        }
    }
    Board.prototype.print = function () {
        for (var i = 0; i < this._row; i++) {
            console.log(this._grid[i].join('|'));
        }
    };
    Board.prototype.placeToken = function (row, col, value) {
        if (this._grid[row][col] === "-") {
            this._grid[row][col] = value;
        }
        else {
            throw ("Cannot place " + value + " to " + (row + 1) + " " + (col + 1));
        }
    };
    Board.prototype.checkFull = function () {
        for (var i = 0; i < this._row; i++) {
            for (var j = 0; j < this._col; j++) {
                if (this._grid[i][j] === "-") {
                    return false;
                }
            }
        }
        return true;
    };
    Board.prototype.autoMove = function (value) {
        var i = this._getRandomInt(this._row);
        var j = this._getRandomInt(this._col);
        if (this._grid[i][j] === '-') {
            this._grid[i][j] = value;
        }
        else {
            throw ("Cannot put " + value + " to " + (i + 1) + " " + (j + 1));
        }
    };
    Board.prototype._getRandomInt = function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    };
    return Board;
}());
exports.Board = Board;
var board = new Board(3, 3);
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
