/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable react/display-name */
import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import Trips from "./Trips";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import UlipBottomTab from "../../../components/UlipBottomTab";

import { Box, HeaderOptions } from "../../../components/@styled/BaseElements";
import Search from "../../../images/search.svg";
import Notification from "../../../images/notification.svg";
import { createStackNavigator } from "@react-navigation/stack";
import TripDetails from "../../../components/TripDetails";
import TripTracking from "../../../components/TripTracking";
import AccountsPage from "../../../components/AccountsPage";
import TruckSelect from "./TruckSelect";
import { RootStackParamList } from "./AuthenticatedFlow";
import { Page, PageContent } from "../../../components/@styled/Page";
import HomeStack from "./LSPHomeStack";
import { useIsFocused } from "@react-navigation/native";

type HistoryProps = StackScreenProps<RootStackParamList, "TripDetails">;

const HeaderButtons = () => (
  <Box pr={6} flexDirection="row">
    <Box mr={7}>
      <Notification />
    </Box>
    <Box mx={3}>
      <Search />
    </Box>
  </Box>
);

const Stack = createStackNavigator();
const History = (props: HistoryProps) => (
  <Page>
    <PageContent>
      <TripList
        listingMode={ListingModes.COMPLETED}
        from={AllApps.LSP}
        onRowClick={(_id, item) =>
          props.navigation.push("TripDetails", { tripDetails: item })
        }
        focused={useIsFocused()}
      />
    </PageContent>
  </Page>
);
const LSPTripDetails = (props: HistoryProps) => {
  const { tripDetails } = props.route.params;
  const tripData = tripDetails as GetTripsResponse;
  return (
    <Page>
      <PageContent>
        <TripDetails
          documents={tripData.trip_details?.documents}
          id={tripData.tsr_id as any}
          pickupDateString={tripData.pickup_date as any}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight as any}
          truckUnit={tripData.weight_unit}
          lspProvider={tripData.legal_name}
          places={
            [
              {
                name: tripData.source_location_details.city,
                ...tripData.source_location_details
              },
              {
                name: tripData.destination_location_details.city,
                ...tripData.destination_location_details
              }
            ] as any
          }
        />
      </PageContent>
    </Page>
  );
};

const TripStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Trips"} screenOptions={HeaderOptions}>
      <Stack.Screen
        name="Trips"
        component={Trips}
        options={{ title: "Trips", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="TripDetails"
        component={LSPTripDetails}
        options={{ title: "Trip", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="TripTracking"
        component={TripTracking}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};
const HistoryStack = () => {
  return (
    <Stack.Navigator initialRouteName={"History"} screenOptions={HeaderOptions}>
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: "History", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="TripDetails"
        component={LSPTripDetails}
        options={{ title: "Trip", headerRight: HeaderButtons }}
      />
    </Stack.Navigator>
  );
};

const AccountsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"AccountsPage"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="AccountsPage" options={{ title: "Accounts" }}>
        {() => <AccountsPage persona={"lsp"} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const tabs = [
  {
    name: "HomeStack",
    label: "HOME",
    component: HomeStack,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "TripsStack",
    label: "TRIPS",
    component: TripStack,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "HistoryStack",
    label: "HISTORY",
    component: HistoryStack,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  },
  {
    name: "Account",
    label: "ACCOUNT",
    component: AccountsStack,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  }
];

export type LSPAuthenticatedStackParamList = {
  MainBottomTab: undefined;
  TruckSelect: undefined;
};

const MainStack = createStackNavigator<LSPAuthenticatedStackParamList>();

const MainBottomTab: React.FC = () => {
  return <UlipBottomTab tabs={tabs}></UlipBottomTab>;
};

const LSPLanding = () => {
  return (
    <MainStack.Navigator initialRouteName="MainBottomTab" headerMode="none">
      <MainStack.Screen
        name="MainBottomTab"
        component={MainBottomTab}
      ></MainStack.Screen>
      <MainStack.Screen
        name="TruckSelect"
        component={TruckSelect}
      ></MainStack.Screen>
    </MainStack.Navigator>
  );
};

export default LSPLanding;