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
// eslint-disable-next-line @typescript-eslint/prefer-interface
export type RootStackParamList = {
  CreateProfile: undefined;
  PersonProfile: undefined;
  CompanyProfile: undefined;
  TripRequests: undefined;
  HomeMetrics: undefined;
  TripAccept: undefined;
};

const LSPPersonProfile = props => (
  <PersonProfile
    userInfo={{}}
    createProfileCallback={() => props.navigation.navigate("CompanyProfile")}
  />
);

const LSPCreateProfile = props => (
  <Flex>
    <CardComp
      cardHeading="STEP 1"
      taskHeading="Profile set up"
      imgSrc={personIcon}
      taskClickCallback={() => props.navigation.navigate("PersonProfile")}
    ></CardComp>
    <CardComp
      cardHeading="STEP 2"
      taskHeading="Company set up"
      imgSrc={personIcon}
      taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
    ></CardComp>
  </Flex>
);

const LSPCompanyProfile = props => (
  <CompanyProfile
    createCompanyCallback={() => props.navigation.navigate("HomeMetrics")}
  />
);

const TripRequests = props => (
  <TripList
    listingMode={ListingModes.PENDING_REQUESTS}
    from={AllApps.LSP}
    onRowClick={id => {
      //needs inplementation
    }}
  />
);

const HeaderButtons = () => (
  <Box pr={6} flexDirection="row">
    <Icon p={4} mx={10} source={notification} />
    <Icon p={4} source={search} />
  </Box>
);
const Stack = createStackNavigator<RootStackParamList>();

const AuthenticatedFlow = () => {
  return (
    <Stack.Navigator initialRouteName="HomeMetrics">
      <Stack.Screen
        name="CreateProfile"
        component={LSPCreateProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen
        name="PersonProfile"
        component={LSPPersonProfile}
        options={{ title: "Create Profile" }}
      />
      <Stack.Screen
        name="CompanyProfile"
        component={LSPCompanyProfile}
        options={{ title: "Company Profile" }}
      />
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
        name="TripAccept"
        component={TripAccept}
        options={{ title: "Truck Request", headerRight: HeaderButtons }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticatedFlow;
