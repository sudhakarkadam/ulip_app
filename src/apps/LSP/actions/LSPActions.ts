enum LSPActionTypes {
  SEND_OTP_REQUEST = "SEND_OTP_REQUEST",
  SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS",
  SEND_OTP_ERROR = "SEND_OTP_ERROR",

  VERIFY_OTP_REQUEST = "VERIFY_OTP_REQUEST",
  VERIFY_OTP_SUCCESS = "VERIFY_OTP_SUCCESS",
  VERIFY_OTP_ERROR = "VERIFY_OTP_ERROR",

  HOME_METRICS_REQUEST = "HOME_METRICS_REQUEST",
  HOME_METRICS_SUCCESS = "HOME_METRICS_SUCCESS",
  HOME_METRICS_ERROR = "HOME_METRICS_ERROR",

  LOGOUT = "LOGOUT"
}

export default LSPActionTypes;