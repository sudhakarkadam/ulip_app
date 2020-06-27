import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import user from "./LoginReducer";
import HomeMetrics from "./HomeMetricsReducer";

const reducers = {
  user,
  HomeMetrics
};

export type LSPAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<LSPAppState>(reducers);
