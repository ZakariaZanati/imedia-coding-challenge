import {
    FETCH_POKEMONS_REQUEST,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMON_FAILURE,
  } from "./actionTypes";
  import {
    FetchPokemonsRequest,
    FetchPokemonsSuccess,
    FetchPokemonsSuccessPayload,
    FetchPokemonsFailure,
    FetchPokemonsFailurePayload,
  } from "./types";
  
  export const fetchPokemonsRequest = (nextUrl : string | null): FetchPokemonsRequest => ({
    type: FETCH_POKEMONS_REQUEST, nextUrl });
  
  export const fetchPokemonsSuccess = (
    payload: FetchPokemonsSuccessPayload
  ): FetchPokemonsSuccess => ({
    type: FETCH_POKEMONS_SUCCESS,
    payload,
  });
  
  export const fetchPokemonsFailure = (
    payload: FetchPokemonsFailurePayload
  ): FetchPokemonsFailure => ({
    type: FETCH_POKEMON_FAILURE,
    payload,
  });