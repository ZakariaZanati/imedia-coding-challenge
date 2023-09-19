import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMON_FAILURE,
  } from "./actionTypes";
  
  export interface IPokemons {
    name: string;
    url: string;
  }

  export interface IPokemonsResult {
    results : IPokemons[];
    next : string;
    previous : string;
  }
  
  export interface PokemonsState {
    pending: boolean;
    pokemons: IPokemons[];
    next : string | null;
    error: string | null;
  }
  
  export interface FetchPokemonsSuccessPayload {
    pokemons: IPokemons[];
    next : string;
  }
  
  export interface FetchPokemonsFailurePayload {
    error: string;
  }
  
  export interface FetchPokemonsRequest {
    type: typeof FETCH_POKEMONS_REQUEST;
    nextUrl : string | null;
  }
  
  export type FetchPokemonsSuccess = {
    type: typeof FETCH_POKEMONS_SUCCESS;
    payload: FetchPokemonsSuccessPayload;
  };
  
  export type FetchPokemonsFailure = {
    type: typeof FETCH_POKEMON_FAILURE;
    payload: FetchPokemonsFailurePayload;
  };
  
  export type PokemonsActions =
    | FetchPokemonsRequest
    | FetchPokemonsSuccess
    | FetchPokemonsFailure;