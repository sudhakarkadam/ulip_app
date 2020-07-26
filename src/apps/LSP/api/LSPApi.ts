import http from "../../../utils/http";
import { TripAcceptRequest, TripRejectRequest } from "../models/TripAcceptance";
const endpoint = "http://10.24.7.179";

const urls = {
  acceptTrip: `${endpoint}/ulip/tsr/accept`,
  rejectTrip: `${endpoint}/ulip/tsr/reject`
};

export const getEndpoint = () => endpoint;

export default {
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
};
