// import { NativeModules } from "react-native";
import http from "../../../utils/http";
import { CreateTripRequestModel } from "../models/ShipperApiModels";

// const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = "http://10.24.7.179";

const urls = {
  createTrip: `${endpoint}/ulip/transport_service_request`
};

export const getEndpoint = () => endpoint;

export default {
  createTrip(req: CreateTripRequestModel) {
    return http.post<CreateTripRequestModel, CreateTripRequestModel>(
      urls.createTrip,
      req
    );
  }
};
