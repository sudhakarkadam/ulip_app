// import { NativeModules } from "react-native";
import http from "../../../utils/http";
import { GetMetricsRequest } from "../../../models/CommonModel";
import Metrics from "../models/HomeMetricsModel";
import { TripAcceptRequest, TripRejectRequest } from "../models/TripAcceptance";

// const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
// const endpoint = BuildConfig.APP_BASE_URL;
const endpoint = "http://10.24.7.179";

const urls = {
  getMetrics: (businessId: string) =>
    `${endpoint}/ulip/transport_service_request/business/${businessId}/view`,
  acceptTrip: `${endpoint}/ulip/transport_service_request/accept`,
  rejectTrip: `${endpoint}/ulip/transport_service_request/reject`
};

export const getEndpoint = () => endpoint;

export default {
  getMetrics: (payload: GetMetricsRequest) => {
    return http.get<{}, Metrics>(
      urls.getMetrics(payload.businessId),
      {},
      {
        headers: {}
      }
    );
  },
  acceptTrip: (payload: TripAcceptRequest) => {
    return http.post<TripAcceptRequest, {}>(urls.acceptTrip, payload, {
      headers: {}
    });
  },

  rejectTrip: (payload: TripRejectRequest) => {
    return http.post<TripRejectRequest, {}>(urls.rejectTrip, payload, {
      headers: {}
    });
  }

  // getMetrics() {
  //   return Promise.resolve({
  //     transport_service_request: {
  //       created: 100,
  //       in_progress: 100,
  //       pending_pod: 10
  //     },
  //     trucks: {
  //       type1: 34,
  //       type2: 3
  //     },
  //     drivers: 10
  //   });
  // }
};
