import Grid from './Grid/Grid';

function App() {
  return (
    <Grid 
      NUM_ROW={25}
      NUM_COL={Math.floor(window.innerWidth/27)}
    />
  );
}

export default App;