export interface TripAcceptRequest {
  tsr_id: number;
  driver_name: string;
  driver_phone_number: string;
  vehicle_details: {
    business_id: string;
    device_id: string;
    device_type: string;
    truck_name: string;
    truck_number: string;
    truck_type: string;
    tsp_id: string;
    vehicle_id: string;
  };
}

export interface TripRejectRequest {
  reject_reason: string;
  tsr_id: number;
}
