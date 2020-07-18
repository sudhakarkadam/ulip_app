import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";
import Login from "./components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "./reducers";
import theme from "./theme";
import ShipperHome from "./components/ShipperHome";
import { useEffect } from "react";
import { HeaderProvider } from "./api/Headers";

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
  useEffect(() => {
    HeaderProvider.setToken("token");
  }, [props.userInfo]);
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
};

export default connector(App);
