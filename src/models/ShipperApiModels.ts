import { LocationModel } from "./CommonModel";

export interface CreateTripRequestModel {
  destination_location_details: LocationModel;
  good_segment: string;
  lsp_business_id: string;
  pickup_request_time: {
    date: number;
    day?: number;
    hours?: number;
    minutes?: number;
    month?: number;
    nanos?: number;
    seconds?: number;
    time?: number;
    timezoneOffset?: number;
    year?: number;
  };
  source_location_details: LocationModel;
  truck_type_preference: "OPEN" | "CONTAINER" | "TRAILER";
  weight: number;
  weight_unit: string;
}

export interface LspDetailsObj {
  business_id: number;
  legal_name: string;
}
export interface LspListResponse {
  lsp_list: LspDetailsObj[];
}
