import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import App from "./Root";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "./components/SplashScreen";
import { InternationalisationProvider } from "./i18n/InternationalisationProvider";

const ConnectedApp = () => {
  return (
    <InternationalisationProvider>
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </InternationalisationProvider>
  );
};

AppRegistry.registerComponent("ULIP", () => ConnectedApp);
