import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PersonProfile from "../../../components/PersonProfile";
import { TripHome } from "./TripHome";
import DriverCreateProfile from "./DriverCreateProfile";
import TripDetails from "./TripDetails";
import ActionCreators from "../../../actions/ActionCreators";

import { connect, ConnectedProps } from "react-redux";
import { UserDataModel } from "../../../models/CommonModel";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type DriverHomeStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  TripHome: undefined;
  TripDetails: undefined;
};

const { savePersonalProfile } = ActionCreators;

const Stack = createStackNavigator<DriverHomeStackParamList>();
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(
  null,
  mapDispatchToProps
);

const AuthenticatedFlow: React.FC<
  { userInfo: UserDataModel } & ConnectedProps<typeof connector>
> = props => {
  const { user_details } = props.userInfo;
  const hasProfile = !!user_details.name;
  return (
    <Stack.Navigator
      initialRouteName={hasProfile ? "TripHome" : "CreateProfile"}
    >
      {!hasProfile && (
        <>
          <Stack.Screen
            name="CreateProfile"
            component={DriverCreateProfile}
            options={{ title: "Create Profile" }}
          />
          <Stack.Screen name="PersonProfile">
            {navigationProps => (
              <PersonProfile
                userInfo={props.userInfo}
                createProfileCallback={async ({ name }) => {
                  try {
                    await props.savePersonalProfile({
                      name,
                      phone: user_details.phone_number,
                      userId: user_details.user_id
                    });
                    navigationProps.navigation.navigate("TripHome");
                  } catch {
                    console.log("error");
                  }
                }}
              />
            )}
          </Stack.Screen>
        </>
      )}
      <Stack.Screen name="TripHome" component={TripHome} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
    </Stack.Navigator>
  );
};

export default connector(AuthenticatedFlow);
