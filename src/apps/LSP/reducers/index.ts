import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import HomeMetrics from "./HomeMetricsReducer";

export const reducers = {
  HomeMetrics
};

export type LSPAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<LSPAppState>(reducers);
