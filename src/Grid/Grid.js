import React, { useState, useEffect } from 'react';
import Square from './Square/Square';

const Grid = (props) => {
  const numRow = props.NUM_ROW;
  const numCol = props.NUM_COL;
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const gridSquares = []
    for(let row=0; row < numRow; row++) {
      const currentSquare = [];
      for(let col=0; col < numCol; col++) {
        currentSquare.push({
          //location: [row, col]
          row,
          col,
          isStart: row === 5 && col === 5,
          isFinish: row === 5 && col === 35,
        });
      }
      gridSquares.push(currentSquare);
    }
    setSquares(gridSquares);
  }, [numRow, numCol]);

  return (
    <div>
      {
        squares.map((square, squareIndx) => {
          const {row, col, isStart, isFinish} = square;
          return (
            <Square
              key={squareIndx}
              row={row}
              col={col}
              isStart={isStart}
              isFinish={isFinish}
            />
          );
        })
      }
    </div>
  );
}

export default Grid;