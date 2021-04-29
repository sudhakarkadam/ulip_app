import { AllObjectTypes } from "../actions/ActionCreators";

export interface LoaderReducer {
  data: number;
}

const INITIAL_STATE: LoaderReducer = {
  data: 0
};

type TAction = AllObjectTypes;

export default function LoaderReducer(
  state: LoaderReducer = INITIAL_STATE,
  action: TAction
): LoaderReducer {
  if (action.type.endsWith("_REQUEST")) {
    return { ...state, data: state.data + 1 };
  } else if (
    action.type.endsWith("_SUCCESS") ||
    action.type.endsWith("_ERROR")
  ) {
    return { ...state, data: state.data - 1 };
  }
  return state;
}
