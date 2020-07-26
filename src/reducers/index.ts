import { combineReducers } from "redux";
import { ReducerMappedState } from "../utils/actionCreator";
import { GetTripsResponse, AppConfigsResponse } from "../models/CommonModel";
import actions from "../actions/Actions";
import createReducer from "../utils/createReducer";
import user from "./UserReducer";
import HomeMetrics from "./HomeMetricsReducer";
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

export const reducers = {
  user,
  trips,
  HomeMetrics,
  lspList,
  createTrip,
  appConfig
};

export type CommonState = ReducerMappedState<typeof reducers>;
export default combineReducers<CommonState>(reducers);
