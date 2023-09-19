import axios, { AxiosResponse } from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";

import { fetchPokemonsFailure, fetchPokemonsSuccess } from "./actions";
import { FETCH_POKEMONS_REQUEST } from "./actionTypes";
import { FetchPokemonsRequest, IPokemons, IPokemonsResult } from "./types";
import {getPokemons} from '../../api/pokemonApi';

/*
const getPokemons = () =>
  axios.get<IPokemons[]>("https://jsonplaceholder.typicode.com/todos");

  /*
const getPokemons = (limit: number, offset: number) => {
    getPokemons(limit, offset);
}

  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
function* fetchPokemonsSaga(action : FetchPokemonsRequest) {
  try {

    const response: AxiosResponse<IPokemonsResult> = yield call(getPokemons, action.nextUrl);
    console.log(response.data);
    yield put(
      fetchPokemonsSuccess({
        pokemons: response.data.results,
        next : response.data.next
      })
    );
  } catch (e) {
    yield put(
      fetchPokemonsFailure({
        error: e as string,
      })
    );
  }
}

/*
  Starts worker saga on latest dispatched `FETCH_TODO_REQUEST` action.
  Allows concurrent increments.
*/
function* pokemonsSaga() {
  yield all([takeLatest(FETCH_POKEMONS_REQUEST, fetchPokemonsSaga)]);
}

export default pokemonsSaga;