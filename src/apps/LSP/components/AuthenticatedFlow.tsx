import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CompanyProfile from "../../../components/CompanyProfile";
import { TripList, ListingModes } from "../../../components/TripListing";
import PersonProfile from "../../../components/PersonProfile";
import { Flex, Icon, Box } from "../../../components/@styled/BaseElements";
import CardComp from "../../../components/CardComp";
import { AllApps } from "../../../models/CommonModel";
const personIcon = require("../../../icons/person-icon.png");
import search from "../../../images/loupe.png";
import notification from "../../../images/notification.png";
import TripAccept from "./TripAccept";
import Hometabs from "./HomeTabs";
import { ReducerState } from "../store";
import { connect } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
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
      const phone = userInfo ? userInfo.user_details.phone_number : "";
      const userId = userInfo ? userInfo.user_details.user_id : 0;
      try {
        await props.savePersonalProfile({ name, phone, userId });
        props.navigation.navigate("CreateProfile");
      } catch {
        console.log("error");
      }
    }}
  />
);
const ConnectedLSPPersonProfile = connector(LSPPersonProfile);

const LSPCreateProfile = props => {
  const { userInfo } = props;
  const personVerified = userInfo?.user_details?.name;
  const comapnyVerified = userInfo?.business_details;
  return (
    <Flex>
      {!personVerified && (
        <CardComp
          cardHeading="STEP 1"
          taskHeading="Profile set up"
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("PersonProfile")}
        ></CardComp>
      )}
      <Flex mt={3} />
      {!comapnyVerified && (
        <CardComp
          cardHeading="STEP 2"
          taskHeading="Company set up"
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
        ></CardComp>
      )}
    </Flex>
  );
};
const ConnectedLSPCreateProfile = connector(LSPCreateProfile);

const LSPCompanyProfile = props => {
  const userId = props.userInfo?.user_details.user_id || 0;
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
            regNumber,
            role: "LSP",
            location,
            userId
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

const TripRequests = props => (
  <TripList
    listingMode={ListingModes.PENDING_REQUESTS}
    from={AllApps.LSP}
    onRowClick={
      () => props.navigation.navigate("TripAcceptPage")
      // id => {
      //needs inplementation
      // }
    }
  />
);

const TripAcceptPage = props => (
  <TripAccept onAction={() => props.navigation.goBack()} />
);

const HeaderButtons = () => (
  <Box pr={6} flexDirection="row">
    <Icon p={4} mx={10} source={notification} />
    <Icon p={4} source={search} />
  </Box>
);
const Stack = createStackNavigator<RootStackParamList>();
const AuthenticatedFlow = props => {
  const { userInfo } = props;
  const profileCreated =
    userInfo && userInfo.user_details.name && userInfo.business_details;
  return (
    <>
      {profileCreated ? (
        <Stack.Navigator initialRouteName={"HomeMetrics"}>
          <Stack.Screen
            name="TripRequests"
            component={TripRequests}
            options={{ title: "Home", headerRight: HeaderButtons }}
          />
          <Stack.Screen
            name="HomeMetrics"
            component={Hometabs}
            options={{ title: "Home", headerRight: HeaderButtons }}
          />
          <Stack.Screen
            name="TripAcceptPage"
            component={TripAcceptPage}
            options={{ title: "Truck Request", headerRight: HeaderButtons }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName={"CreateProfile"}>
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
