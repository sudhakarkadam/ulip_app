import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompanyProfile from "../../../components/CompanyProfile";
import PersonProfile from "../../../components/PersonProfile";
import { Flex, HeaderOptions } from "../../../components/@styled/BaseElements";
import CardComp from "../../../components/CardComp";
const personIcon = require("../../../icons/person-icon.png");
import Hometabs from "./HomeTabs";
import { ReducerState } from "../store";
import { connect } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { I18nContext } from "../../../components/InternationalisationProvider";
import { PageContent, Page } from "../../../components/@styled/Page";
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  TripRequests: undefined;
  HomeMetrics: undefined;
  TripAcceptPage: undefined;
};
const mapStateToProps = (state: ReducerState) => ({
  userInfo: state.user.data
});
const { saveCompanyProfile, savePersonalProfile } = ActionCreators;
const mapDispatchToProps = { saveCompanyProfile, savePersonalProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

const LSPPersonProfile = props => (
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

const LSPCreateProfile = props => {
  const { translate } = useContext(I18nContext);
  const profileCreated = props.userInfo.user_details.find(
    role => role.profile.persona === "LSP"
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

const LSPCompanyProfile = props => {
  const userId = props.userInfo.user_details.find(
    role => role.profile.persona.toLowerCase() === props.userInfo.userPersona
  );
  const location = {
    address: "Sector 4, Rohini",
    city: "Delhi",
    location_code: "loc_1",
    map_ref: "ref",
    name: "Delhi",
    postal_code: "560035",
    state: "Delhi"
  };
  return (
    <CompanyProfile
      createCompanyCallback={async ({ name, regNumber }) => {
        try {
          await props.saveCompanyProfile({
            name,
            location: { ...location, gst_in: regNumber },
            userId: userId ? userId.profile.user_id : "",
            business_type: "LSP"
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
const AuthenticatedFlow = props => {
  const { userInfo } = props;
  const profileCreated =
    userInfo && userInfo.user_details.name && userInfo.business_details;
  return (
    <>
      {profileCreated ? (
        <Stack.Navigator initialRouteName={"HomeMetrics"} headerMode={"none"}>
          <Stack.Screen name="HomeMetrics" component={Hometabs} />
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
