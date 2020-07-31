import actions from "./Actions";
import api from "../api/Api";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../utils/actionCreator";
import { Languages } from "../components/InternationalisationProvider";
import { UserPersonaTypes } from "../models/CommonModel";

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
  resendOtp: createAsyncAction(
    [
      actions.RESEND_OTP_REQUEST,
      actions.RESEND_OTP_SUCCESS,
      actions.RESEND_OTP_ERROR
    ],
    api.resendOtp
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
  getAppConfigs: createAsyncAction(
    [
      actions.APP_CONFIG_REQUEST,
      actions.APP_CONFIG_SUCCESS,
      actions.APP_CONFIG_ERROR
    ],
    api.getAppConfigs
  ),
  getVehiclesList: createAsyncAction(
    [
      actions.VEHICLES_LIST_REQUEST,
      actions.VEHICLES_LIST_SUCCESS,
      actions.VEHICLES_LIST_ERROR
    ],
    api.getVehiclesList
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
  saveWarehouse: createAsyncAction(
    [
      actions.SAVE_WAREHOUSE_REQUEST,
      actions.SAVE_WAREHOUSE_SUCCESS,
      actions.SAVE_WAREHOUSE_ERROR
    ],
    api.saveWarehouse
  ),
  saveTruck: createAsyncAction(
    [
      actions.SAVE_TRUCK_REQUEST,
      actions.SAVE_TRUCK_SUCCESS,
      actions.SAVE_TRUCK_ERROR
    ],
    api.saveTruck
  ),
  getBusinessSites: createAsyncAction(
    [
      actions.GET_BUSINESS_SITES_REQUEST,
      actions.GET_BUSINESS_SITES_SUCCESS,
      actions.GET_BUSINESS_SITES_ERROR
    ],
    api.getBusinessSites
  ),
  setUserPersona: (args: { user: UserPersonaTypes }) =>
    createAction(actions.SET_USER_PERSONA, args, {}),

  setUserLanguage: (args: { language: Languages }) =>
    createAction(actions.SET_USER_LANGUAGE, args, {}),

  getDriverTrips: createAsyncAction(
    [
      actions.GET_DRIVER_TRIPS_REQUEST,
      actions.GET_DRIVER_TRIPS_SUCCESS,
      actions.GET_DRIVER_TRIPS_ERROR
    ],
    api.getDriverTrips
  ),

  getTripById: createAsyncAction(
    [
      actions.GET_TRIP_BY_ID_REQUEST,
      actions.GET_TRIP_BY_ID_SUCCESS,
      actions.GET_TRIP_BY_ID_ERROR
    ],
    api.getTripById
  ),

  updateTrip: createAsyncAction(
    [
      actions.GET_UPDATE_TRIP_REQUEST,
      actions.GET_UPDATE_TRIP_SUCCESS,
      actions.GET_UPDATE_TRIP_ERROR
    ],
    api.updateTrip
  ),

  upload: createAsyncAction(
    [actions.UPLOAD_REQUEST, actions.UPLOAD_SUCCESS, actions.UPLOAD_ERROR],
    api.upload
  ),

  specialUpload: createAsyncAction(
    [
      actions.SPECIAL_UPLOAD_REQUEST,
      actions.SPECIAL_UPLOAD_SUCCESS,
      actions.SPECIAL_UPLOAD_ERROR
    ],
    api.specialUpload
  ),

  acceptTrip: createAsyncAction(
    [
      actions.TRIP_ACCEPT_REQUEST,
      actions.TRIP_ACCEPT_SUCCESS,
      actions.TRIP_ACCEPT_ERROR
    ],
    api.acceptTrip
  ),
  rejectTrip: createAsyncAction(
    [
      actions.TRIP_REJECT_REQUEST,
      actions.TRIP_REJECT_SUCCESS,
      actions.TRIP_REJECT_ERROR
    ],
    api.rejectTrip
  )
};

export default ActionCreators;

export type ActionObjectTypes<
  K extends keyof typeof ActionCreators
> = GetActionTypes<Pick<typeof ActionCreators, K>>;

export type AllObjectTypes = GetActionTypes<typeof ActionCreators>;
