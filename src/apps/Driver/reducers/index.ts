import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import common from "../../../reducers/index";
const reducers = {
  common
};

export type DriverAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<DriverAppState>(reducers);
