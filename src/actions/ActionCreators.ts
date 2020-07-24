import actions from "./Actions";
import api from "../api/Api";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../utils/actionCreator";
import { Languages } from "src/components/InternationalisationProvider";

const ActionCreators = {
  createTrip: createAsyncAction(
    [
      actions.CREATE_TRIP_REQUEST,
      actions.CREATE_TRIP_SUCCESS,
      actions.CREATE_TRIP_ERROR
    ],
    api.createTrip
  ),
  getLspList: createAsyncAction(
    [
      actions.LSP_LIST_REQUEST,
      actions.LSP_LIST_SUCCESS,
      actions.LSP_LIST_ERROR
    ],
    api.getLspList
  ),
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
  login: createAsyncAction(
    [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_ERROR],
    api.login
  ),
  getTrips: createAsyncAction(
    [
      actions.GET_TRIPS_REQUEST,
      actions.GET_TRIPS_SUCCESS,
      actions.GET_TRIPS_ERROR
    ],
    api.getTrips
  ),
  logout: () => createAction(actions.LOGOUT, {}, {}),
  getMetrics: createAsyncAction(
    [
      actions.HOME_METRICS_REQUEST,
      actions.HOME_METRICS_SUCCESS,
      actions.HOME_METRICS_ERROR
    ],
    api.getMetrics
  ),
  setUserPersona: (args: { user: string }) =>
    createAction(actions.SET_USER_PERSONA, args, {}),

  setUserLanguage: (args: { language: Languages }) =>
    createAction(actions.SET_USER_LANGUAGE, args, {})
};

export default ActionCreators;

export type ActionObjectTypes<
  K extends keyof typeof ActionCreators
> = GetActionTypes<Pick<typeof ActionCreators, K>>;

export type AllObjectTypes = GetActionTypes<typeof ActionCreators>;
