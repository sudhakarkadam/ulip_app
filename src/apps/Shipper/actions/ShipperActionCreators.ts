import actions from "./ShipperActions";

import { GetActionTypes, createAction } from "../../../utils/actionCreator";

const ShipperActionCreators = {
  logout: () => createAction(actions.LOGOUT, {}, {})
};

export default ShipperActionCreators;

export type ShipperActionObjectTypes<
  K extends keyof typeof ShipperActionCreators
> = GetActionTypes<Pick<typeof ShipperActionCreators, K>>;

export type ShipperAllObjectTypes = GetActionTypes<
  typeof ShipperActionCreators
>;
