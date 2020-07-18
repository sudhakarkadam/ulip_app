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
  business_id?: number;
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
  userPersona?: string;
}
export interface GetTripsRequest {
  status: string[];
  businessId: number;
}
export interface GetMetricsRequest {
  businessId: number;
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
  id: number;
  pickUp_location: PickUplocation;
  delivery_location: PickUplocation;
  pickup_date: string;
  good_type: string;
  weight: number;
  weight_unit: string;
  status: RequestStatus;
  lsp_name: string;
  truck_type_preference: TruckType;
  trip?: Trip;
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
  code?: string | null;
  address?: string | null;
  city: string;
  state?: string | null;
  map_ref: { ref: string } | null;
  country?: string | null;
}

export interface Metrics {
  transport_service_request: {
    [RequestStatus.ACCEPTED]: number;
    [RequestStatus.COMPLETED]: number;
    [RequestStatus.CREATED]: number;
    [RequestStatus.IN_PROGRESS]: number;
    [RequestStatus.PENDING_POD]: number;
    [RequestStatus.REJECTED]: number;
  };
  trucks: {
    [TruckType.CONTAINER]: number;
    [TruckType.OPEN]: number;
    [TruckType.TRAILOR]: number;
  };
  drivers: number;
}
