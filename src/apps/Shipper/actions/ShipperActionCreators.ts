import actions from "./ShipperActions";
import api from "../api/ShipperApi";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../../../utils/actionCreator";

const ShipperActionCreators = {
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
  ),
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default ShipperActionCreators;

export type ShipperActionObjectTypes<
  K extends keyof typeof ShipperActionCreators
> = GetActionTypes<Pick<typeof ShipperActionCreators, K>>;

export type ShipperAllObjectTypes = GetActionTypes<
  typeof ShipperActionCreators
>;
