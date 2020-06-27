import actionTypes from "../actions/Actions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../utils/actionCreator";
import { ActionObjectTypes } from "../actions/ActionCreators";

export interface ILoginStoreState {
  asyncStatus: asyncStatusTypes;
  data: any;
  userInfo: any;
  sessionId: string;
}

const INITIAL_STATE: ILoginStoreState = {
  asyncStatus: INIT,
  data: {} as any,
  userInfo: {} as any,
  sessionId: ""
};

type TAction = ActionObjectTypes<"login" | "logout" | "getTrips">;

export default function LoginReducer(
  state: ILoginStoreState = INITIAL_STATE,
  action: TAction
): ILoginStoreState {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return { ...state, asyncStatus: LOADING };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: action.payload.res,
        userInfo: {}
      };

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        asyncStatus: ERROR
      };

    case actionTypes.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
