import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    justifySelf: "start"
  },
  formControl: {
    minWidth: 120,
  },
  menu: {
    display: "flex",
    minWidth: 500,
    justifyContent: "space-between",
  },
}));

export default function Navbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="default" wposition="static">
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Pathfinding Visualizer
          </Typography>
          <div className={classes.menu}>
            <FormControl className={classes.formControl}>
              <InputLabel>Algorithms</InputLabel>
              <Select
                value={props.selectedAlgo}
                onChange={(event) => props.onChange(event)}
              >
                <MenuItem value={0}>BFS</MenuItem>
                <MenuItem value={1}>Dijikstra</MenuItem>
              </Select>
            </FormControl>
            <Button
              disabled={props.selectedAlgo === 0 ? true : false}
              onClick={() => props.handleClick()} 
              variant={props.keyPressed? "contained" : "outlined"}
              color="primary"
            >
              Add Weight
            </Button>
            <Button
              onClick={() => props.handleClick()} 
              variant="contained" 
              color="primary"
            >
              Visualize
            </Button>
            <Button
              onClick={() => props.clearGrid()} 
              variant="contained" 
              color="secondary"
            >
              Clear Grid
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
