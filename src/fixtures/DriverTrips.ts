import { DriverTrips } from "../models/DriverTrips";

export const driverTrips: DriverTrips = [
  {
    tsr_id: 6,
    source_location_details: {
      id: 2,
      address: "",
      city: "Delhi",
      state: "",
      map_ref: { ref: "" },
      country: "",
      name: "Delhi",
      postal_code: 110085
    },
    destination_location_details: {
      id: 5,
      address: "",
      city: "Mumbai",
      state: "",
      map_ref: { ref: "" },
      country: "",
      name: "Mumbai",
      postal_code: 401501
    },
    pickup_request_time: 12212321312,
    weight: "120",
    weight_unit: "ton",
    trip_id: 4,
    trip_status: "COMPLETED",
    documents: [],
    tracking_request_id: "123",
    vehicle_details: {
      business_id: "string",
      device_id: "string",
      device_type: "string",
      truck_name: "Shreynik_truck",
      truck_number: "DL20HR2121",
      truck_type: "OPEN",
      tsp_id: "",
      vehicle_id: 12212
    }
  }
];
