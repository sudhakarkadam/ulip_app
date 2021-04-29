import actionTypes from "../actions/Actions";
import {
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  asyncStatusTypes
} from "../utils/actionCreator";
import { UserDataModel } from "../models/CommonModel";
import produce from "immer";
import { ActionObjectTypes } from "../actions/ActionCreators";

export interface ILoginStoreState {
  asyncStatus: asyncStatusTypes;
  data: UserDataModel;
}

const INITIAL_STATE: ILoginStoreState = {
  asyncStatus: INIT,
  data: {} as UserDataModel
};

type TAction = ActionObjectTypes<
  | "sendOtp"
  | "verifyOtp"
  | "saveCompanyProfile"
  | "savePersonalProfile"
  | "setUserPersona"
  | "setUserLanguage"
>;

const UserReducer = produce(
  (draft: ILoginStoreState, action: TAction): ILoginStoreState => {
    switch (action.type) {
      case actionTypes.SEND_OTP_REQUEST:
      case actionTypes.VERIFY_OTP_REQUEST:
      case actionTypes.SAVE_PROFILE_REQUEST:
      case actionTypes.SAVE_COMPANY_PROFILE_REQUEST:
        draft.asyncStatus = LOADING;
        return draft;

      case actionTypes.SEND_OTP_SUCCESS:
        draft.data.verification_id = action.payload.res.verification_id;
        draft.data.phone_number = action.payload.res.phone_number;
        draft.asyncStatus = SUCCESS;
        return draft;

      case actionTypes.SEND_OTP_ERROR:
      case actionTypes.VERIFY_OTP_ERROR:
      case actionTypes.SAVE_COMPANY_PROFILE_ERROR:
      case actionTypes.SAVE_PROFILE_ERROR:
        draft.asyncStatus = ERROR;
        return draft;

      case actionTypes.VERIFY_OTP_SUCCESS:
        draft.asyncStatus = SUCCESS;
        draft.data = { ...draft.data, ...action.payload.res };
        return draft;

      case actionTypes.SAVE_PROFILE_SUCCESS: {
        draft.asyncStatus = SUCCESS;
        draft.data.user_details = [
          ...draft.data.user_details,
          {
            profile: action.payload.res
          }
        ];
        return draft;
      }

      case actionTypes.SAVE_COMPANY_PROFILE_SUCCESS: {
        draft.asyncStatus = SUCCESS;
        const {
          business_id,
          business_type,
          business_name
        } = action.payload.res;
        draft.data.user_details = draft.data.user_details.map(role => {
          if (role.profile.persona === action.payload.res.business_type) {
            return {
              ...role,
              business_details: {
                business_id,
                legal_name: business_name,
                type: business_type
              }
            };
          }
          return role;
        });
        return draft;
      }

      case actionTypes.SET_USER_PERSONA:
        draft.data.userPersona = action.payload.req.user;
        return draft;

      case actionTypes.SET_USER_LANGUAGE:
        draft.data.language = action.payload.req.language;
        return draft;

      default:
        return draft;
    }
  },
  INITIAL_STATE
);

export default UserReducer;
