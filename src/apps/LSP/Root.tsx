import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../components/LoginComponent";
import AuthenticatedFlow from "./components/AuthenticatedFlow";

import theme from "../../theme";
import { ReducerState } from "./store";

const Stack = createStackNavigator();
const mapStateToProps = (state: ReducerState) => ({
  userInfo: state.user.data
});
const connector = connect(
  mapStateToProps,
  {}
);

class App extends Component<ConnectedProps<typeof connector>> {
  render() {
    const isLoggedIn = this.props.userInfo ? true : false;
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
              <Stack.Screen name="Home" component={AuthenticatedFlow} />
            )}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}
export default connector(App);
