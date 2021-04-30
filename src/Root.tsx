import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "./components/LoginComponent";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "./reducers";

import { HeaderProvider } from "./api/Headers";
import UserPersona from "./components/UserPersona";
import ActionCreators from "./actions/ActionCreators";
import AuthenticatedFlowShipper from "./apps/Shipper/components/ShipperHome";
import AuthenticatedFlowLSP from "./apps/LSP/components/AuthenticatedFlow";
import AuthenticatedFlowDriver from "./apps/Driver/components/AuthenticatedFlow";
import SelectLanguage from "./components/SelectLanguage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { UserPersonaTypes } from "./models/CommonModel";
import BlockScreenLoader from "./components/BlockScreenLoader";

import { I18nContext } from "./components/InternationalisationProvider";

const MapmyIndia = require("mmi-widget");

const AuthenticatedStack = createStackNavigator();
const NoLoginStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  commonConfig: state.appConfig.data,
  activeActionsCount: state.activeActions.data
});
const mapDispatchToProps = { getAppConfigs: ActionCreators.getAppConfigs };
const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props {
  isLanguageSelected: boolean;
  userPersona?: UserPersonaTypes;
}
const AuthenticatedStackNavigator: React.FC<Props> = ({
  isLanguageSelected,
  userPersona
}) => {
  useEffect(() => {
    const trackingInitialize = MapmyIndia.default.initialize;
    trackingInitialize();
  }, []);
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
        {userPersona === "SHIPPER" && (
          <AuthenticatedStack.Screen
            name="Home"
            component={AuthenticatedFlowShipper}
          />
        )}
        {userPersona === "LSP" && (
          <AuthenticatedStack.Screen
            name="Home"
            component={AuthenticatedFlowLSP}
          />
        )}
        {userPersona === "DRIVER" && (
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
class DrawerNavigator extends React.Component<
  Props & ConnectedProps<typeof connector>
> {
  componentWillMount() {
    const { getAppConfigs, commonConfig, userInfo } = this.props;
    HeaderProvider.setToken(userInfo.access_token);
    if (!commonConfig) {
      getAppConfigs({});
    }
  }
  static contextType = I18nContext;
  context!: React.ContextType<typeof I18nContext>;
  render() {
    const { isLanguageSelected, userPersona } = this.props;
    const { translate } = this.context;
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" options={{ title: translate("home") }}>
          {() => (
            <AuthenticatedStackNavigator
              isLanguageSelected={isLanguageSelected}
              userPersona={userPersona}
            />
          )}
        </Drawer.Screen>
        <Drawer.Screen
          name="Change Language"
          options={{ title: translate("change.language") }}
        >
          {({ navigation }) => (
            <SelectLanguage
              next={() => navigation.navigate("Home")}
            ></SelectLanguage>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    );
  }
}

const ConnectedDrawer = connector(DrawerNavigator);

const App: React.FC<ConnectedProps<typeof connector>> = props => {
  const isLoggedIn = props.userInfo.access_token ? true : false;
  const userPersona = props.userInfo.userPersona;
  const isLanguageSelected = props.userInfo.language ? true : false;
  return (
    <NavigationContainer>
      {props.activeActionsCount > 0 && <BlockScreenLoader />}
      {!isLoggedIn && <NoLoginStackNavigator />}
      {isLoggedIn && (
        <ConnectedDrawer
          userPersona={userPersona}
          isLanguageSelected={isLanguageSelected}
        />
      )}
    </NavigationContainer>
  );
};

export default connector(App);
