import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer, { CommonState } from "../../reducers";
import { AllObjectTypes } from "../../actions/ActionCreators";

const logger = require("redux-logger");

declare const __DEV__: boolean;

const middlewares = [thunk as ThunkMiddleware<CommonState, AllObjectTypes>];

if (__DEV__) {
  middlewares.push(logger.createLogger());
}

export default createStore(reducer, applyMiddleware(...middlewares));
