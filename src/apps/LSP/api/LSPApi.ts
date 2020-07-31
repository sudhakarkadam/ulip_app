import http from "../../../utils/http";
import { TripAcceptRequest, TripRejectRequest } from "../models/TripAcceptance";
import { HeaderProvider } from "../../../api/Headers";
const endpoint = "https://b5f8220d0286.ngrok.io";

const urls = {
  acceptTrip: `${endpoint}/ulip/tsr/accept`,
  rejectTrip: `${endpoint}/ulip/tsr/reject`
};

export const getEndpoint = () => endpoint;

export default {
  acceptTrip: (payload: TripAcceptRequest) => {
    return http.post<TripAcceptRequest, {}>(urls.acceptTrip, payload, {
      headers: HeaderProvider.getHeaders()
    });
  },

  rejectTrip: (payload: TripRejectRequest) => {
    return http.post<TripRejectRequest, {}>(urls.rejectTrip, payload, {
      headers: HeaderProvider.getHeaders()
    });
  }
};
