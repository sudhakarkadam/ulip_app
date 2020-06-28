import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import { ShipperAppState } from "./reducers";
import theme from "../../theme";
import ShipperHome from "./components/ShipperHome";

interface Props {
  test: string;
}

const Stack = createStackNavigator();
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const connector = connect(mapStateToProps, {});

class App extends Component<Props & ConnectedProps<typeof connector>> {
  render() {
    const isLoggedIn = this.props.userInfo ? true : false;
    return (
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator headerMode="none">
            {!isLoggedIn && (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
            )}
            {isLoggedIn && <Stack.Screen name="Home" component={ShipperHome} />}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}

export default connector(App);
