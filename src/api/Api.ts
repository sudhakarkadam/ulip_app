// import { NativeModules } from "react-native";
import http from "../utils/http";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  UserDataModel,
  SavePersonalProfileRequest,
  SavePersonalProfileResponse,
  ShipperBusinessProfileModel,
  ShipperBusinessProfileResponse,
  LocationModel,
  GetTripsRequest,
  GetTripsResponse,
  AppConfigsResponse,
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
  savePersonalProfile: `${endpoint}/ulip/user/profile`,
  saveCompanyProfile: `${endpoint}/ulip/business`,
  login: `${endpoint}/ulip/login`,
  logout: `${endpoint}/ulip/logout`,
  createTrip: `${endpoint}/ulip/tsr`,
  getLspList: `${endpoint}/ulip/business`,
  getAppConfigs: `${endpoint}/ulip/app/configs`,
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
      phone_number: req.phone
    });
  },
  verifyOtp(req: { phone: string; otp: string; verification_id: string }) {
    return http.post<VerifyOtpRequest, UserDataModel>(urls.verifyOtp, {
      phone_number: req.phone,
      otp: req.otp,
      verification_id: req.verification_id
    });
  },
  savePersonalProfile(req: {
    name: string;
    phone: string;
    loginId: string;
    persona: string;
  }) {
    return http.post<SavePersonalProfileRequest, SavePersonalProfileResponse>(
      urls.savePersonalProfile,
      {
        phone_number: req.phone,
        name: req.name,
        login_id: req.loginId,
        persona: req.persona.toUpperCase()
      }
    );
  },
  saveCompanyProfile(req: {
    name: string;
    location: LocationModel;
    userId: string;
    business_type: string;
  }) {
    return http.post<
      ShipperBusinessProfileModel,
      ShipperBusinessProfileResponse
    >(
      urls.saveCompanyProfile,
      {
        business_name: req.name,
        site_details: req.location,
        user_id: req.userId,
        business_type: req.business_type
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
  getAppConfigs: () => {
    return http.get<{}, AppConfigsResponse>(
      urls.getAppConfigs
    );
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
    return http.get<BusinessRole, LspListResponse>(`${urls.getLspList}/${req.type.toLowerCase()}`);
  },
  createTrip(req: CreateTripRequestModel) {
    return http.post<CreateTripRequestModel, CreateTripRequestModel>(
      urls.createTrip,
      req,
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  }
};
