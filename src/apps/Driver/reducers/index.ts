import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import user from "../../Shipper/reducers/LoginReducer";

const reducers = {
  user
};

export type DriverAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<DriverAppState>(reducers);
