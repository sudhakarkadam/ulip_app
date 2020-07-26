import http from "../../../utils/http";
import { DriverTrips, UpdateTripRequest } from "../models/DriverTrips";

const endpoint = "http://10.24.7.179";

const urls = {
  getTrips: `${endpoint}/ulip/trip/driver/`,
  getTripById: `${endpoint}/ulip/trip/`,
  updateTrip: `${endpoint}/ulip/transport_service_request/updateStatus`,
  upload: (id: number, type: string) =>
    `${endpoint}/ulip/trip/${id}/document/upload?type=${type}`
};

export const getTrips = (driverPhoneNumber: string) =>
  http.get<{}, DriverTrips>(urls.getTrips + driverPhoneNumber, {
    status: ["CREATED", "TRIP_STARTED", "IN_TRANSIT"]
  });

export const getTripById = (id: string) => {
  return http.get<{ id: string }, DriverTrips[0]>(urls.getTripById + id);
};

export const updateTrip = (args: UpdateTripRequest) =>
  http.put<UpdateTripRequest, {}>(urls.updateTrip, args);

export const upload = ({
  file,
  id,
  type
}: {
  id: number;
  file: FormData;
  type: "POD" | "POP";
}) =>
  fetch(urls.upload(id, type), {
    body: file,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: "POST"
  });
