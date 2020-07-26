import actionTypes from "../actions/Actions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../utils/actionCreator";
import { ActionObjectTypes } from "../actions/ActionCreators";
import { Metrics } from "../models/CommonModel";
import { RequestStatus } from "../models/CommonModel";

export interface HomeMetricsStoreState {
  asyncStatus: asyncStatusTypes;
  data: Metrics;
}

const initialMetrics = {
  status_count_details: {
    [RequestStatus.ACCEPTED]: 0,
    [RequestStatus.COMPLETED]: 0,
    [RequestStatus.CREATED]: 0,
    [RequestStatus.IN_PROGRESS]: 0,
    [RequestStatus.PENDING_POD]: 0,
    [RequestStatus.REJECTED]: 0
  }
};

const INITIAL_STATE: HomeMetricsStoreState = {
  asyncStatus: INIT,
  data: initialMetrics
};

type TAction = ActionObjectTypes<"getMetrics">;

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
