import React, { useState, useEffect } from 'react';
import Square from './Square/Square';
import { makeStyles } from '@material-ui/styles';
import SquareGrid from '../structure/SquareGrid';

const useStyles = makeStyles({
  grid: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(50, 40px)',//'repeat(50 1fr)'
    gridGap: '5px',
  },
});

const Grid = (props) => {
  const classes = useStyles();

  const numRow = props.NUM_ROW;
  const numCol = props.NUM_COL;
  const [squares, setSquares] = useState([]);

  // useEffect(() => {
  //   const gridSquares = []
  //   for(let row=0; row < numRow; row++) {
  //     //const currentSquare = [];
  //     for(let col=0; col < numCol; col++) {
  //       gridSquares.push({
  //         //location: [row, col]
  //         row,
  //         col,
  //         isStart: row === 5 && col === 5,
  //         isFinish: row === 5 && col === 35,
  //       });
  //     }
  //     //gridSquares.push(currentSquare);
  //   }
  //   setSquares(gridSquares);
  // }, [numRow, numCol]);
  useEffect(() => {
    const gridSquares = []
    const grid = new SquareGrid(numRow, numCol);

    Object.keys(grid.edges).forEach((square) => {
      let [col, row] = grid.from_id(square);
      gridSquares.push({
        id: square,
        col,
        row,
        isStart: row === 5 && col === 5,
        isFinish: row === 5 && col === 35,
      });
    });
    setSquares(gridSquares);
  }, [numRow, numCol]);

  return (
    <div className={classes.grid}>
      {
        squares.map((square) => {
          const {id, row, col, isStart, isFinish} = square;
          return (
            <Square
              key={id}
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