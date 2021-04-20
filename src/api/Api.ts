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
  BusinessSite,
  SaveTruckRequestModel,
  VehicleListDetails,
  UserPersonaTypes,
  BusinessSitesResponse,
  AddEayBillRequest
} from "../models/CommonModel";
import {
  CreateTripRequestModel,
  LspListResponse
} from "../models/ShipperApiModels";
import RNFetch from "rn-fetch-blob";
import { HeaderProvider } from "./Headers";
import { DriverTrips, Status, UpdateTripRequest } from "../models/DriverTrips";
import { TripAcceptRequest, TripRejectRequest } from "../models/TripAcceptance";

// const BuildConfig = NativeModules.RNBuildConfig || {};
const endpoint = "http://20.40.44.155";

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
  business: `${endpoint}/ulip/business/businessSite`,
  saveTruck: `${endpoint}/ulip/business/vehicle`,
  getVehiclesList: `${endpoint}/ulip/business`,
  getDriverTrips: `${endpoint}/ulip/trip/driver/`,
  getTripById: (id: number) => `${endpoint}/ulip/trip/${id}`,
  updateTrip: (id: number | undefined) => `${endpoint}/ulip/trip/${id}/status`,
  upload: (id: number) => `${endpoint}/ulip/trip/${id}/document/upload`,
  acceptTrip: `${endpoint}/ulip/tsr/accept`,
  rejectTrip: `${endpoint}/ulip/tsr/reject`,
  addEWayBill: (id?: number) => `${endpoint}/ulip/trip/ewaybill/${id}`,
  generateEwayBill: `${endpoint}/ulip/trip/ewaybill/?accountNonExpired=true&accountNonLocked=true`
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
    persona: UserPersonaTypes;
  }) {
    return http.post<SavePersonalProfileRequest, SavePersonalProfileResponse>(
      urls.savePersonalProfile,
      {
        phone_number: req.phone,
        name: req.name,
        login_id: req.loginId,
        persona: req.persona
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
        status_list: (payload.status || []).join(","),
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

  saveWarehouse(req: Omit<BusinessSite, "business_site_id">) {
    return http.post<
      Omit<BusinessSite, "business_site_id">,
      BusinessSite & { business_site_id: string }
    >(urls.business, req, {
      headers: HeaderProvider.getHeaders()
    });
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
  },
  getDriverTrips({
    driverPhoneNumber,
    status
  }: {
    driverPhoneNumber: string;
    status: Status[];
  }) {
    return http.get<{}, DriverTrips>(
      urls.getDriverTrips + driverPhoneNumber,
      {
        status
      },
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },

  getTripById(id?: string | number) {
    return http.get<{}, DriverTrips[0]>(
      urls.getTripById(Number(id)),
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },

  updateTrip(args: UpdateTripRequest) {
    return http.put<UpdateTripRequest, {}>(
      urls.updateTrip(args.tripId),
      { status: args.status },
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },
  specialUpload(args: any) {
    return RNFetch.fetch(
      "POST",
      urls.upload(args.id),
      {
        "Content-Type": "multipart/form-data",
        ...HeaderProvider.getHeaders()
      },
      [
        { name: "file", filename: "sig.jpeg", data: args.fileData },
        { name: "document_format", data: args.document_format },
        { name: "document_type", data: args.document_type },
        { name: "document_id", data: args.document_id }
      ]
    );
  },

  upload({ file, id }: { id: number; file: FormData }) {
    return fetch(urls.upload(id), {
      body: file,
      headers: {
        "Content-Type": "multipart/form-data",
        ...HeaderProvider.getHeaders()
      },
      method: "POST"
    });
  },

  acceptTrip: (payload: TripAcceptRequest) => {
    return http.post<TripAcceptRequest, {}>(urls.acceptTrip, payload, {
      headers: HeaderProvider.getHeaders()
    });
  },

  rejectTrip: (payload: TripRejectRequest) => {
    return http.post<TripRejectRequest, {}>(urls.rejectTrip, payload, {
      headers: HeaderProvider.getHeaders()
    });
  },

  addEWayBill: (payload: AddEayBillRequest) => {
    return http.put<AddEayBillRequest, {}>(
      urls.addEWayBill(payload.tripId),
      payload,
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  },

  generateEwayBill: (payload: any) => {
    return http.post<any, {}>(urls.generateEwayBill, payload, {
      headers: HeaderProvider.getHeaders()
    });
  },

  getBusinessSites(id: string) {
    return http.get<{}, BusinessSitesResponse>(
      `${endpoint}/ulip/business/${id}/businessSite`,
      {},
      {
        headers: HeaderProvider.getHeaders()
      }
    );
  }
};
