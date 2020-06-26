import actions from "./DriverActions";
import api from "../api/DriverApi";

import {
  createAsyncAction,
  GetActionTypes,
  createAction
} from "../../../utils/actionCreator";

const DriverActionCreators = {
  login: createAsyncAction(
    [actions.LOGIN_REQUEST, actions.LOGIN_SUCCESS, actions.LOGIN_ERROR],
    api.login
  ),
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default DriverActionCreators;

export type DriverActionObjectTypes<
  K extends keyof typeof DriverActionCreators
> = GetActionTypes<Pick<typeof DriverActionCreators, K>>;

export type DriverAllObjectTypes = GetActionTypes<typeof DriverActionCreators>;
