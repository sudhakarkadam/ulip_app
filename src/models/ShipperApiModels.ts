export interface CreateTripRequestModel {
  goods_segment: string;
  pickup_request_time: string | number;
  truck_type_preference: string;
  lsp_business_id: string;
  source_business_site_id: string;
  destination_business_site_id: string;
}

export interface LspDetailsObj {
  business_id: number;
  legal_name: string;
}
export interface LspListResponse {
  lsp_list: LspDetailsObj[];
}
