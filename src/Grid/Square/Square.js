import React from 'react';
import { makeStyles } from '@material-ui/styles';
//reached rgb(197 197 190);
//frontier rgb(137 137 134);

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