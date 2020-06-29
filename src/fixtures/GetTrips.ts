import { GetTripsResponse } from "../models/CommonModel";

export const GetTripsResponseJson: GetTripsResponse[] = [
  {
    id: 1,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "IN_PROGRESS",
    lsp_name: "ssd",
    truck_type_preference: "TRUCK",
    trip: {
      id: 1,
      status: "TRIP_STARTED",
      eta: "2020-06-26T11:35:51.000+0000",
      driver_name: "X",
      truck_name: null,
      truck_type: "TRUCK",
      delay: true,
      documents: []
    }
  },
  {
    id: 2,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "TRUCK"
  },
  {
    id: 3,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Delhi",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "REJECTED",
    lsp_name: "ssd",
    truck_type_preference: "TRUCK"
  },
  {
    id: 4,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "TRUCK"
  },
  {
    id: 5,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T18:30:00.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "TRUCK"
  },
  {
    id: 7,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Kolkata",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T20:45:57.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "OPEN"
  },
  {
    id: 8,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T20:45:57.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "OPEN"
  },
  {
    id: 9,
    pickUp_location: {
      id: null,
      code: null,
      address: null,
      city: "Bangalore",
      state: null,
      map_ref: null,
      country: null
    },
    delivery_location: {
      id: null,
      code: null,
      address: null,
      city: "Mumbai",
      state: null,
      map_ref: null,
      country: null
    },
    pickup_date: "2020-06-25T20:45:57.000+0000",
    good_type: "graim",
    weight: 23.9,
    weight_unit: "tonns",
    status: "CREATED",
    lsp_name: "ssd",
    truck_type_preference: "OPEN"
  }
];
