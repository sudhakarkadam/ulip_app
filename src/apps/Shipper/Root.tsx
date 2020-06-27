import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "../../components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "./actions/ShipperActionCreators";
import { ShipperAppState } from "./reducers";
import theme from "../../theme";
import ShipperHome from "./components/ShipperHome";

interface Props {
  test: string;
}

const Stack = createStackNavigator();
const { verifyOtp } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { verifyOtp };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

class App extends Component<Props & ConnectedProps<typeof connector>> {
  render() {
    const isLoggedIn = this.props.userInfo ? true : false;
    return (
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <Stack.Navigator>
            {!isLoggedIn && (
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {() => <Login getUserInfo={() => this.props.verifyOtp({})} />}
              </Stack.Screen>
            )}
            {isLoggedIn && <Stack.Screen name="Home" component={ShipperHome} />}
          </Stack.Navigator>
        </ThemeProvider>
      </NavigationContainer>
    );
  }
}

export default connector(App);
