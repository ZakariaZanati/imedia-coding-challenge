import { Card, CardMedia, Grid, Paper, Typography } from "@material-ui/core";
import { PokemonDialog } from "./PokemonDialog";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonsRequest } from "../store/pokemon/actions";
import { getPendingSelector, getPokemonsSelector } from "../store/pokemon/selectors";
import axios from "axios";

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

function PokemonList() {

    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [nextUrl, setNextUrl] = useState<string | null>('https://pokeapi.co/api/v2/pokemon?limit=20');
  
    const dispatch = useDispatch();
    const isLoading = useSelector(getPendingSelector);
    const pokemonsResult = useSelector(getPokemonsSelector);
  
  
    useEffect(() => {
      dispatch(fetchPokemonsRequest(nextUrl));
    }, []);
  
    useEffect(() => {
      console.log(pokemonsResult)
      setNextUrl(pokemonsResult.next)
    },[pokemonsResult])

    const handleCardClick = async (pokemon: Pokemon) => {
        setSelectedPokemon(pokemon);
        setDialogOpen(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.url.split('/').slice(-2)[0]}`);
        setPokemonDetails(response.data);
      };
    
      const handleCloseDialog = () => {
        setSelectedPokemon(null);
        setPokemonDetails(null);
        setDialogOpen(false);
      };
    
      const handleScroll = (event: React.UIEvent<HTMLElement>) => {
        const element = event.currentTarget;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
          if (nextUrl) {
            dispatch(fetchPokemonsRequest(nextUrl));
          }
        }
      };

    return (
        <>
        

        <Grid container spacing={2} onScroll={handleScroll} style={{padding : 20, height: '100vh', overflow: 'auto', backgroundColor : '#E0E0E0'}}>
        {pokemonsResult.pokemons.map(pokemon => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name} >
            <Card onClick={() => handleCardClick(pokemon)} style={{border : "2px solid darkblue"}} >
              <div style={{ display: 'flex', justifyContent: 'center' }} >
                <CardMedia
                  component="img"
                  image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/').slice(-2)[0]}.png`}
                  title={pokemon.name}
                  style={{ width: 200, height: 200 }}
                />
              </div>
              <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h3" align='center' style={{color : 'darkblue'}}  > {pokemon.name}</Typography>
              </Paper>
            </Card>
          </Grid>
        ))}
        {isLoading && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Typography variant="h6">Loading more Pokemons...</Typography>
          </Grid>
        )}
      </Grid>
      <PokemonDialog pokemonDetails={pokemonDetails} dialogOpen={dialogOpen} handleCloseDialog={handleCloseDialog} />
      
        
        </>
    )
}

export default PokemonList;
