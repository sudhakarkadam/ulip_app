import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import { GetTripsResponse, AppConfigsResponse } from "../models/CommonModel";
import actions from "../actions/Actions";
import createReducer from "../utils/createReducer";
import user from "./UserReducer";
import HomeMetrics from "./HomeMetricsReducer";
import DriverActionTypes from "../apps/Driver/actions/DriverActions";
import { DriverTrips } from "../apps/Driver/models/DriverTrips";

import {
  CreateTripRequestModel,
  LspListResponse
} from "../models/ShipperApiModels";

const createTrip = createReducer<
  actions.CREATE_TRIP_REQUEST,
  actions.CREATE_TRIP_SUCCESS,
  actions.CREATE_TRIP_ERROR,
  CreateTripRequestModel,
  {}
>([
  actions.CREATE_TRIP_REQUEST,
  actions.CREATE_TRIP_SUCCESS,
  actions.CREATE_TRIP_ERROR
]);

const lspList = createReducer<
  actions.LSP_LIST_REQUEST,
  actions.LSP_LIST_SUCCESS,
  actions.LSP_LIST_ERROR,
  { type: "SHIPPER" | "LSP" },
  LspListResponse
>([actions.LSP_LIST_REQUEST, actions.LSP_LIST_SUCCESS, actions.LSP_LIST_ERROR]);

export const trips = createReducer<
  actions.GET_TRIPS_REQUEST,
  actions.GET_TRIPS_SUCCESS,
  actions.GET_TRIPS_ERROR,
  { status: string[] },
  { transport_service_requests: GetTripsResponse[] }
>([
  actions.GET_TRIPS_REQUEST,
  actions.GET_TRIPS_SUCCESS,
  actions.GET_TRIPS_ERROR
]);

export const appConfig = createReducer<
  actions.APP_CONFIG_REQUEST,
  actions.APP_CONFIG_SUCCESS,
  actions.APP_CONFIG_ERROR,
  {},
  AppConfigsResponse
>([
  actions.APP_CONFIG_REQUEST,
  actions.APP_CONFIG_SUCCESS,
  actions.APP_CONFIG_ERROR
]);

const driverTrips = createReducer<
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

// I could have enriched the list data but I'm not
// looking at that kind of reuse right now
// in future someone can come and remove the
// createReducer util and write an actual reducer and merge
// both calls data into one.
const driverTrip = createReducer<
  DriverActionTypes.GET_TRIP_BY_ID_REQUEST,
  DriverActionTypes.GET_TRIP_BY_ID_SUCCESS,
  DriverActionTypes.GET_TRIP_BY_ID_ERROR,
  {},
  DriverTrips[0]
>([
  DriverActionTypes.GET_TRIP_BY_ID_REQUEST,
  DriverActionTypes.GET_TRIP_BY_ID_SUCCESS,
  DriverActionTypes.GET_TRIP_BY_ID_ERROR
]);

export const reducers = {
  user,
  trips,
  HomeMetrics,
  lspList,
  createTrip,
  appConfig,
  driverTrips,
  driverTrip
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
