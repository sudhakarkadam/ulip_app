import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import user from "./LoginReducer";

const reducers = {
  user
};

export type ShipperAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<ShipperAppState>(reducers);