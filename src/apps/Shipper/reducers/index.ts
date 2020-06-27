import { combineReducers } from "redux";
import { ReducerMappedState } from "../../../utils/actionCreator";
import user from "../../../reducers/UserReducer";
import { trips } from "../../../reducers/";
import actions from "../actions/ShipperActions";
import createReducer from "../../../utils/createReducer";
import { CreateTripRequestModel } from "../models/ShipperApiModels";

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

const reducers = {
  user,
  createTrip,
  trips
};

export type ShipperAppState = ReducerMappedState<typeof reducers>;
export default combineReducers<ShipperAppState>(reducers);
