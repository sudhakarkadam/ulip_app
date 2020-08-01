import React, { useContext } from "react";
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack";
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
        props.navigation.navigate("CreateProfile");
      } catch {
        console.log("error");
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
              cardHeading="STEP 1"
              taskHeading={translate("profile.setup")}
              imgSrc={personIcon}
              taskClickCallback={() =>
                props.navigation.navigate("PersonProfile")
              }
            ></CardComp>
          )}
          <Flex mt={3} />
          {!comapnyVerified && (
            <CardComp
              cardHeading="STEP 2"
              taskHeading={translate("company.setup")}
              imgSrc={personIcon}
              taskClickCallback={() =>
                props.navigation.navigate("CompanyProfile")
              }
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
  const location = {
    address: "Sector 4, Rohini",
    city: "Delhi",
    country: "loc_1",
    map_ref: {},
    name: "Delhi",
    postal_code: 560035,
    state: "Delhi"
  };
  return (
    <CompanyProfile
      createCompanyCallback={async ({ name, regNumber }) => {
        try {
          await props.saveCompanyProfile({
            name,
            location: { ...location },
            userId: userId ? userId.profile.user_id : "",
            business_type: "LSP",
            gst_in: regNumber
          });
          props.navigation.navigate("HomeMetrics");
        } catch {
          console.log("error");
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
            options={{ title: "Create Profile" }}
          />
          <Stack.Screen
            name="PersonProfile"
            component={ConnectedLSPPersonProfile}
            options={{ title: "Create Profile" }}
          />
          <Stack.Screen
            name="CompanyProfile"
            component={ConnectedCompanyProfile}
            options={{ title: "Company Profile" }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default connector(AuthenticatedFlow);
