import { NativeModules } from "react-native";
import http from "../../../utils/http";

const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = BuildConfig.APP_BASE_URL;

const urls = {
  sendOtp: `${endpoint}/v2/sendOtp`,
  verifyOtp: `${endpoint}/v2/verifyOtp`,
  savePersonalProfile: `${endpoint}/v2/business`,
  logout: `${endpoint}/v1/logout`
};

export const getEndpoint = () => endpoint;

export default {
  sendOtp() {
    return Promise.resolve({});
  },
  verifyOtp() {
    return Promise.resolve({
      user_id: 1,
      phone_number: "8823112345"
    });
  },
  savePersonalProfile() {
    return Promise.resolve({
      user_id: 1,
      phone_number: "8823112345",
      name: "shreynik"
    });
  },
  saveCompanyProfile() {
    return Promise.resolve({
      name: "Tesla",
      regNumber: "X123XDEWZ",
      location: "New York"
    });
  },
  logoutApi() {
    return http.put<{}, {}>(
      urls.logout,
      {},
      {
        headers: {}
      }
    );
  }
};
