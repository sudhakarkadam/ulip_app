import { Languages } from "../components/InternationalisationProvider";
export interface SelectItemType {
  label: string;
  value: string;
}
export interface SendOtpRequest {
  phone_number: string;
}

export interface VerifyOtpRequest {
  phone_number: string;
  otp: string;
  verification_id: string;
}
export interface ResendOtpRequest {
  verification_id: string;
}

export interface SavePersonalProfileRequest {
  phone_number: string;
  name: string;
  login_id: string;
  persona: string;
}

export interface SavePersonalProfileResponse
  extends SavePersonalProfileRequest {
  user_id: string;
  status: string;
}

export interface SendOtpResponse {
  verification_id: string;
  attempts: number;
  phone_number: string;
}

export interface ShipperBusinessProfileModel {
  business_name: string;
  site_details: LocationModel;
  user_id: string;
  business_type: string;
}

export interface ShipperBusinessProfileResponse
  extends ShipperBusinessProfileModel {
  business_id: string;
}

export interface LocationModel {
  address: string;
  city: string;
  location_code: string;
  map_ref: string;
  name: string;
  postal_code: string;
  state: string;
  gst_in: string;
}

export interface PerosnaDetails {
  profile: {
    user_id: string;
    name: string;
    persona: string;
    phone_number: string;
    status: string;
  };
  business_details?: {
    business_id: string;
    legal_name: string;
    type: string;
  };
}

export interface UserDataModel {
  user_details: PerosnaDetails[];
  userPersona?: string;
  language?: Languages;
  verification_id: string;
  login_id: string;
  access_token: string;
  phone_number: string;
}
export interface GetTripsRequest {
  status: string[];
  businessId: string;
  persona: string;
}
export interface GetMetricsRequest {
  business_id: string;
  persona: string;
}
export enum AllApps {
  SHIPPER = "SHIPPER",
  LSP = "LSP"
}
export enum TruckType {
  OPEN = "OPEN",
  CONTAINER = "CONTAINER",
  TRAILOR = "TRAILOR"
}

export interface GetTripsResponse {
  tsr_id: number;
  source_location_details: PickUplocation;
  destination_location_details: PickUplocation;
  pickup_date: string;
  goods_segment: string;
  weight: number;
  weight_unit: string;
  status: RequestStatus;
  legal_name: string;
  truck_type_preference: TruckType;
  trip_details?: Trip;
}
export enum RequestStatus {
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING_POD = "PENDING_POD",
  COMPLETED = "COMPLETED"
}
interface Trip {
  id: number;
  status: RequestStatus;
  eta: string;
  driver_name: string;
  truck_name?: string;
  truck_type: TruckType;
  delay: boolean;
  documents: {
    id: number;
    type: string;
  }[];
}

interface PickUplocation {
  id: number | null;
  code?: string;
  address?: string;
  city: string;
  state?: string;
  map_ref: { ref: string } | null;
  country?: string;
}

export interface Metrics {
  status_count_details: {
    [RequestStatus.ACCEPTED]: number;
    [RequestStatus.COMPLETED]: number;
    [RequestStatus.CREATED]: number;
    [RequestStatus.IN_PROGRESS]: number;
    [RequestStatus.PENDING_POD]: number;
    [RequestStatus.REJECTED]: number;
  };
}

export interface AppConfigsResponse {
  truck_types: string[];
  good_types: string[];
  weight_types: string[];
  reject_reasons: string[];
}

export interface BusinessSite {
  business_id: string;
  warehouse_name: string;
  gstin: string;
  location: Location;
}

export interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  map_ref: {};
}
