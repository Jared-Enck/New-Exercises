import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";
// import { copySelection } from "@testing-library/user-event/dist/types/document";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=5, ncols=5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let x = 0; x < nrows; x++) {
      let row = []
      for (let y = 0; y < ncols; y++) {
        row.push(Math.random() < chanceLightStartsOn)
      }
      initialBoard.push(row)
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [x, y] = coord.split("-").map(Number);

      const flipCell = (x, y, boardCopy) => {
        // if this coord is actually on board, flip it

        if (y >= 0 && y < ncols && x >= 0 && x < nrows) {
          boardCopy[x][y] = !boardCopy[x][y];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(x, y, boardCopy);
      flipCell(x, y - 1, boardCopy);
      flipCell(x, y + 1, boardCopy);
      flipCell(x - 1, y, boardCopy);
      flipCell(x + 1, y, boardCopy);

      // TODO: return the copy
      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return (
      <div className="row justify-content-center">
        <div className="Board-Winner"
        >
          <p className="mt-2">
            You Win!
          </p>
          <button 
            onClick={() => setBoard(createBoard())}
            className="btn btn-medium btn-primary shadow">
            Restart
          </button>
        </div>
      </div>
    )
  }

  // make table board

  // TODO
  let tblBoard = [];

  for (let x = 0; x < nrows; x++) {
    let row = [];
    for (let y = 0; y < ncols; y++) {
      let coord = `${x}-${y}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[x][y]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tblBoard.push(<tr key={x}>{row}</tr>);
  }

  return (
    <div className="row mx-auto justify-content-center">
      <div className="Board m-3 card bg-light shadow">
        <div className="card-body">
          <h2 className="card-title">
            Lights Out!
          </h2>
          <hr></hr>
          <table>
            <tbody>
              {tblBoard}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Board;
