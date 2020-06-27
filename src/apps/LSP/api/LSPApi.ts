import { NativeModules } from "react-native";
import http from "../../../utils/http";

const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = BuildConfig.APP_BASE_URL;

const urls = {
  sendOtp: `${endpoint}/v2/sendOtp`,
  verifyOtp: `${endpoint}/v2/verifyOtp`,
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
  getMetrics() {
    return Promise.resolve({
      transport_service_request: {
        created: 100,
        in_progress: 100,
        pending_pod: 10
      },
      trucks: {
        type1: 34,
        type2: 3
      },
      drivers: 10
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
