// import { NativeModules } from "react-native";
import http from "../../../utils/http";
import {
  CreateTripRequestModel,
  LspListResponse
} from "../models/ShipperApiModels";

// const BuildConfig = NativeModules.RNBuildConfig || {};
// const mockURL = 'http://localhost:8081/src/mocks';
const endpoint = "http://10.24.7.179";

const urls = {
  createTrip: `${endpoint}/ulip/transport_service_request`,
  getLspList: `${endpoint}/ulip/business`
};

export const getEndpoint = () => endpoint;

interface BusinessRole {
  type: "SHIPPER" | "LSP";
}

export default {
  getLspList(req: BusinessRole) {
    return http.get<BusinessRole, LspListResponse>(urls.getLspList, {
      type: req.type
    });
  },
  createTrip(req: CreateTripRequestModel) {
    return http.post<CreateTripRequestModel, CreateTripRequestModel>(
      urls.createTrip,
      req
    );
  }
};
