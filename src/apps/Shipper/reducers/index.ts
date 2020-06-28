import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import user from "../../../reducers/UserReducer";
import { trips } from "../../../reducers/";
import actions from "../actions/ShipperActions";
import createReducer from "../../../utils/createReducer";
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

const reducers = {
  lspList,
  user,
  createTrip,
  trips
};

export type ShipperAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<ShipperAppState>(reducers);
