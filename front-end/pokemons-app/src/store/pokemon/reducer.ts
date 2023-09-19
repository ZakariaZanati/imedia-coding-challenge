import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMON_FAILURE,
  } from "./actionTypes";
  
  import { PokemonsActions, PokemonsState } from "./types";
  
  const initialState: PokemonsState = {
    pending: false,
    pokemons: [],
    next : null,
    error: null,
  };
  
  export default (state = initialState, action: PokemonsActions) => {
    switch (action.type) {
      case FETCH_POKEMONS_REQUEST:
        return {
          ...state,
          pending: true,
        };
      case FETCH_POKEMONS_SUCCESS:
        return {
          ...state,
          pending: false,
          pokemons: [...state.pokemons,...action.payload.pokemons],
          next : action.payload.next,
          error: null,
        };
      case FETCH_POKEMON_FAILURE:
        return {
          ...state,
          pending: false,
          pokemons: [],
          error: action.payload.error,
        };
      default:
        return {
          ...state,
        };
    }
  };