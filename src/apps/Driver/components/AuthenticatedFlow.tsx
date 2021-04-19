import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../../../components/PersonProfile";
import DriverCreateProfile from "./DriverCreateProfile";
import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import Hometabs from "./HomeTabs";
import { HeaderOptions } from "../../../components/@styled/BaseElements";

import SignatureUpload from "./SignatureUpload";
import PODDetails from "../../../components/PODDetails";
import { I18nContext } from "../../../components/InternationalisationProvider";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type DriverHomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  HomePage: undefined;
  HomeTabsPage: undefined;
  SignatureUpload: undefined;
  TripList: undefined;
  TripHome: { id: string };
  TripDetails: undefined;
  PODDetailsPage: undefined;
};

const { savePersonalProfile } = ActionCreators;

const Stack = createStackNavigator<DriverHomeStackParamList>();
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

type OwnProps = ConnectedProps<typeof connector>;

const AuthenticatedFlow = (props: OwnProps) => {
  const { translate } = useContext(I18nContext);
  const profileCreated = props.userInfo.user_details.find(
    role => role.profile.persona === "DRIVER"
  );

  return (
    <Stack.Navigator
      initialRouteName={profileCreated ? "HomeTabsPage" : "CreateProfile"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="CreateProfile"
        component={DriverCreateProfile}
        options={{ title: translate("home") }}
      />
      <Stack.Screen name="PersonProfile" options={{ title: translate("create.profile") }}>
        {navigationProps => (
          <PersonProfile
            userInfo={props.userInfo}
            createProfileCallback={async ({ name }) => {
              try {
                await props.savePersonalProfile({
                  name,
                  phone: props.userInfo.phone_number,
                  loginId: props.userInfo.login_id,
                  persona: props.userInfo.userPersona
                });
                navigationProps.navigation.navigate("HomeTabsPage");
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
      <Stack.Screen
        name="PODDetailsPage"
        component={PODDetails}
        options={{ title: translate("proof.of.delivery") }}
      />
      <Stack.Screen
        name="SignatureUpload"
        component={SignatureUpload}
        options={{ title: translate("add.signature") }}
      />
    </Stack.Navigator>
  );
};

export default connector(AuthenticatedFlow);
