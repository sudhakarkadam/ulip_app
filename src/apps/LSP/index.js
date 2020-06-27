import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import App from "./Root";
import store from "./store";

const ConnectedApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent("LSP", () => ConnectedApp);
