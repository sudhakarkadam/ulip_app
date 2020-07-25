enum ActionTypes {
  SEND_OTP_REQUEST = "SEND_OTP_REQUEST",
  SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS",
  SEND_OTP_ERROR = "SEND_OTP_ERROR",

  VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST",
  VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_ERROR = "VERIFY_OTP_ERROR",

  SAVE_PROFILE_REQUEST = "SAVE_PROFILE_REQUEST",
  SAVE_PROFILE_SUCCESS = "SAVE_PROFILE_SUCCESS",
  SAVE_PROFILE_ERROR = "SAVE_PROFILE_ERROR",

  SAVE_COMPANY_PROFILE_REQUEST = "SAVE_COMPANY_PROFILE_REQUEST",
  SAVE_COMPANY_PROFILE_SUCCESS = "SAVE_COMPANY_PROFILE_SUCCESS",
  SAVE_COMPANY_PROFILE_ERROR = "SAVE_COMPANY_PROFILE_ERROR",

  LOGIN_REQUEST = "LOGIN_REQUEST",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",

  LOGOUT = "LOGOUT",

  GET_TRIPS_REQUEST = "GET_TRIPS_REQUEST",
  GET_TRIPS_SUCCESS = "GET_TRIPS_SUCCESS",
  GET_TRIPS_ERROR = "GET_TRIPS_ERROR",

  HOME_METRICS_REQUEST = "HOME_METRICS_REQUEST",
  HOME_METRICS_SUCCESS = "HOME_METRICS_SUCCESS",
  HOME_METRICS_ERROR = "HOME_METRICS_ERROR",

  CREATE_TRIP_REQUEST = "CREATE_TRIP_REQUEST",
  CREATE_TRIP_SUCCESS = "CREATE_TRIP_SUCCESS",
  CREATE_TRIP_ERROR = "CREATE_TRIP_ERROR",

  LSP_LIST_REQUEST = "LSP_LIST_REQUEST",
  LSP_LIST_SUCCESS = "LSP_LIST_SUCCESS",
  LSP_LIST_ERROR = "LSP_LIST_ERROR",

  APP_CONFIG_REQUEST = 'APP_CONFIG_REQUEST',
  APP_CONFIG_SUCCESS = 'APP_CONFIG_SUCCESS',
  APP_CONFIG_ERROR = 'APP_CONFIG_ERROR',

  SET_USER_PERSONA = "SET_USER_PERSONA",

  SET_USER_LANGUAGE = "SET_USER_LANGUAGE"
}

export default ActionTypes;
