import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPending = (state: AppState) => state.pokemons.pending;

const getPokemons = (state: AppState) => state.pokemons;

const getError = (state: AppState) => state.pokemons.error;

export const getPokemonsSelector = createSelector(getPokemons, (pokemons) => pokemons);

export const getPendingSelector = createSelector(
  getPending,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);