import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../../components/LoginComponent";
import AuthenticatedFlow from "./AuthenticatedFlow";
import { CommonState } from "../../../reducers";
import { connect, ConnectedProps } from "react-redux";

import theme from "../../../theme";
import SplashScreen from "../../../components/SplashScreen";

interface Props {
  test: string;
}

// eslint-disable-next-line @typescript-eslint/prefer-interface
type DriverRootStack = {
  Login: undefined;
  Home: undefined;
};
const Stack = createStackNavigator<DriverRootStack>();

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});

const connector = connect(mapStateToProps, {});

export interface RootStackParamList {
  CreateProfile: undefined;
  PersonProfile: undefined;
  TripStart: undefined;
  TripDetails: undefined;
}

const App: React.FC<Props & ConnectedProps<typeof connector>> = props => {
  const [showSplash, toggleSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => toggleSplash(!showSplash), 2000);
  }, []);

  if (showSplash) return <SplashScreen></SplashScreen>;
  const userInfo = props.userInfo;
  const isLoggedIn = userInfo ? true : false;
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator headerMode={"none"}>
          {!isLoggedIn && (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
          {isLoggedIn && (
            <Stack.Screen name="Home">
              {() => <AuthenticatedFlow userInfo={userInfo} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default connector(App);
