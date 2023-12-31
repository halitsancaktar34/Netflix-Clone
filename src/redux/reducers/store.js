import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import movieReducer from "./movieReducer";

export default createStore(movieReducer, applyMiddleware(thunk));