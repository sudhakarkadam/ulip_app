export interface TripAcceptRequest {
  tsr_id: number;
  driver_name: string;
  driver_phone_number: string;
  vehicle_id: number;
}

export interface TripRejectRequest {
  reject_reason: string;
  tsr_id: number;
}
