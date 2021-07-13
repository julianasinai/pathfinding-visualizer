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
        isVisited: false,
      });
    });
    setSquares(gridSquares);
  }, [numRow, numCol]);

  const animate = visitedSquaresInOrder => {
    for(let i = 0; i < visitedSquaresInOrder.length; i++) {
      setTimeout(() => {
        const id = visitedSquaresInOrder[i];
        let newSquares = [...squares];
        newSquares[id].isVisited = true;
        setSquares(newSquares);
      }, 25*i);
    }
  }

  const visualizeBFS = () => {
    const start = grid.toId(START_COL, START_ROW);
    const target = grid.toId(FINISH_COL, FINISH_ROW);
    const visitedSquareInOrder = bfs(grid, start, target);

    animate(visitedSquareInOrder);
  }
  
  const handleClick = () => {
    console.log("clicked");
    visualizeBFS();
  }

  return (
    <>
      <button onClick={handleClick}>Visualize</button>
      <div className={classes.grid}>
        {
          squares.map((square) => {
            const {id, row, col, isStart, isFinish, isVisited} = square;
            return (
              <Square
                key={id}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isVisited={isVisited}
              />
            );
          })
        }
      </div>
    </>
  );
}

export default Grid;