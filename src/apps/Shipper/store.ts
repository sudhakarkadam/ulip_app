import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { ShipperAppState } from "./reducers";
import { ShipperAllObjectTypes } from "./actions/ShipperActionCreators";

const logger = require("redux-logger");

declare const __DEV__: boolean;

const middlewares = [
  thunk as ThunkMiddleware<ShipperAppState, ShipperAllObjectTypes>
];

if (__DEV__) {
  middlewares.push(logger.createLogger());
}

export default createStore(reducer, applyMiddleware(...middlewares));
