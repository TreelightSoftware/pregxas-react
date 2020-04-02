import { compose, createStore } from "redux";
import persistState from "redux-localstorage";
import reducers from "./reducers";

let enhancer = compose(
  persistState(null, {key: "pregxas"}),
);
if((window as any).__REDUX_DEVTOOLS_EXTENSION__){
  enhancer = compose(
    persistState(null, {key: "pregxas"}),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
}

const store = createStore(reducers, enhancer);

export default store;