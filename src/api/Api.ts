// import { NativeModules } from "react-native";
import http from "../utils/http";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  UserDataModel,
  SavePersonalProfileRequest,
  ShipperBusinessProfileModel,
  LocationModel,
  GetTripsRequest,
  GetTripsResponse,
  Metrics,
  GetMetricsRequest
} from "../models/CommonModel";
import {
  CreateTripRequestModel,
  LspListResponse
} from "../models/ShipperApiModels";
import { HeaderProvider } from "./Headers";

// const BuildConfig = NativeModules.RNBuildConfig || {};
const endpoint = "http://10.24.7.179";

const urls = {
  sendOtp: `${endpoint}/ulip/user/login`,
  verifyOtp: `${endpoint}/ulip/user/verify`,
  savePersonalProfile: `${endpoint}/ulip/user`,
  saveCompanyProfile: `${endpoint}/ulip/business`,
  login: `${endpoint}/ulip/login`,
  logout: `${endpoint}/ulip/logout`,
  createTrip: `${endpoint}/ulip/transport_service_request`,
  getLspList: `${endpoint}/ulip/business`,
  getTrips: (businessId: string) =>
    `${endpoint}/ulip/transport_service_request/business/${businessId}`,
  getMetrics: (businessId: string) =>
    `${endpoint}/ulip/transport_service_request/business/${businessId}/view`
};

interface BusinessRole {
  type: "SHIPPER" | "LSP";
}
export const getEndpoint = () => endpoint;

export default {
  sendOtp(req: { phone: string }) {
    return http.post<SendOtpRequest, SendOtpResponse>(urls.sendOtp, {
      phone_number: req.phone,
      role: "SHIPPER"
    });
  },
  verifyOtp(req: { phone: string; otp: string }) {
    return http.post<VerifyOtpRequest, UserDataModel>(urls.verifyOtp, {
      phone_number: req.phone,
      otp: req.otp
    });
  },
  savePersonalProfile(req: { name: string; phone: string; userId: number }) {
    return http.put<SavePersonalProfileRequest, SavePersonalProfileRequest>(
      urls.savePersonalProfile,
      {
        phone_number: req.phone,
        name: req.name,
        user_id: req.userId
      }
    );
  },
  saveCompanyProfile(req: {
    name: string;
    location: LocationModel;
    regNumber: string;
    role: "SHIPPER";
    userId: number;
  }) {
    return http.post<ShipperBusinessProfileModel, ShipperBusinessProfileModel>(
      urls.saveCompanyProfile,
      {
        business_name: req.name,
        location_details: req.location,
        reg_info: {
          registration_number: req.regNumber
        },
        role: req.role,
        user_id: req.userId
      },
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  login: () => {
    return http.post<{}, {}>(urls.login, {});
  },
  logoutApi: () => {
    return http.put<{}, {}>(urls.logout, {});
  },
  getTrips: (payload: GetTripsRequest) => {
    return http.get<{ status: string }, GetTripsResponse[]>(
      urls.getTrips(payload.businessId.toString()),
      { status: payload.status.join(",") }
    );
  },
  getMetrics: (payload: GetMetricsRequest) => {
    return http.get<{}, Metrics>(
      urls.getMetrics(payload.businessId.toString()),
      {},
      {
        headers: {}
      }
    );
  },
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
