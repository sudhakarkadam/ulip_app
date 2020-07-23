import actionTypes from "../actions/Actions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../utils/actionCreator";
import { UserDataModel } from "../models/CommonModel";
import { ActionObjectTypes } from "../actions/ActionCreators";

export interface ILoginStoreState {
  asyncStatus: asyncStatusTypes;
  data: UserDataModel | null;
}

const INITIAL_STATE: ILoginStoreState = {
  asyncStatus: INIT,
  data: null
};

type TAction = ActionObjectTypes<
  | "sendOtp"
  | "verifyOtp"
  | "saveCompanyProfile"
  | "savePersonalProfile"
  | "setUserPersona"
  | "setUserLanguage"
>;

export default function UserReducer(
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
      const profileData = Object.assign({}, state.data);
      profileData.user_details.name = action.payload.res.name;
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: profileData
      };
    }

    case actionTypes.SAVE_COMPANY_PROFILE_SUCCESS: {
      const companyData = Object.assign({}, state.data);
      companyData.business_details = action.payload.res;
      return {
        ...state,
        asyncStatus: SUCCESS,
        data: companyData
      };
    }

    case actionTypes.SET_USER_PERSONA: {
      const userData = Object.assign({}, state.data);
      userData.userPersona = action.payload.req.user;
      return {
        ...state,
        data: userData
      };
    }

    case actionTypes.SET_USER_LANGUAGE: {
      const userData = Object.assign({}, state.data, {
        language: action.payload.req.language
      });
      return {
        ...state,
        data: userData
      };
    }

    default:
      return state;
  }
}
