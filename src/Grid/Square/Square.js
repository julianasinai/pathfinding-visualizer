import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  square: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(245,245,240,1)',
  },
  start: {
    backgroundColor: 'green',
  },
  finish: {
    backgroundColor: 'red',
  }
});

function Square(props) {
  const classes = useStyles();
  const extraClass = props.isFinish 
  ? `${classes.finish}`
  : props.isStart
  ? `${classes.start}`
  : '';

  return (
    <div className={`${classes.square} ${extraClass}`}></div>
  );
}

export default Square;