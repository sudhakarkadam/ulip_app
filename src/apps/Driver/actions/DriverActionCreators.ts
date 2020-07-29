import actions from "./DriverActions";
import * as api from "../api/DriverApi";

import {
  createAsyncAction,
  GetActionTypes
} from "../../../utils/actionCreator";

export const DriverActionCreators = {
  getTrips: createAsyncAction(
    [
      actions.GET_TRIPS_REQUEST,
      actions.GET_TRIPS_SUCCESS,
      actions.GET_TRIPS_ERROR
    ],
    api.getTrips
  ),

  getTripById: createAsyncAction(
    [
      actions.GET_TRIP_BY_ID_REQUEST,
      actions.GET_TRIP_BY_ID_SUCCESS,
      actions.GET_TRIP_BY_ID_ERROR
    ],
    api.getTripById
  ),

  updateTrip: createAsyncAction(
    [
      actions.GET_UPDATE_TRIP_REQUEST,
      actions.GET_UPDATE_TRIP_SUCCESS,
      actions.GET_UPDATE_TRIP_ERROR
    ],
    api.updateTrip
  ),

  upload: createAsyncAction(
    [actions.UPLOAD_REQUEST, actions.UPLOAD_SUCCESS, actions.UPLOAD_ERROR],
    api.upload
  ),

  specialUpload: createAsyncAction(
    [
      actions.SPECIAL_UPLOAD_REQUEST,
      actions.SPECIAL_UPLOAD_SUCCESS,
      actions.SPECIAL_UPLOAD_ERROR
    ],
    api.specialUpload
  )
};

export type DriverActionObjectTypes<
  K extends keyof typeof DriverActionCreators
> = GetActionTypes<Pick<typeof DriverActionCreators, K>>;

export type DriverAllObjectTypes = GetActionTypes<typeof DriverActionCreators>;
