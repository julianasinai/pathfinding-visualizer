import React, { useState, useEffect } from 'react';
import Square from './Square/Square';
import { makeStyles } from '@material-ui/styles';
import SquareGrid from '../structure/SquareGrid';
import {bfs} from '../algorithms/bfs';

const START_ROW = 5;
const START_COL = 5;
const FINISH_ROW = 5;
const FINISH_COL = 10;

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(50, 25px)',//'repeat(50 1fr)'
    gridGap: '3px',
  },
});

const Grid = (props) => {
  const classes = useStyles();

  const numRow = props.NUM_ROW;
  const numCol = props.NUM_COL;
  const [grid, setGrid] = useState({});
  const [squares, setSquares] = useState([]);
  const [mousePressed, setMousePressed] = useState(false);

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
        isWall: false,
        inShortestPath: false,
      });
    });
    setSquares(gridSquares);
  }, [numRow, numCol]);

  const animateShortestPath = shortestPath => {
    for(let i = 0; i < shortestPath.length; i++) {
      let id = shortestPath[i]
      console.log(id)
      setTimeout(() => {
        let newSquares = [...squares];
        newSquares[id].inShortestPath = true;
        setSquares(newSquares);
      }, 10*i);
    }
  };

  const animate = (visitedSquaresInOrder, shortestPath) => {
    for(let i = 0; i <= visitedSquaresInOrder.length; i++) {
      setTimeout(() => {
        if(i === visitedSquaresInOrder.length) {
          animateShortestPath(shortestPath);
          return;
        }
        const id = visitedSquaresInOrder[i];
        let newSquares = [...squares];
        newSquares[id].isVisited = true;
        setSquares(newSquares);
      }, 25*i);
    }
  };

  const visualizeBFS = () => {
    const start = grid.toId(START_COL, START_ROW);
    const target = grid.toId(FINISH_COL, FINISH_ROW);
    const result = bfs(grid, start, target);
    const visitedSquareInOrder = result.visitedSquaresInOrder;
    const shortestPath = result.shortestPath;

    animate(visitedSquareInOrder, shortestPath);
  };
  
  const handleClick = () => {
    console.log("clicked");
    visualizeBFS();
  };

  const toggleWall = (squares, id) => {
    let newSquares = [...squares]
    newSquares[id].isWall = !newSquares[id].isWall;
    let newGrid = grid;
    if(newSquares[id].isWall) {
      newGrid.walls.add(id);
    }
    setGrid(newGrid);
    return newSquares;
  }

  const handleMouseDown = id => {
    const newSquares = toggleWall(squares, id);
    setSquares(newSquares);
    setMousePressed(true);
  }

  const handleMouseEnter = id => {
    if(!mousePressed) return;
    const newSquares = toggleWall(squares, id);
    setSquares(newSquares);
  }

  const handleMouseUp = () => {
    setMousePressed(false);
  }

  return (
    <>
      <button onClick={handleClick}>Visualize</button>
      <div className={classes.grid}>
        {
          squares.map((square) => {
            const {id, row, col, isStart, isFinish, isVisited, isWall, inShortestPath} = square;
            return (
              <Square
                id={id}
                key={id}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isVisited={isVisited}
                isWall={isWall}
                inShortestPath={inShortestPath}
                onMouseDown={(id) => handleMouseDown(id)}
                onMouseEnter={(id) => handleMouseEnter(id)}
                onMouseUp={() => handleMouseUp()}
              />
            );
          })
        }
      </div>
    </>
  );
}

export default Grid;