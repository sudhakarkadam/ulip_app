export interface SelectItemType {
  label: string;
  value: string;
}

export interface SendOtpRequest {
  phone_number: string;
  role: "SHIPPER";
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp: string;
}

export interface SavePersonalProfileRequest {
  phone_number: string;
  name: string;
  user_id: number;
}

export interface SendOtpResponse {
  user_id: number;
  name: null | string;
  phone_number: string;
}

export interface ShipperBusinessProfileModel {
  business_id: number;
  business_name: string;
  location_details: LocationModel;
  reg_info: {
    registration_number: string;
  };
  role: "SHIPPER";
  user_id: number;
}

export interface LocationModel {
  address: string;
  city: string;
  location_code: string;
  map_ref: string;
  name: string;
  postal_code: string;
  state: string;
}

export interface UserDataModel {
  user_details: {
    user_id: number;
    name: null | string;
    phone_number: string;
  };
  business_details: null | ShipperBusinessProfileModel;
}
