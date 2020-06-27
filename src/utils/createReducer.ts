import {
  asyncStatusTypes,
  INIT,
  LOADING,
  SUCCESS,
  ERROR,
  IAction
} from "./actionCreator";

export interface IState<T> {
  asyncStatus: asyncStatusTypes;
  data: T | null;
  error: any;
}

type TransformType<X, Y> = (args: X) => Y;

function createReducer<
  T1 extends string,
  T2 extends string,
  T3 extends string,
  U,
  V,
  R = V,
  T4 extends string = ""
>(
  [RequestAction, SuccessAction, ErrorAction]: [T1, T2, T3],
  transformer?: TransformType<V, R>,
  ResetAction?: T4
) {
  const initialState: IState<R> = {
    asyncStatus: INIT,
    data: null,
    error: null
  };
  return (
    state: IState<R> = initialState,
    action: IAction<T1 | T2 | T3 | T4, U, V>
  ): IState<R> => {
    const fn = transformer;
    switch (action.type) {
      case RequestAction:
        return { ...state, asyncStatus: LOADING };
      case SuccessAction:
        return {
          asyncStatus: SUCCESS,
          data: ((fn && fn(action.payload.res)) || action.payload.res) as R,
          error: null
        };
      case ErrorAction:
        return { ...state, asyncStatus: ERROR, error: action.payload.res };
      case ResetAction:
        return initialState;
      default:
        return state;
    }
  };
}
export default createReducer;
