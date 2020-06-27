import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { reducers as ParentReducers } from "../../reducers";
import { reducers as AppReducers } from "./reducers";
import { AllObjectTypes } from "../../actions/ActionCreators";
import { ReducerMappedState } from "../../utils/actionCreator";

const reducers = { ...ParentReducers, ...AppReducers };
export type ReducerState = ReducerMappedState<typeof reducers>;
const reducer = combineReducers<ReducerState>(reducers);

const logger = require("redux-logger");

declare const __DEV__: boolean;

const middlewares = [thunk as ThunkMiddleware<ReducerState, AllObjectTypes>];

if (__DEV__) {
  middlewares.push(logger.createLogger());
}

export default createStore(reducer, applyMiddleware(...middlewares));
