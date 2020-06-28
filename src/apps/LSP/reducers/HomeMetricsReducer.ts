import actionTypes from "../actions/LSPActions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../../../utils/actionCreator";
import { LSPActionObjectTypes } from "../actions/LSPActionCreators";
import HomeMetricsModel from "../models/HomeMetricsModel";
import { RequestStatus, TruckType } from "../../../models/CommonModel";

export interface HomeMetricsStoreState {
  asyncStatus: asyncStatusTypes;
  data: HomeMetricsModel;
}

const initialMetrics = {
  transport_service_request: {
    [RequestStatus.ACCEPTED]: 0,
    [RequestStatus.COMPLETED]: 0,
    [RequestStatus.CREATED]: 0,
    [RequestStatus.IN_PROGRESS]: 0,
    [RequestStatus.PENDING_POD]: 0,
    [RequestStatus.REJECTED]: 0
  },
  trucks: {
    [TruckType.CONTAINER]: 0,
    [TruckType.OPEN]: 0,
    [TruckType.TRAILOR]: 0
  },
  drivers: 0
};

const INITIAL_STATE: HomeMetricsStoreState = {
  asyncStatus: INIT,
  data: initialMetrics
};

type TAction = LSPActionObjectTypes<"getMetrics">;

export default function HomeMetricsReducer(
  state: HomeMetricsStoreState = INITIAL_STATE,
  action: TAction
): HomeMetricsStoreState {
  switch (action.type) {
    case actionTypes.HOME_METRICS_REQUEST:
      return { ...state, asyncStatus: LOADING };

    case actionTypes.HOME_METRICS_SUCCESS:
      return {
        ...state,
        data: action.payload.res,
        asyncStatus: SUCCESS
      };

    case actionTypes.HOME_METRICS_ERROR:
      return {
        ...state,
        asyncStatus: ERROR
      };

    default:
      return state;
  }
}
