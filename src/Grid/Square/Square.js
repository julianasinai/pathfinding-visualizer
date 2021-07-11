import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  square: {
    width: '40px',
    height: '40px',
    outline: '1px solid grey',
    backgroundColor: 'rgba(245,245,240,1)',
    display: 'inline-block',
  },
});

function Square() {
  const classes = useStyles();

  return (
    <div className={classes.square}></div>
  );
}

export default Square;