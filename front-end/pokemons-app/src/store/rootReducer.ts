import { combineReducers } from "redux";

import pokemonsReducer from "./pokemon/reducer";

const rootReducer = combineReducers({
  pokemons: pokemonsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;