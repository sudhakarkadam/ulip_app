export interface TripAcceptRequest {
  sr_id: number;
  driver: {
    name: string;
    mobile_number: string;
  };
  truck_type: string;
}

export interface TripRejectRequest {
  reason: string;
  sr_id: number;
}
