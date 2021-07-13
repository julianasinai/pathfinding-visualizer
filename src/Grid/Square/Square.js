import React from 'react';
import { makeStyles } from '@material-ui/styles';
//frontier rgba(137, 137, 134, 1);

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
});

function Square(props) {
  const classes = useStyles();
  const extraClass = props.isFinish 
  ? `${classes.finish}`
  : props.isStart
  ? `${classes.start}`
  : props.isVisited
  ? `${classes.visited}`
  : '';

  return (
    <div className={`${classes.square} ${extraClass}`}></div>
  );
}

export default Square;