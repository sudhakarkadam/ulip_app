import { LocationModel } from "./CommonModel";

export interface CreateTripRequestModel {
  business_id: number;
  delivery_location: LocationModel;
  good_type: string;
  lsp_id: number;
  pickup_date: {
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
  pickup_location: LocationModel;
  truck_type: "OPEN" | "CONTAINER" | "TRAILER";
  weight: number;
  weight_unit: string;
}

export interface LspDetailsObj {
  lsp_id: number;
  lsp_name: string;
}
export interface LspListResponse {
  lsp_list: LspDetailsObj[];
}
