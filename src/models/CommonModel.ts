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
  persona: UserPersonaTypes;
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
  location: LocationModel;
  user_id: string;
  business_type: string;
  registration_number: string;
}

export interface ShipperBusinessProfileResponse
  extends ShipperBusinessProfileModel {
  business_id: string;
}

export interface LocationModel {
  address: string;
  city: string;
  country: string;
  map_ref: object;
  name: string;
  postal_code: number;
  state: string;
}

export interface PerosnaDetails {
  profile: {
    user_id: string;
    name: string;
    persona: UserPersonaTypes;
    phone_number: string;
    status: string;
  };
  business_details?: {
    business_id: string;
    legal_name: string;
    type: string;
  };
}
export type UserPersonaTypes = "SHIPPER" | "LSP" | "DRIVER";
export interface UserDataModel {
  user_details: PerosnaDetails[];
  userPersona: UserPersonaTypes;
  language?: Languages;
  verification_id: string;
  login_id: string;
  access_token: string;
  phone_number: string;
}
export interface GetTripsRequest {
  status: string[];
  businessId: string;
  persona: UserPersonaTypes;
}
export interface GetMetricsRequest {
  business_id: string;
  persona: UserPersonaTypes;
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
  created_at: number;
  destination_location_details: LocationDetails;
  goods_segment: string;
  pickup_request_time: number;
  source_location_details: LocationDetails;
  status: RequestStatus;
  trip_details: TripDetails;
  truck_type_preference: string;
  tsr_id: number;
  updated_at: number;
  weight: number;
  weight_unit: string;
}

interface TripDetails {
  id: number;
  status: string;
}

interface LocationDetails {
  address: string;
  city: string;
  country: string;
  id: number;
  map_ref: {};
  name: string;
  postal_code: number;
  state: string;
}

export enum RequestStatus {
  CREATED = "CREATED",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  IN_PROGRESS = "IN_PROGRESS",
  PENDING_POD = "PENDING_POD",
  COMPLETED = "COMPLETED"
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
  gps_providers: string[];
}

export interface VehicleDetails {
  device_id: string;
  device_type: string;
  truck_name: string;
  truck_number: string;
  truck_type: string;
  tsp_id: string;
}
export interface SaveTruckRequestModel {
  business_id: string;
  vehicle_details: VehicleDetails[];
}

export interface VehicleListDetails extends VehicleDetails {
  vehicle_id: number;
}

export interface BusinessSitesResponse {
  business_id: string;
  business_sites: BusinessSite[];
}
export interface BusinessSite {
  business_id: string;
  warehouse_name: string;
  gstin: string;
  location: Location;
  business_site_id: string;
}
interface Location {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: number;
  map_ref: {};
}
