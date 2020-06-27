import actions from "./Actions";
import api from "../api/Api";

import { createAsyncAction, GetActionTypes } from "../utils/actionCreator";

const ActionCreators = {
  sendOtp: createAsyncAction(
    [
      actions.SEND_OTP_REQUEST,
      actions.SEND_OTP_SUCCESS,
      actions.SEND_OTP_ERROR
    ],
    api.sendOtp
  ),
  verifyOtp: createAsyncAction(
    [
      actions.VERIFY_OTP_REQUEST,
      actions.VERIFY_OTP_SUCCESS,
      actions.VERIFY_OTP_ERROR
    ],
    api.verifyOtp
  ),
  savePersonalProfile: createAsyncAction(
    [
      actions.SAVE_PROFILE_REQUEST,
      actions.SAVE_PROFILE_SUCCESS,
      actions.SAVE_PROFILE_ERROR
    ],
    api.savePersonalProfile
  ),
  saveCompanyProfile: createAsyncAction(
    [
      actions.SAVE_COMPANY_PROFILE_REQUEST,
      actions.SAVE_COMPANY_PROFILE_SUCCESS,
      actions.SAVE_COMPANY_PROFILE_ERROR
    ],
    api.saveCompanyProfile
  )
};

export default ActionCreators;

export type ActionObjectTypes<
  K extends keyof typeof ActionCreators
> = GetActionTypes<Pick<typeof ActionCreators, K>>;

export type AllObjectTypes = GetActionTypes<typeof ActionCreators>;
