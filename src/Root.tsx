import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "./components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "./reducers";
import theme from "./theme";
import { useEffect } from "react";
import { HeaderProvider } from "./api/Headers";
import UserPersona from "./components/UserPersona";
import AuthenticatedFlowShipper from "./apps/Shipper/components/ShipperHome";
import AuthenticatedFlowLSP from "./apps/LSP/components/AuthenticatedFlow";
import AuthenticatedFlowDriver from "./apps/Driver/components/AuthenticatedFlow";
import TripTracking from "./apps/Shipper/components/TripTracking";

const MapmyIndia = require("mmi-widget");

interface Props {
  test: string;
}

const Stack = createStackNavigator();
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});
const connector = connect(mapStateToProps, {});

const App: React.FC<Props & ConnectedProps<typeof connector>> = props => {
  const isLoggedIn = props.userInfo ? true : false;
  const userPersona = props.userInfo?.userPersona;
  useEffect(() => {
    HeaderProvider.setToken("token");
    const test = MapmyIndia;
    const trackingInitialize = MapmyIndia.default.initialize;
    trackingInitialize();
  }, [props.userInfo]);
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator headerMode="none">
          {!isLoggedIn && (
            <Stack.Screen
              name="Login"
              component={TripTracking}
              options={{ headerShown: false }}
            />
          )}
          {isLoggedIn && (
            <>
              {!userPersona && (
                <Stack.Screen
                  name="UserPersona"
                  component={UserPersona}
                  options={{ headerShown: false }}
                />
              )}
              {userPersona === "shipper" && (
                <Stack.Screen
                  name="Home"
                  component={AuthenticatedFlowShipper}
                />
              )}
              {userPersona === "lsp" && (
                <Stack.Screen name="Home" component={AuthenticatedFlowLSP} />
              )}
              {userPersona === "driver" && (
                <Stack.Screen name="Home" component={AuthenticatedFlowDriver} />
              )}
            </>
          )}
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default connector(App);
