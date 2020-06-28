import http from "../../../utils/http";
import { DriverTrips, UpdateTripRequest } from "../models/DriverTrips";

const endpoint = "http://10.24.7.179";

const urls = {
  getTrips: `${endpoint}/ulip/transport_service_request/search`,
  updateTrip: `${endpoint}/ulip/transport_service_request/updateStatus`
};

export const getTrips = (driverPhoneNumber: string) =>
  http.get<{}, DriverTrips>(urls.getTrips, {
    driverPhoneNumber
  });

export const updateTrip = (args: UpdateTripRequest) =>
  http.put<UpdateTripRequest, {}>(urls.updateTrip, args);
