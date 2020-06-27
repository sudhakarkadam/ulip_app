// import { NativeModules } from "react-native";
import http from "../../../utils/http";

// const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = "http://10.24.7.179";

const urls = {
  logout: `${endpoint}/v1/logout`
};

export const getEndpoint = () => endpoint;

export default {
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
