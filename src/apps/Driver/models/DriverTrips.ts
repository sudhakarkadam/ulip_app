export type DriverTrips = RootObject[];

interface RootObject {
  id: number;
  pickUp_location: Location;
  delivery_location: Location;
  pickup_date: string;
  good_type: string;
  weight: number;
  weight_unit: string;
  status: string;
  truck_type_preference: string;
  trip: Trip;
}

interface Trip {
  id: number;
  status: "CREATED" | "TRIP_STARTED" | "IN_TRANSIT" | "REACHED" | "COMPLETED";
  eta: string;
  driver_name: string;
  truck_name?: any;
  truck_type: string;
  delay: boolean;
  documents: any[];
}

export interface Location {
  address: string;
  city: string;
  state: string;
}
