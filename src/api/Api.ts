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
  ResendOtpRequest,
  GetMetricsRequest,
  SaveTruckRequestModel,
  VehicleListDetails
} from "../models/CommonModel";
import {
  CreateTripRequestModel,
  LspListResponse
} from "../models/ShipperApiModels";
import { HeaderProvider } from "./Headers";

// const BuildConfig = NativeModules.RNBuildConfig || {};
const endpoint = "https://b5f8220d0286.ngrok.io";

const urls = {
  sendOtp: `${endpoint}/ulip/user/login`,
  verifyOtp: `${endpoint}/ulip/user/verify`,
  resendOtp: `${endpoint}/ulip/user/resend/otp`,
  savePersonalProfile: `${endpoint}/ulip/user/profile`,
  saveCompanyProfile: `${endpoint}/ulip/business`,
  login: `${endpoint}/ulip/login`,
  logout: `${endpoint}/ulip/logout`,
  createTrip: `${endpoint}/ulip/tsr`,
  getLspList: `${endpoint}/ulip/business`,
  getAppConfigs: `${endpoint}/ulip/app/configs`,
  getTrips: `${endpoint}/ulip/tsr/status_view`,
  getMetrics: `${endpoint}/ulip/tsr/view`,
  saveTruck: `${endpoint}/ulip/business/vehicle`,
  getVehiclesList: `${endpoint}/ulip/business`
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
  resendOtp(verification_id: string) {
    return http.post<ResendOtpRequest, {}>(urls.resendOtp, { verification_id });
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
      },
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  saveCompanyProfile(req: {
    name: string;
    location: LocationModel;
    userId: string;
    business_type: string;
    gst_in: string;
  }) {
    return http.post<
      ShipperBusinessProfileModel,
      ShipperBusinessProfileResponse
    >(
      urls.saveCompanyProfile,
      {
        business_name: req.name,
        location: req.location,
        user_id: req.userId,
        business_type: req.business_type,
        registration_number: req.gst_in
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
    return http.put<{}, {}>(
      urls.logout,
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  getAppConfigs: () => {
    return http.get<{}, AppConfigsResponse>(
      urls.getAppConfigs,
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  getTrips: (payload: GetTripsRequest) => {
    return http.get<
      { status_list: string; persona: string; business_id: string },
      { transport_service_requests: GetTripsResponse[] }
    >(
      urls.getTrips,
      {
        status_list: payload.status.join(","),
        persona: payload.persona,
        business_id: payload.businessId
      },
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  getMetrics: (payload: GetMetricsRequest) => {
    return http.get<{}, Metrics>(urls.getMetrics, payload, {
      headers: HeaderProvider.getHeaders()
    });
  },
  getLspList(req: BusinessRole) {
    return http.get<{}, LspListResponse>(
      `${urls.getLspList}/${req.type.toLowerCase()}`,
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  createTrip(req: CreateTripRequestModel) {
    return http.post<CreateTripRequestModel, CreateTripRequestModel>(
      urls.createTrip,
      req,
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  saveTruck(req: SaveTruckRequestModel) {
    return http.post<SaveTruckRequestModel, SaveTruckRequestModel>(
      urls.saveTruck,
      req,
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  getVehiclesList(lspId: string) {
    return http.get<{}, { vehicles: VehicleListDetails[] }>(
      `${urls.getVehiclesList}/${lspId}/vehicles`,
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  }
};
