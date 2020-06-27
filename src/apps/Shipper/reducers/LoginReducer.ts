import actionTypes from "../actions/ShipperActions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../../../utils/actionCreator";
import { ShipperActionObjectTypes } from "../actions/ShipperActionCreators";

export type UserDataModel = null | {
  user_id: number;
  phone_number: string;
  personalProfile?: { name: string };
  companyProfile?: { name: string; regNumber: string; location: string };
};

export interface ILoginStoreState {
  asyncStatus: asyncStatusTypes;
  data: UserDataModel;
}

const INITIAL_STATE: ILoginStoreState = {
  asyncStatus: INIT,
  data: null
};

type TAction = ShipperActionObjectTypes<
  | "sendOtp"
  | "verifyOtp"
  | "logout"
  | "saveCompanyProfile"
  | "savePersonalProfile"
>;

export default function LoginReducer(
  state: ILoginStoreState = INITIAL_STATE,
  action: TAction
): ILoginStoreState {
  switch (action.type) {
    case actionTypes.SEND_OTP_REQUEST:
    case actionTypes.VERIFY_OTP_REQUEST:
    case actionTypes.SAVE_PROFILE_REQUEST:
    case actionTypes.SAVE_COMPANY_PROFILE_REQUEST:
      return { ...state, asyncStatus: LOADING };

    case actionTypes.SEND_OTP_SUCCESS:
      return {
        ...state,
        asyncStatus: SUCCESS
      };

    case actionTypes.SEND_OTP_ERROR:
    case actionTypes.VERIFY_OTP_ERROR:
    case actionTypes.SAVE_COMPANY_PROFILE_ERROR:
    case actionTypes.SAVE_PROFILE_ERROR:
      return {
        ...state,
        asyncStatus: ERROR
      };

    case actionTypes.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: action.payload.res
      };

    case actionTypes.SAVE_PROFILE_SUCCESS: {
      const oldData = state.data;
      if (oldData && oldData.personalProfile) {
        oldData.personalProfile = {
          name: action.payload.res.name
        };
      }
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: oldData
      };
    }

    case actionTypes.SAVE_COMPANY_PROFILE_SUCCESS: {
      const newData = state.data;
      if (newData && newData.companyProfile) {
        newData.companyProfile = action.payload.res;
      }
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: newData
      };
    }

    case actionTypes.LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
