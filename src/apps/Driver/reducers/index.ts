import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import common from "../../../reducers/index";
import createReducer from "../../../utils/createReducer";
import DriverActionTypes from "../actions/DriverActions";
import { DriverTrips } from "../models/DriverTrips";

const trips = createReducer<
  DriverActionTypes.GET_TRIPS_REQUEST,
  DriverActionTypes.GET_TRIPS_SUCCESS,
  DriverActionTypes.GET_TRIPS_ERROR,
  {},
  DriverTrips
>([
  DriverActionTypes.GET_TRIPS_REQUEST,
  DriverActionTypes.GET_TRIPS_SUCCESS,
  DriverActionTypes.GET_TRIPS_ERROR
]);

const reducers = {
  common,
  trips
};

export type DriverAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<DriverAppState>(reducers);
