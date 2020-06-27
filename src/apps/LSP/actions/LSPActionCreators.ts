import actions from "./LSPActions";
import api from "../api/LSPApi";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../../../utils/actionCreator";

const LSPActionCreators = {
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
  getMetrics: createAsyncAction(
    [
      actions.HOME_METRICS_REQUEST,
      actions.HOME_METRICS_SUCCESS,
      actions.HOME_METRICS_ERROR
    ],
    api.getMetrics
  ),
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default LSPActionCreators;

export type LSPActionObjectTypes<
  K extends keyof typeof LSPActionCreators
> = GetActionTypes<Pick<typeof LSPActionCreators, K>>;

export type LSPAllObjectTypes = GetActionTypes<typeof LSPActionCreators>;
