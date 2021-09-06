import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Square from './Square/Square';
import SquareGrid from '../structure/SquareGrid';
import { bfs } from '../algorithms/bfs';
import { dijskstra } from '../algorithms/dijkstra';
import { greedBestFirstSearch } from '../algorithms/greedBestFirstSearch';
import { astar } from '../algorithms/astar';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/styles';

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
  const [algo, setAlgo] = useState(1);
  const [open, setOpen] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const [isStart, setIsStart] =useState(false);
  const [start, setStart] = useState(Math.min(props.NUM_COL-1, Math.max(0, START_COL))+ Math.min(props.NUM_ROW-1, Math.max(0, START_ROW))*props.NUM_COL);
  const [target, setTarget] = useState(Math.min(props.NUM_COL-1, Math.max(0, FINISH_COL))+ Math.min(props.NUM_ROW-1, Math.max(0, FINISH_ROW))*props.NUM_COL);

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
    const handleKeyPress = event => {
      if(algo === 0) {
        handleOpen();
        return;
      }
      if(event.keyCode === 87) {
        setKeyPressed(keyPressed => !keyPressed);
      }
    }
    window.addEventListener('keydown', handleKeyPress);
    if(algo === 0) {
      handleOpen();
      setKeyPressed(false)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [algo]);

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
        hasWeight: false,
        inShortestPath: false,
      });
    });
    setSquares(gridSquares);
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
      //Greed Best-First Search
      case 2:
        result = greedBestFirstSearch(grid, start, target);
        break;
      //A* Search
      case 3:
        result = astar(grid, start, target);
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

  const handleWeight = () => {
    setKeyPressed(keyPressed => !keyPressed)
  }

  const toggleSquare = (squares, id) => {
    let newSquares = [...squares];
    let newGrid = grid;

    if(newSquares[id].isStart || newSquares[id].isFinish) return newSquares;

    if(keyPressed) {
      if(!newSquares[id].hasWeight) {
        newGrid.setSquareWeight(id, 15);
      } else{
        newGrid.setSquareWeight(id, 1);
      }
      newSquares[id].hasWeight = !newSquares[id].hasWeight; 
    } else {
      if(!newSquares[id].isWall) {
        newGrid.addWall(id);
      } else {
        newGrid.removeWall(id);
      }
      newSquares[id].isWall = !newSquares[id].isWall;
    }

    setGrid(newGrid);
    return newSquares;
  }

  const clearGrid = () => {
    const gridSquares = createGrid();
    setStart(Math.min(props.NUM_COL-1, Math.max(0, START_COL))+ Math.min(props.NUM_ROW-1, Math.max(0, START_ROW))*props.NUM_COL);
    setTarget(Math.min(props.NUM_COL-1, Math.max(0, FINISH_COL))+ Math.min(props.NUM_ROW-1, Math.max(0, FINISH_ROW))*props.NUM_COL);
    setSquares(gridSquares);
  }

  const handleMouseDown = id => {
    if(squares[id].isStart || squares[id].isFinish) {
      if(squares[id].isStart) {
        setIsStart(true);
      } else {
        setIsStart(false);
      }
      setDragging(true);
    } else {
      const newSquares = toggleSquare(squares, id);
      setSquares(newSquares);
      setMousePressed(true);
    }
  }

  const handleMouseEnter = id => {
    if(isDragging) {
      let newSquares = [...squares];

      if(isStart) {
        newSquares[id].isStart = true;
      } else {
        newSquares[id].isFinish = true;
      }        

      setSquares(newSquares);
    } else {
      if(!mousePressed) return;
      const newSquares = toggleSquare(squares, id);

      setSquares(newSquares);
    }

  }

  const handleMouseLeave = id => {
    if(isDragging) {
      let newSquares = [...squares];

      if(isStart) {
        newSquares[id].isStart = false;
      } else {
        newSquares[id].isFinish = false;
      }

      setSquares(newSquares);
    }
  }

  const handleMouseUp = id => {
    if(squares[id].isStart || squares[id].isFinish) {
      if(squares[id].isStart) {
        setStart(Number(id));
      } else {
        setTarget(Number(id))
      }
    }
    setDragging(false);
    setMousePressed(false);
  }

  const handleChange = event => {
    setAlgo(Number(event.target.value));
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = (event, reason) => {
    setOpen(false);
  }

  return (
    <>
      <Navbar 
      selectedAlgo={algo}
      keyPressed={keyPressed}
      onChange={event => handleChange(event)}
      handleClick={() => handleClick()}
      handleWeight={() => handleWeight()}
      clearGrid={() => clearGrid()}
      />
      <div className={classes.grid}>
        {
          squares.map(square => {
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
                onMouseDown={id => handleMouseDown(id)}
                onMouseEnter={id => handleMouseEnter(id)}
                onMouseLeave={id => handleMouseLeave(id)}
                onMouseUp={id => handleMouseUp(id)}
              />
            );
          })
        }
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert onClose={handleClose} severity="warning">
          Breath-First Search is unweighted
        </Alert>
      </Snackbar>
    </>
  );
}

export default Grid;