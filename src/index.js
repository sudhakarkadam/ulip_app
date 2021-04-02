import React from "react";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import App from "./Root";
import store, { persistor } from "./store";
import { ThemeProvider } from "styled-components/native";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "./components/SplashScreen";
import { InternationalisationProvider } from "./components/InternationalisationProvider";
import theme from "./theme";

if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}

const ConnectedApp = () => {
  return (
    <InternationalisationProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <PersistGate loading={<SplashScreen />} persistor={persistor}>
            <App />
          </PersistGate>
        </ThemeProvider>
      </Provider>
    </InternationalisationProvider>
  );
};

AppRegistry.registerComponent("ULIP", () => ConnectedApp);
