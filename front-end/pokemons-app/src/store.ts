import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./store/rootReducer";
import { rootSaga } from "./store/rootSaga";


// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;
