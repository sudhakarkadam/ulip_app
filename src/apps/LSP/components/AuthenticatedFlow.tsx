import React, { useContext } from "react";
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack";
import { ToastAndroid } from "react-native";
import CompanyProfile from "../../../components/CompanyProfile";
import PersonProfile from "../../../components/PersonProfile";
import { Flex, HeaderOptions } from "../../../components/@styled/BaseElements";
import CardComp from "../../../components/CardComp";
const personIcon = require("../../../images/person-icon.png");
import LSPLanding from "./LSPLanding";

import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { I18nContext } from "../../../components/InternationalisationProvider";
import { PageContent, Page } from "../../../components/@styled/Page";
import { GetTripsResponse, PerosnaDetails } from "../../../models/CommonModel";
import { CommonState } from "../../../reducers";
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  TripRequests: { tripDetails?: GetTripsResponse };
  HomeMetrics: undefined;
  TripAcceptPage: { tripDetails: GetTripsResponse };
  TripDetails: { tripDetails: GetTripsResponse };
  TripTracking: { tripId: number };
};

type CreateProfileProps = StackScreenProps<RootStackParamList, "CreateProfile">;
type HomeMetricsProps = StackScreenProps<RootStackParamList, "HomeMetrics">;
type ProfileProps = StackScreenProps<RootStackParamList, "PersonProfile"> &
  StackScreenProps<RootStackParamList, "CompanyProfile">;

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});
const { saveCompanyProfile, savePersonalProfile } = ActionCreators;
const mapDispatchToProps = { saveCompanyProfile, savePersonalProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

const LSPPersonProfile = (
  props: CreateProfileProps & ConnectedProps<typeof connector>
) => (
  <PersonProfile
    userInfo={props.userInfo}
    createProfileCallback={async ({ name }) => {
      const { userInfo } = props;
      const phone = userInfo.phone_number || "";
      const loginId = userInfo.login_id || "";
      try {
        await props.savePersonalProfile({
          name,
          phone,
          loginId,
          persona: userInfo.userPersona
        });
        ToastAndroid.show(
          "Personal profile created successfully",
          ToastAndroid.SHORT
        );
        props.navigation.navigate("CreateProfile");
      } catch {
        ToastAndroid.show(
          "Error while creating profile. Please try again",
          ToastAndroid.SHORT
        );
      }
    }}
  />
);
const ConnectedLSPPersonProfile = connector(LSPPersonProfile);

const LSPCreateProfile = (
  props: ConnectedProps<typeof connector> & ProfileProps
) => {
  const { translate } = useContext(I18nContext);
  const profileCreated = props.userInfo.user_details.find(
    (role: PerosnaDetails) => role.profile.persona === "LSP"
  );
  const personVerified = profileCreated?.profile.name;
  const comapnyVerified = profileCreated?.business_details;
  return (
    <Page>
      <PageContent>
        <Flex>
          {!personVerified && (
            <CardComp
              cardHeading={translate("step.one")}
              taskHeading={translate("profile.setup")}
              clickLabel={translate("profile.start")}
              imgSrc={personIcon}
              taskClickCallback={() =>
                props.navigation.navigate("PersonProfile")
              }
            ></CardComp>
          )}
          <Flex mt={3} />
          {!comapnyVerified && (
            <CardComp
              cardHeading={translate("step.two")}
              taskHeading={translate("company.setup")}
              clickLabel={translate("profile.start")}
              imgSrc={personIcon}
              taskClickCallback={() =>
                props.navigation.navigate("CompanyProfile")
              }
              isDisable={personVerified ? false : true}
            ></CardComp>
          )}
        </Flex>
      </PageContent>
    </Page>
  );
};
const ConnectedLSPCreateProfile = connector(LSPCreateProfile);

const LSPCompanyProfile = (
  props: ConnectedProps<typeof connector> & HomeMetricsProps
) => {
  const userId = props.userInfo.user_details.find(
    (role: PerosnaDetails) =>
      role.profile.persona === props.userInfo.userPersona
  );
  return (
    <CompanyProfile
      createCompanyCallback={async ({
        name,
        regNumber,
        address,
        city,
        state,
        postalCode,
        lat,
        lng
      }) => {
        try {
          await props.saveCompanyProfile({
            name,
            location: {
              address,
              city,
              country: "India",
              map_ref: {},
              latitude: lat,
              longitude: lng,
              name,
              postal_code: parseInt(postalCode, 10),
              state
            },
            userId: userId ? userId.profile.user_id : "",
            business_type: "LSP",
            gst_in: regNumber
          });
          props.navigation.navigate("HomeMetrics");
        } catch ({
          payload: {
            res: {
              response: { type, message }
            }
          }
        }) {
          if (type === "REGISTERATION_NUMBER_ALREADY_EXISTS") {
            ToastAndroid.show(message, ToastAndroid.LONG);
          } else {
            ToastAndroid.show(
              "Company profile created successfully",
              ToastAndroid.SHORT
            );
          }
        }
      }}
    />
  );
};
const ConnectedCompanyProfile = connector(LSPCompanyProfile);

const Stack = createStackNavigator<RootStackParamList>();
const AuthenticatedFlow = (props: ConnectedProps<typeof connector>) => {
  const profileCreated = props.userInfo.user_details.find(
    (role: PerosnaDetails) => role.profile.persona === "LSP"
  );
  const personVerified = profileCreated?.profile.name;
  const comapnyVerified = profileCreated?.business_details;
  const { translate } = useContext(I18nContext);
  return (
    <>
      {personVerified && comapnyVerified ? (
        <Stack.Navigator initialRouteName={"HomeMetrics"} headerMode={"none"}>
          <Stack.Screen name="HomeMetrics" component={LSPLanding} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={"CreateProfile"}
          screenOptions={HeaderOptions}
        >
          <Stack.Screen
            name="CreateProfile"
            component={ConnectedLSPCreateProfile}
            options={{ title: translate("create.profile") }}
          />
          <Stack.Screen
            name="PersonProfile"
            component={ConnectedLSPPersonProfile}
            options={{ title: translate("create.profile") }}
          />
          <Stack.Screen
            name="CompanyProfile"
            component={ConnectedCompanyProfile}
            options={{ title: translate("create.profile") }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default connector(AuthenticatedFlow);
