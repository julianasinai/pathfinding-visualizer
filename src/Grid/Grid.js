import React, { useState, useEffect } from 'react';
import Square from './Square/Square';
import { makeStyles } from '@material-ui/styles';
import SquareGrid from '../structure/SquareGrid';
import {bfs} from '../algorithms/bfs';

const START_ROW = 5;
const START_COL = 5;
const FINISH_ROW = 5;
const FINISH_COL = 35;

const useStyles = makeStyles({
  grid: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // justifyContent: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(50, 25px)',//'repeat(50 1fr)'
    gridGap: '5px',
  },
});

const Grid = (props) => {
  const classes = useStyles();

  const numRow = props.NUM_ROW;
  const numCol = props.NUM_COL;
  const [grid, setGrid] = useState({});
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
    setGrid(grid);
    Object.keys(grid.edges).forEach((square) => {
      let [col, row] = grid.fromId(square);
      gridSquares.push({
        id: square,
        col,
        row,
        isStart: row === START_ROW && col === START_COL,
        isFinish: row === FINISH_ROW && col === FINISH_COL,
      });
    });
    setSquares(gridSquares);
  }, [numRow, numCol]);

  // const animate = (visitedSquaresInOrder) => {
  //   for(let i = 0; i < visitedSquaresInOrder.length(); i++){
  //     setTimeout(() => {
  //       const id = visitedSquaresInOrder[i];

  //       })
  //     })
  //   }
  // }

  const visualizeBFS = () => {
    const start = grid.toId(START_COL, START_ROW);
    const target = grid.toId(FINISH_COL, FINISH_ROW);
    const visitedSquareInOrder = bfs(grid, start, target);
    
  }
  
  const handleClick = () => {
    visualizeBFS();
  }


  return (
    <>
      <button onClick={handleClick}>Visualize</button>
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
    </>
  );
}

export default Grid;