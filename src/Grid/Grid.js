import React, { useState, useEffect } from 'react';
import Square from './Square/Square';
import { makeStyles } from '@material-ui/styles';
import SquareGrid from '../structure/SquareGrid';
import {bfs} from '../algorithms/bfs';
import { dijskstra } from '../algorithms/dijkstra';

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
  const [keyPressed, setKeyPressed] = useState(false);
  const [algo, setAlgo] = useState(0);

  const handleKeyPress = (event) => {
    if(event.keyCode === 87) {
      setKeyPressed(keyPressed => !keyPressed);
    }
  }

  const createGrid = () => {
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
        hasWeight: false,
        inShortestPath: false,
      });
    });
    return gridSquares;
  }

  useEffect(() => {
    // window.addEventListener('keydown', handleKeyDown);
    // window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyPress);
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
        hasWeight: false,
        inShortestPath: false,
      });
    });
    setSquares(gridSquares);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [numRow, numCol]);

  const animateShortestPath = shortestPath => {
    if(shortestPath) {
      for(let i = 0; i < shortestPath.length; i++) {
        let id = shortestPath[i]
        setTimeout(() => {
          let newSquares = [...squares];
          newSquares[id].inShortestPath = true;
          setSquares(newSquares);
        }, 10*i);
      }
    }
  }

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
  }

  const visualize = () => {
    const start = grid.toId(START_COL, START_ROW);
    const target = grid.toId(FINISH_COL, FINISH_ROW);
    let result;
    switch(algo) {
      // BFS
      case 0: 
        result = bfs(grid, start, target);
        break;
      // Dijkstra
      case 1:
        result = dijskstra(grid, start, target);
        break;
      default:
        break;
    }

    const visitedSquareInOrder = result.visitedSquaresInOrder;
    const shortestPath = result.shortestPath;

    animate(visitedSquareInOrder, shortestPath);
  }
  
  const handleClick = () => {
    console.log("clicked");
    visualize();
  }

  const toggleSquare = (squares, id) => {
    let newSquares = [...squares];
    if(keyPressed) {
      newSquares[id].hasWeight = !newSquares[id].hasWeight; 
    } else {
      newSquares[id].isWall = !newSquares[id].isWall;
    }
    let newGrid = grid;
    if(newSquares[id].hasWeight) {
      newGrid.setSquareWeight(id, 15);
    }
    if(newSquares[id].isWall) {
      newGrid.walls.add(id);
    }
    setGrid(newGrid);
    return newSquares;
  }

  const clearGrid = () => {
    const gridSquares = createGrid();
    setSquares(gridSquares);
  }

  const handleMouseDown = id => {
    const newSquares = toggleSquare(squares, id);
    setSquares(newSquares);
    setMousePressed(true);
  }

  const handleMouseEnter = id => {
    if(!mousePressed) return;
    const newSquares = toggleSquare(squares, id);
    setSquares(newSquares);
  }

  const handleMouseUp = () => {
    setMousePressed(false);
  }

  const handleChange = event => {
    setAlgo(Number(event.target.value))
  }

  return (
    <>
      <select value={algo} onChange={handleChange}>
        <option value={0}>BFS</option>
        <option value={1}>Dijkstra</option>
      </select>
      <button onClick={handleClick}>Visualize</button>
      <button onClick={clearGrid}>Clear Grid</button>
      <div className={classes.grid}>
        {
          squares.map((square) => {
            const {id, row, col, isStart, isFinish, isVisited, isWall, hasWeight, inShortestPath} = square;
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
                hasWeight={hasWeight}
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