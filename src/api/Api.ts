// import { NativeModules } from "react-native";
import http from "../utils/http";
import {
  SendOtpRequest,
  SendOtpResponse,
  VerifyOtpRequest,
  UserDataModel,
  SavePersonalProfileRequest,
  ShipperBusinessProfileModel,
  LocationModel
} from "../models/CommonModel";

// const BuildConfig = NativeModules.RNBuildConfig || {};
const endpoint = "http://10.24.7.179";

const urls = {
  sendOtp: `${endpoint}/ulip/user/login`,
  verifyOtp: `${endpoint}/ulip/user/verify`,
  savePersonalProfile: `${endpoint}/ulip/user`,
  saveCompanyProfile: `${endpoint}/ulip/business`
};

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
      urls.sendOtp,
      {
        business_id: 0,
        business_name: req.name,
        location_details: req.location,
        reg_info: {
          registration_number: req.regNumber
        },
        role: req.role,
        user_id: req.userId
      }
    );
  }
};
