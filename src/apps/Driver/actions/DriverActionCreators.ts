import actions from "./DriverActions";
import api from "../api/DriverApi";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../../../utils/actionCreator";

const DriverActionCreators = {
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default DriverActionCreators;

export type DriverActionObjectTypes<
  K extends keyof typeof DriverActionCreators
> = GetActionTypes<Pick<typeof DriverActionCreators, K>>;

export type DriverAllObjectTypes = GetActionTypes<typeof DriverActionCreators>;
