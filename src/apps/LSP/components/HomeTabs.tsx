/* eslint-disable react/display-name */
import React from "react";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import HomeMetrics from "./HomeMetrics";
import Trips from "./Trips";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import UlipBottomTab from "../../../components/UlipBottomTab";
import TripAccept from "./TripAccept";
import { Box, HeaderOptions } from "../../../components/@styled/BaseElements";
import Search from "../../../images/search.svg";
import Notification from "../../../images/notification.svg";
import { createStackNavigator } from "@react-navigation/stack";
import TripDetails from "../../../components/TripDetails";
import TripTracking from "../../../components/TripTracking";
import AccountsPage from "../../../components/AccountsPage";
import { Page, PageContent } from "../../../components/@styled/Page";

const Stack = createStackNavigator();
const HomeMetricsComponent = props => (
  <HomeMetrics onRequestClick={() => props.navigation.push("TripRequests")} />
);
const History = props => (
  <Page>
    <PageContent>
      <TripList
        listingMode={ListingModes.COMPLETED}
        from={AllApps.LSP}
        onRowClick={(_id, item) =>
          props.navigation.push("TripDetails", { tripDetails: item })
        }
      />
    </PageContent>
  </Page>
);
const TripRequests = props => (
  <Page>
    <PageContent>
      <TripList
        listingMode={ListingModes.PENDING_REQUESTS}
        from={AllApps.LSP}
        onRowClick={(_id, item) =>
          props.navigation.push("TripAcceptPage", { tripDetails: item })
        }
      />
    </PageContent>
  </Page>
);
const TripAcceptPage = props => (
  <Page>
    <PageContent>
      <TripAccept
        onAction={() => props.navigation.navigate("TripRequests")}
        tripDetails={props.route.params.tripDetails}
      />
    </PageContent>
  </Page>
);
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
const LSPTripDetails = props => {
  const { tripDetails } = props.route.params;
  const tripData = tripDetails as GetTripsResponse;
  return (
    <Page>
      <PageContent>
        <TripDetails
          documents={tripData.trip.documents}
          id={tripData.id as any}
          pickupDateString={tripData.pickup_date as any}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight as any}
          truckUnit={tripData.weight_unit}
          lspProvider={tripData.legal_name}
          places={
            [
              {
                name: tripData.pickUp_location.city,
                ...tripData.pickUp_location
              },
              {
                name: tripData.delivery_location.city,
                ...tripData.delivery_location
              }
            ] as any
          }
        />
      </PageContent>
    </Page>
  );
};
const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"HomeMetricsComponent"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="TripRequests"
        component={TripRequests}
        options={{ title: "Home", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="HomeMetricsComponent"
        component={HomeMetricsComponent}
        options={{ title: "Home", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="TripAcceptPage"
        component={TripAcceptPage}
        options={{ title: "Truck Request", headerRight: HeaderButtons }}
      />
    </Stack.Navigator>
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

const Hometabs = () => {
  return <UlipBottomTab tabs={tabs} />;
};

export default Hometabs;
