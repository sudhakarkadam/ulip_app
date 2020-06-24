import { NativeModules } from "react-native";
import http from "../../../utils/http";

const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = BuildConfig.APP_BASE_URL;

const urls = {
  login: `${endpoint}/v2/login`,
  logout: `${endpoint}/v1/logout`
};

export const getEndpoint = () => endpoint;

export default {
  login() {
    return http.post<{}, {}>(
      urls.login,
      {},
      {
        headers: {}
      }
    );
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
