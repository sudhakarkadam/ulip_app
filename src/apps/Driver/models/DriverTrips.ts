export type DriverTrips = Root[];
type Status =
  | "CREATED"
  | "TRIP_STARTED"
  | "IN_TRANSIT"
  | "REACHED"
  | "COMPLETED";

export interface Location {
  address: string;
  city: string;
  state: string;
}

export interface UpdateTripRequest {
  sr_id: number;
  status: "TRIP_STARTED" | "REACHED";
}

export interface Root {
  destination_location_details: DestinationLocationDetails;
  documents: Document[];
  pickup_request_time: number;
  source_location_details: SourceLocationDetails;
  trip_id: number;
  trip_status: Status;
  tsr_id: number;
  vehicle_details: VehicleDetails;
  weight_unit: string;
  weight: string;
}

export interface DestinationLocationDetails {
  address: string;
  city: string;
  country: string;
  id: number;
  map_ref: {};
  name: string;
  postal_code: number;
  state: string;
}

export interface Document {
  id: string;
  type: string;
  url: string;
}

export interface SourceLocationDetails {
  address: string;
  city: string;
  country: string;
  id: number;
  map_ref: {};
  name: string;
  postal_code: number;
  state: string;
}

export interface VehicleDetails {
  business_id: string;
  device_id: string;
  device_type: string;
  truck_name: string;
  truck_number: string;
  truck_type: string;
  tsp_id: string;
  vehicle_id: number;
}
