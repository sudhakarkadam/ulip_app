import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "./reducers";

import { useEffect } from "react";
import { HeaderProvider } from "./api/Headers";
import UserPersona from "./components/UserPersona";
import ActionCreators from "./actions/ActionCreators";
import AuthenticatedFlowShipper from "./apps/Shipper/components/ShipperHome";
import AuthenticatedFlowLSP from "./apps/LSP/components/AuthenticatedFlow";
import AuthenticatedFlowDriver from "./apps/Driver/components/AuthenticatedFlow";
import SelectLanguage from "./components/SelectLanguage";
import { createDrawerNavigator } from "@react-navigation/drawer";

const AuthenticatedStack = createStackNavigator();
const NoLoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  commonConfig: state.appConfig.data
});
const {getAppConfigs}  = ActionCreators
const mapDispatchToProps = { getAppConfigs}
const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props {
  isLanguageSelected?: boolean;
  userPersona?: string;
}
const AuthenticatedStackNavigator: React.FC<Props> = ({
  isLanguageSelected,
  userPersona
}) => {
  return (
    <AuthenticatedStack.Navigator headerMode="none">
      <>
        {!isLanguageSelected && (
          <AuthenticatedStack.Screen
            name="LanguageSelect"
            options={{ headerShown: false }}
            component={SelectLanguage}
          ></AuthenticatedStack.Screen>
        )}
        {!userPersona && (
          <AuthenticatedStack.Screen
            name="UserPersona"
            component={UserPersona}
            options={{ headerShown: false }}
          />
        )}
        {userPersona === "shipper" && (
          <AuthenticatedStack.Screen
            name="Home"
            component={AuthenticatedFlowShipper}
          />
        )}
        {userPersona === "lsp" && (
          <AuthenticatedStack.Screen
            name="Home"
            component={AuthenticatedFlowLSP}
          />
        )}
        {userPersona === "driver" && (
          <AuthenticatedStack.Screen
            name="Home"
            component={AuthenticatedFlowDriver}
          />
        )}
      </>
    </AuthenticatedStack.Navigator>
  );
};
const NoLoginStackNavigator = () => {
  return (
    <NoLoginStack.Navigator>
      <NoLoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </NoLoginStack.Navigator>
  );
};
const DrawerNavigator: React.FC<Props> = ({
  isLanguageSelected,
  userPersona
}) => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home">
        {() => (
          <AuthenticatedStackNavigator
            isLanguageSelected={isLanguageSelected}
            userPersona={userPersona}
          />
        )}
      </Drawer.Screen>
      <Drawer.Screen name="Change Language">
        {({ navigation }) => (
          <SelectLanguage
            next={() => navigation.navigate("Home")}
          ></SelectLanguage>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const App: React.FC<ConnectedProps<typeof connector>> = props => {
  const isLoggedIn = props.userInfo.access_token ? true : false;
  const userPersona = props.userInfo.userPersona;
  const isLanguageSelected = props.userInfo.language;

  useEffect(() => {
    HeaderProvider.setToken("token");
    if(!props.commonConfig){
      props.getAppConfigs({});
    }
  }, [props.userInfo]);
  return (
    <NavigationContainer>
      {!isLoggedIn && <NoLoginStackNavigator />}
      {isLoggedIn && (
        <DrawerNavigator
          userPersona={userPersona}
          isLanguageSelected={isLanguageSelected}
        />
      )}
    </NavigationContainer>
  );
};

export default connector(App);
