import http from "../../../utils/http";
import { DriverTrips, UpdateTripRequest } from "../models/DriverTrips";
import RNFetch from "rn-fetch-blob";
const endpoint = "http://10.24.7.179";

const urls = {
  getTrips: `${endpoint}/ulip/trip/driver/`,
  getTripById: `${endpoint}/ulip/trip/`,
  updateTrip: `${endpoint}/ulip/transport_service_request/updateStatus`,
  upload: (id: number) => `${endpoint}/ulip/trip/${id}/document/upload`
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

export const specialUpload = (args: any) => {
  return RNFetch.fetch(
    "POST",
    urls.upload(args.id),
    {
      "Content-Type": "multipart/form-data"
    },
    [
      { name: "file", filename: "sig.jpeg", data: args.fileData },
      { name: "document_format", data: args.document_format },
      { name: "document_type", data: args.document_type },
      { name: "document_id", data: args.document_id }
    ]
  );
};

export const upload = ({ file, id }: { id: number; file: FormData }) =>
  fetch(urls.upload(id), {
    body: file,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    method: "POST"
  });
