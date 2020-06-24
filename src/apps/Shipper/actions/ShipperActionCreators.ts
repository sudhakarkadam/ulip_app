import actions from "./ShipperActions";
import api from "../api/ShipperApi";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../../../utils/actionCreator";

const ShipperActionCreators = {
  login: createAsyncAction(
    [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_ERROR],
    api.login
  ),
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default ShipperActionCreators;

export type ShipperActionObjectTypes<
  K extends keyof typeof ShipperActionCreators
> = GetActionTypes<Pick<typeof ShipperActionCreators, K>>;

export type ShipperAllObjectTypes = GetActionTypes<
  typeof ShipperActionCreators
>;
