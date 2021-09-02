import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  square: {
    width: '25px',
    height: '25px',
    backgroundColor: 'rgba(245,245,240,1)',
  },
  start: {
    backgroundColor: 'green',
  },
  finish: {
    backgroundColor: 'red',
  },
  visited: {
    backgroundColor: 'rgba(197, 197, 190, 1)',
  },
  wall: {
    backgroundColor: 'rgba(137, 137, 134, 1)',
  },
  weight: {
    background: 'repeating-linear-gradient(45deg,#606dbc,#606dbc 10px,#465298 10px,#465298 20px)',
  },
  shortestPath : {
    backgroundColor: 'rgba(204, 208, 17, 1)',
  },
});

function Square(props) {
  const classes = useStyles();
  const extraClass = props.isFinish 
  ? `${classes.finish}`
  : props.isStart
  ? `${classes.start}`
  : props.isWall
  ?`${classes.wall}`
  : props.hasWeight
  ?`${classes.weight}`
  : props.inShortestPath
  ? `${classes.shortestPath}`
  : props.isVisited
  ? `${classes.visited}`
  : '';

  return (
    <div 
      className={`${classes.square} ${extraClass}`}
      onMouseDown={() => props.onMouseDown(props.id)}
      onMouseEnter={() => props.onMouseEnter(props.id)}
      onMouseLeave={() => props.onMouseLeave(props.id)}
      onMouseUp={() => props.onMouseUp(props.id)}
      // onDragEnter={() => props.onDragEnter(props.id)}
      // onDragLeave={() => props.onDragLeave(props.id)}
    ></div>
  );
}

export default Square;