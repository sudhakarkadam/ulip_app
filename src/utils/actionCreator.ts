import { AnyAction, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { offline } from "@redux-offline/redux-offline";

type OfflineType = typeof offline;
type Config = OfflineType extends (args: Partial<infer P>) => unknown
  ? P
  : never;

type OfflineAction = Config["retry"] extends (a: infer A, b: any) => any
  ? A
  : never;

export interface ReducerInitialState<T, U = any> {
  asyncStatus: asyncStatusTypes;
  data: T;
  error?: U;
}
export interface IPayload<U, V> {
  readonly req: U;
  readonly res: V;
}
export interface IAction<T extends string, U, V>
  extends AnyAction,
    Partial<OfflineAction> {
  readonly type: T;
  readonly payload: IPayload<U, V>;
}

export const INIT = "INIT";
export const LOADING = "LOADING";
export const SERVER_PENDING = "SERVER_PENDING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export type asyncStatusTypes =
  | "INIT"
  | "LOADING"
  | "SERVER_PENDING"
  | "SUCCESS"
  | "ERROR";

interface ReducerLikeState {
  asyncStatus: asyncStatusTypes;
}

interface Payload<U, V> {
  readonly req: U;
  readonly res: V;
}

interface OfflineMeta {
  offline: OfflineAction["meta"]["offline"];
  transaction?: number;
}

export interface ReduxCustomAction<T extends string, U, V>
  extends AnyAction,
    Partial<OfflineAction> {
  readonly type: T;
  readonly payload: Payload<U, V>;
}

// action creator
export function createAction<T extends string, U, V, X extends OfflineMeta>(
  type: T,
  req: U,
  res: V,
  meta?: X
): ReduxCustomAction<T, U, V> {
  return {
    type,
    payload: {
      req,
      res
    },
    meta
  };
}

export type Api<U = any, V = any> = (args: U) => Promise<V>;

export type ThunkResult<R, S, A extends Action> = ThunkAction<
  R,
  S,
  undefined,
  A
>;
// A, B, C -> Action Types
// U -> request
// V -> success response
export function createAsyncAction<
  A extends string,
  B extends string,
  C extends string,
  S,
  U,
  V,
  X extends OfflineMeta
>(actions: [A, B, C], api: Api<U, V>, meta?: X) {
  return (
    apiArgs: U
  ): ThunkResult<
    Promise<ReduxCustomAction<B, U, V>>,
    S,
    | ReduxCustomAction<A, U, {}>
    | ReduxCustomAction<B, U, V>
    | ReduxCustomAction<C, U, any>
  > => async dispatch => {
    const [requestType, successType, errorType] = actions;
    dispatch(createAction<A, U, {}, X>(requestType, apiArgs, {}));
    try {
      const response = await Promise.resolve(api(apiArgs));
      const action = createAction<B, U, V, X>(
        successType,
        apiArgs,
        response,
        meta
      );
      dispatch(action);
      return action;
    } catch (err) {
      const action = createAction<C, U, any, X>(errorType, apiArgs, err);
      dispatch(action);
      return Promise.reject(action);
    }
  };
}

export type EnumerateValues<T> = T[keyof T];

export type GetActionTypes<T> = EnumerateValues<
  {
    [P in keyof T]: T[P] extends (
      args: any
    ) => ThunkAction<any, any, undefined, infer Q>
      ? Q
      : T[P] extends (args: any) => any
      ? ReturnType<T[P]>
      : never;
  }
>;

export type ReducerMappedState<T> = {
  [P in keyof T]: T[P] extends (...args: any[]) => infer R ? R : never;
};

export function isInit<T extends ReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === INIT) return true;
  return false;
}

export function isLoading<T extends ReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === LOADING) return true;
  return false;
}

export function isSuccess<T extends ReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === SUCCESS) return true;
  return false;
}

export function isError<T extends ReducerLikeState>(data: T) {
  if (!data) return false;
  if (data.asyncStatus === ERROR) return true;
  return false;
}
