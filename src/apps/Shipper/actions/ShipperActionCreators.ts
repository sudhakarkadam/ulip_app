import actions from "./ShipperActions";
import api from "../api/ShipperApi";
import {
  GetActionTypes,
  createAsyncAction
} from "../../../utils/actionCreator";

const ShipperActionCreators = {
  createTrip: createAsyncAction(
    [
      actions.CREATE_TRIP_REQUEST,
      actions.CREATE_TRIP_SUCCESS,
      actions.CREATE_TRIP_ERROR
    ],
    api.createTrip
  )
};

export default ShipperActionCreators;

export type ShipperActionObjectTypes<
  K extends keyof typeof ShipperActionCreators
> = GetActionTypes<Pick<typeof ShipperActionCreators, K>>;

export type ShipperAllObjectTypes = GetActionTypes<
  typeof ShipperActionCreators
>;
