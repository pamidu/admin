import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // To test for Redux states
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;

// import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};

// function saveToLocalStorage(state) {
//   try {
//     const serializedState = JSON.stringify(state);
//     localStorage.setItem('state', serializedState)
//   } catch (e) {
//     return undefined;
//   }
// }

// function loadFromLocalStorage() {
//   try {
//     const serializesState = localStorage.getItem('state');
//     if (serializesState === null) return undefined;
//     return JSON.parse(serializesState);
//   } catch(e) {
//     return undefined;
//   }
// }

// const middleware = [thunk];

// const persistedState = loadFromLocalStorage();

// const store = createStore(
//   rootReducer,
//   persistedState,
//   compose(
//     applyMiddleware(...middleware)
//     // To test for Redux states
//     // window.__REDUX_DEVTOOLS_EXTENSION && window.__REDUX_DEVTOOLS_EXTENSION()
//   )
// );

// store.subscribe(() => saveToLocalStorage(store.getState()));

// export default store;
