import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { DriverAppState } from "./reducers";
import { DriverAllObjectTypes } from "./actions/DriverActionCreators";

const logger = require("redux-logger");

declare const __DEV__: boolean;

const middlewares = [
  thunk as ThunkMiddleware<DriverAppState, DriverAllObjectTypes>
];

if (__DEV__) {
  middlewares.push(logger.createLogger());
}

export default createStore(reducer, applyMiddleware(...middlewares));
