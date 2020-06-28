import http from "../../../utils/http";
import { DriverTrips } from "../models/DriverTrips";

const endpoint = "http://10.24.7.179";

const urls = {
  getTrips: `${endpoint}/ulip/transport_service_request/search`
};

export const getTrips = (driverPhoneNumber: string) =>
  http.get<{}, DriverTrips>(urls.getTrips, {
    driverPhoneNumber
  });
