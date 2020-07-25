import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../../../components/PersonProfile";
import DriverCreateProfile from "./DriverCreateProfile";
import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import Hometabs from "./HomeTabs";
import { HeaderOptions } from "../../../components/@styled/BaseElements";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type DriverHomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  HomePage: undefined;
  HomeTabsPage: undefined;
};

const { savePersonalProfile } = ActionCreators;

const Stack = createStackNavigator<DriverHomeStackParamList>();
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

const AuthenticatedFlow: React.FC<ConnectedProps<typeof connector>> = props => {
  return (
    <Stack.Navigator
      initialRouteName={
        props.userInfo?.user_details.name ? "HomeTabsPage" : "CreateProfile"
      }
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="CreateProfile"
        component={DriverCreateProfile}
        options={{ title: "Home" }}
      />
      <Stack.Screen name="PersonProfile" options={{ title: "Create Profile" }}>
        {navigationProps => (
          <PersonProfile
            userInfo={props.userInfo}
            createProfileCallback={async ({ name }) => {
              try {
                await props.savePersonalProfile({
                  name,
                  phone: props.userInfo.phone_number,
                  loginId: props.userInfo.login_id,
                  persona: props.userInfo.userPersona || ""
                });
                navigationProps.navigation.navigate("TripHome");
              } catch {
                console.log("error");
              }
            }}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="HomeTabsPage"
        component={Hometabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default connector(AuthenticatedFlow);
