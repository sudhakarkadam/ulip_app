import {
  GetTripsResponse,
  RequestStatus,
  TruckType
} from "../models/CommonModel";

export const GetTripsResponseJson: GetTripsResponse[] = [
  {
    tsr_id: 1,
    source_location_details: {
      id: 1,
      code: "",
      address: "",
      city: "Bangalore",
      state: "",
      map_ref: { ref: "" },
      country: ""
    },
    destination_location_details: {
      id: 2,
      code: "",
      address: "",
      city: "Mumbai",
      state: "",
      map_ref: { ref: "" },
      country: ""
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    goods_segment: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: RequestStatus.IN_PROGRESS,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER,
    trip_details: {
      id: 1,
      status: RequestStatus.IN_PROGRESS,
      eta: "2020-06-26T11:35:51.000+0000",
      driver_name: "X",
      truck_type: TruckType.CONTAINER,
      delay: true,
      documents: []
    }
  },
  {
    tsr_id: 3,
    source_location_details: {
      id: 4,
      code: "",
      address: "",
      city: "Bangalore",
      state: "",
      map_ref: { ref: "" },
      country: ""
    },
    destination_location_details: {
      id: 5,
      code: "",
      address: "",
      city: "Mumbai",
      state: "",
      map_ref: { ref: "" },
      country: ""
    },
    pickup_date: "2020-06-26T18:30:00.000+0000",
    goods_segment: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: RequestStatus.IN_PROGRESS,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER
  }
];
