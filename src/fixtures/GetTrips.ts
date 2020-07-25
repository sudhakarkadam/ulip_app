import {
  GetTripsResponse,
  RequestStatus,
  TruckType
} from "../models/CommonModel";

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
    status: RequestStatus.IN_PROGRESS,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER,
    trip: {
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER
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
    status: RequestStatus.REJECTED,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.CONTAINER
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.OPEN
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.OPEN
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
    status: RequestStatus.CREATED,
    legal_name: "ssd",
    truck_type_preference: TruckType.OPEN
  }
];
