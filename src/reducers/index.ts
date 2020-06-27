import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import { GetTripsResponse } from "../models/CommonModel";
import actions from "../actions/Actions";

const trips = createReducer<
  actions.GET_TRIPS_REQUEST,
  actions.GET_TRIPS_SUCCESS,
  actions.GET_TRIPS_ERROR,
  { status: string[] },
  GetTripsResponse[]
>([
  actions.GET_TRIPS_REQUEST,
  actions.GET_TRIPS_SUCCESS,
  actions.GET_TRIPS_ERROR
]);
import user from "../reducers/UserReducer";

const reducers = {
  user,
  trips
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
