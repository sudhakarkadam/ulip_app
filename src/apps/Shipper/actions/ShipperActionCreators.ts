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
  ),
  getLspList: createAsyncAction(
    [
      actions.LSP_LIST_REQUEST,
      actions.LSP_LIST_SUCCESS,
      actions.LSP_LIST_ERROR
    ],
    api.getLspList
  )
};

export default ShipperActionCreators;

export type ShipperActionObjectTypes<
  K extends keyof typeof ShipperActionCreators
> = GetActionTypes<Pick<typeof ShipperActionCreators, K>>;

export type ShipperAllObjectTypes = GetActionTypes<
  typeof ShipperActionCreators
>;
