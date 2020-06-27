import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import user from "../reducers/UserReducer";

const reducers = {
  user
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
