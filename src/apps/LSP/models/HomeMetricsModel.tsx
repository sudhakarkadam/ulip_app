import { RequestStatus, TruckType } from "../../../models/CommonModel";

export default interface Metrics {
  transport_service_request: {
    [RequestStatus.ACCEPTED]: number;
    [RequestStatus.COMPLETED]: number;
    [RequestStatus.CREATED]: number;
    [RequestStatus.IN_PROGRESS]: number;
    [RequestStatus.PENDING_POD]: number;
    [RequestStatus.REJECTED]: number;
  };
  trucks: {
    [TruckType.CONTAINER]: number;
    [TruckType.OPEN]: number;
    [TruckType.TRAILOR]: number;
  };
  drivers: number;
}
