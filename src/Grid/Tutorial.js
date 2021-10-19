import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  dialogPaper: {
    height: '300px',
  }
}));

const tutorialSteps = [
  {
    title: "Pathfinding Visualizer Tutorial",
    text: <React.Fragment>{`Hi there 👋! Here is a step-by-step guide to the features of this application. If you like to skip this tutorial, you can check it later by clicking `}<HelpOutlineIcon style={{marginBottom: "-5px"}}/>{`.`}</React.Fragment>
  },
  {
    title: 'What is a pathfinding algorithm?',
    text: `It is an algorithm that deals with the problem of finding a path, not necessarily the optimal one, between two points, start and target nodes. In this application, the graph is represented by a grid, where you can move from one tile to another by making orthogonal movements, each with the cost of 1.`,
  },
  { 
    title: 'Selecting an algorithm',
    text: "The algorithms available are listed in the dropdown menu. Some algorithms perform on weighted graphs, while others on unweighted ones. In addition, not all of them return the shortest path.",
  },
  { 
    title: 'Avaliable algoritms',
    text: "Breadth-First Search(unweighted) Dijkstra(weighted) Greed Best-First(weighted) Search A* Search(weighted)",
  },
  {
    title: 'Adding walls and Weights',
    text: "You can not pass through walls. However, weights are passable, but moving through them costs 15 times more.",
  },
  { 
    title: 'Dragging nodes',
    text: "You can change the start and target nodes' positions by clicking and dragging them over the grid.", 
  },
  { 
    title: 'Visualize!',
    text: "After the grid is set as you want, click Visualize to see the selected algorithm in action. Finally, you can also clear the grid and start over.",
  },
];

const Tutorial = ({ tutorialRef }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  useEffect(() => {
    tutorialRef.current = handleClickOpen
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        classes={{paper: classes.dialogPaper}}
      >
        <DialogTitle id="alert-dialog-title">
          {tutorialSteps[activeStep].title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {tutorialSteps[activeStep].text}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button onClick={handleClose} color="primary" variant="contained">
            Skip
          </Button>
          <ButtonGroup color="primary" variant="contained">
            <Button onClick={handlePrevious} disabled={activeStep === 0}>Previous</Button>
            <Button onClick={handleNext} disabled={activeStep === maxSteps - 1}>Next</Button>
          </ButtonGroup>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tutorial;