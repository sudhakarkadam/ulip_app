import React, { Component } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../components/LoginComponent";
import AuthenticatedFlow from "./components/AuthenticatedFlow";

import store from "./store";
import theme from "../../theme";

interface Props {
  test: string;
}

const Stack = createStackNavigator();

export default class App extends Component<Props> {
  render() {
    const isLoggedIn = true;
    return (
      <NavigationContainer>
        <Provider store={store}>
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
                  name="AfterAuthFlow"
                  component={AuthenticatedFlow}
                />
              )}
            </Stack.Navigator>
          </ThemeProvider>
        </Provider>
      </NavigationContainer>
    );
  }
}
