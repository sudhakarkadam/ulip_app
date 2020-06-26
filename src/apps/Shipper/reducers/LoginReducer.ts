import actionTypes from "../actions/ShipperActions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../../../utils/actionCreator";
import { ShipperActionObjectTypes } from "../actions/ShipperActionCreators";

export interface ILoginStoreState {
  asyncStatus: asyncStatusTypes;
  data: null | { user_id: number; phone_number: string };
}

const INITIAL_STATE: ILoginStoreState = {
  asyncStatus: INIT,
  data: null
};

type TAction = ShipperActionObjectTypes<"sendOtp" | "verifyOtp" | "logout">;

export default function LoginReducer(
  state: ILoginStoreState = INITIAL_STATE,
  action: TAction
): ILoginStoreState {
  switch (action.type) {
    case actionTypes.SEND_OTP_REQUEST:
      return { ...state, asyncStatus: LOADING };

    case actionTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        asyncStatus: SUCCESS
      };

    case actionTypes.SEND_OTP_ERROR:
      return {
        ...state,
        asyncStatus: ERROR
      };

    case actionTypes.VERIFY_OTP_REQUEST:
      return {
        ...state,
        asyncStatus: LOADING
      };

    case actionTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: action.payload.res
      };

    case actionTypes.VERIFY_OTP_ERROR:
      return {
        ...state,
        asyncStatus: ERROR,
        data: null
      };

    case actionTypes.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
