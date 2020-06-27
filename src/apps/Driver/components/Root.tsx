import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../../components/LoginComponent";
import DriverCreateProfile from "./DriverCreateProfile";
import AuthenticatedFlow from "./AuthenticatedFlow";
import DriverPersonProfile from "./DriverPersonProfile";
import TripStartPage from "./TripStartPage";
import TripDetailsPage from "./TripDetailsPage";
import TripPage from "./TripPage";
import { DriverAppState } from "../reducers";
import { connect, ConnectedProps } from "react-redux";

import theme from "../../../theme";

interface Props {
  test: string;
}

const Stack = createStackNavigator();

const mapStateToProps = (state: DriverAppState) => ({
  userInfo: state.common.user.data
});

const connector = connect(
  mapStateToProps,
  {}
);

export interface RootStackParamList {
  CreateProfile: undefined;
  PersonProfile: undefined;
  TripStart: undefined;
  TripDetails: undefined;
}

class App extends Component<Props & ConnectedProps<typeof connector>> {
  render() {
    const userInfo = this.props.userInfo;
    const isLoggedIn = userInfo ? true : false;
    return (
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator>
            {!isLoggedIn && (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            )}
            {isLoggedIn && (
              <Stack.Screen
                name="Home"
                component={() => <AuthenticatedFlow userInfo={userInfo} />}
              />
            )}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}

export default connector(App);
