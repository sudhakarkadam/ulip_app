import { CommonState } from "../../reducers";

export interface Location {
  name: string;
  expectedPickUpTime?: string;
  expectedDeliverTime?: string;
}

export interface RouteLatLong {
  name?: string;
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

export interface CompletedHop {
  name: string;
  time: string;
  delay: string;
  latitude?: number;
  longitude?: number;
}

export interface CurrentLocation extends RouteLatLong {
  delay: string;
  time: string;
  isTripCompleted?: boolean;
  heading?: number; // Direction of travel, specified in degrees counting clockwise relative to the true north. can be used to head the truck icon
}

export interface TripTrackingProps {
  status: "REACHED" | "COMPLETED" | "ON-TIME" | "DELAYED";
  pickupCity: string;
  dropCity: string;
  source: RouteLatLong;
  destination: RouteLatLong;
  completedHops: CompletedHop[];
  currentLocation: CurrentLocation;
  trackingId: string;
  driverTrip: CommonState["driverTrip"];
}
