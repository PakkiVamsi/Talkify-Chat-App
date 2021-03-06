import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import Reducer from "../reducers/index";

const store = createStore(Reducer, applyMiddleware(thunk));
export default store;
