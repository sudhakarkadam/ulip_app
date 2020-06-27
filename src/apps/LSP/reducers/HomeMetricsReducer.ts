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

export interface HomeMetricsStoreState {
  asyncStatus: asyncStatusTypes;
  data: HomeMetricsModel;
}

const initialMetrics = {
  transport_service_request: {
    created: 0,
    in_progress: 0,
    pending_pod: 0
  },
  trucks: {
    type1: 0,
    type2: 0
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
