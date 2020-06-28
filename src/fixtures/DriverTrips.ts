import { DriverTrips } from "../apps/Driver/models/DriverTrips";

export const driverTrips: DriverTrips = [
  {
    id: 6,
    pickUp_location: {
      address: "",
      city: "Bangalore",
      state: "Karnataka"
    },
    delivery_location: {
      address: "",
      city: "Mumbai",
      state: "Karnataka"
    },
    pickup_date: "2020-06-28T17:38:35.000+0000",
    good_type: "rice",
    weight: 120,
    weight_unit: "ton",
    status: "ACCEPTED",
    truck_type_preference: "OPEN",
    trip: {
      id: 5,
      status: "TRIP_STARTED",
      eta: "2020-06-27T21:05:53.000+0000",
      driver_name: "driver1-ph",
      truck_name: null,
      truck_type: "OPEN",
      delay: false,
      documents: []
    }
  }
];
