import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import HomeMetrics from "./HomeMetricsReducer";
import createReducer from "../../../utils/createReducer";
import actions from "../actions/LSPActions";
import { TripAcceptRequest, TripRejectRequest } from "../models/TripAcceptance";

const acceptedTripStatus = createReducer<
  actions.TRIP_ACCEPT_REQUEST,
  actions.TRIP_ACCEPT_SUCCESS,
  actions.TRIP_ACCEPT_ERROR,
  TripAcceptRequest,
  {}
>([
  actions.TRIP_ACCEPT_REQUEST,
  actions.TRIP_ACCEPT_SUCCESS,
  actions.TRIP_ACCEPT_ERROR
]);

const rejectedTripStatus = createReducer<
  actions.TRIP_REJECT_REQUEST,
  actions.TRIP_REJECT_SUCCESS,
  actions.TRIP_REJECT_ERROR,
  TripRejectRequest,
  {}
>([
  actions.TRIP_REJECT_REQUEST,
  actions.TRIP_REJECT_SUCCESS,
  actions.TRIP_REJECT_ERROR
]);

export const reducers = {
  HomeMetrics,
  acceptedTripStatus,
  rejectedTripStatus
};

export type LSPAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<LSPAppState>(reducers);
