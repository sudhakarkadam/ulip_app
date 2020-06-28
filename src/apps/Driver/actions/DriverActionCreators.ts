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
  )
};

export type DriverActionObjectTypes<
  K extends keyof typeof DriverActionCreators
> = GetActionTypes<Pick<typeof DriverActionCreators, K>>;

export type DriverAllObjectTypes = GetActionTypes<typeof DriverActionCreators>;
