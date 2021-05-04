import { createStore, applyMiddleware, compose } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { persistReducer, persistStore } from "redux-persist";
import FilesystemStorage from "redux-persist-filesystem-storage";
import reducer, { CommonState } from "./reducers";
import { AllObjectTypes } from "./actions/ActionCreators";
import Reactotron from "./ReactotronConfig";

const persistConfig = {
  key: "root",
  storage: FilesystemStorage,
  timeout: undefined,
  whitelist: ["user"]
};

const persistedReducer = persistReducer(persistConfig, reducer);

const logger = require("redux-logger");

declare const __DEV__: boolean;

const middlewares = [thunk as ThunkMiddleware<CommonState, AllObjectTypes>];

if (__DEV__) {
  middlewares.push(logger.createLogger());
}

const store = createStore(
  persistedReducer,
  compose(applyMiddleware(...middlewares), Reactotron.createEnhancer!())
);

export const persistor = persistStore(store);

export default store;
