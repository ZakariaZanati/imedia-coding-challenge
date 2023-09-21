import {
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { getErrorSelector, getPendingSelector, getPokemonsSelector } from './store/pokemon/selectors';
import PokemonList from './components/PokemonList';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
}

function App() {

  const isLoading = useSelector(getPendingSelector);
  const error = useSelector(getErrorSelector);

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom style={{padding : 20, borderBottom : "10px solid darkblue", color:"darkblue", fontWeight : "bold", backgroundColor : 'lightblue'}}>
        Pokémon List
      </Typography>
      {isLoading && (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    )}
      {error && (
      <Grid container justifyContent="center">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Grid>
    )}
     <PokemonList />
    </>
  );
}

export default App;
