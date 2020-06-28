import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import { GetTripsResponse } from "../models/CommonModel";
import actions from "../actions/Actions";
import createReducer from "../utils/createReducer";
import user from "../reducers/UserReducer";
import HomeMetrics from "../reducers/HomeMetricsReducer";

export const trips = createReducer<
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

export const reducers = {
  user,
  trips,
  HomeMetrics
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
