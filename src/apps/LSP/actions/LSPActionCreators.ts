import actions from "./LSPActions";
import api from "../api/LSPApi";

import {
  createAsyncAction,
  GetActionTypes
} from "../../../utils/actionCreator";

const LSPActionCreators = {
  getMetrics: createAsyncAction(
    [
      actions.HOME_METRICS_REQUEST,
      actions.HOME_METRICS_SUCCESS,
      actions.HOME_METRICS_ERROR
    ],
    api.getMetrics
  ),
  acceptTrip: createAsyncAction(
    [
      actions.TRIP_ACCEPT_REQUEST,
      actions.TRIP_ACCEPT_SUCCESS,
      actions.TRIP_ACCEPT_ERROR
    ],
    api.acceptTrip
  ),
  rejectTrip: createAsyncAction(
    [
      actions.TRIP_REJECT_REQUEST,
      actions.TRIP_REJECT_SUCCESS,
      actions.TRIP_REJECT_ERROR
    ],
    api.rejectTrip
  )
};

export default LSPActionCreators;

export type LSPActionObjectTypes<
  K extends keyof typeof LSPActionCreators
> = GetActionTypes<Pick<typeof LSPActionCreators, K>>;

export type LSPAllObjectTypes = GetActionTypes<typeof LSPActionCreators>;
