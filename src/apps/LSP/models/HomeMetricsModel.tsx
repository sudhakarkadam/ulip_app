export default interface Metrics {
  transport_service_request: {
    created: number;
    in_progress: number;
    pending_pod: number;
  };
  trucks: {
    type1: number;
    type2: number;
  };
  drivers: number;
}
