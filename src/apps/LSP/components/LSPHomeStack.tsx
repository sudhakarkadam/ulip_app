import React from "react";
import {
  createStackNavigator,
  StackScreenProps
} from "@react-navigation/stack";
import { HeaderOptions, Box } from "../../../components/@styled/BaseElements";
import TripAccept from "./TripAccept";
import HomeMetrics from "./HomeMetrics";
import { Page, PageContent } from "../../../components/@styled/Page";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import Search from "../../../images/search.svg";
import Notification from "../../../images/notification.svg";
import TruckSelect from "./TruckSelect";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type HomeStackParamList = {
  HomeMetricsComponent: undefined;
  TripRequests: object;
  TripAcceptPage: { tripDetails: GetTripsResponse };
  TruckSelect: undefined;
};

type HomeMetricsProps = StackScreenProps<
  HomeStackParamList,
  "HomeMetricsComponent"
>;

const HomeMetricsComponent = (props: HomeMetricsProps) => (
  <HomeMetrics
    onRequestClick={() => props.navigation.push("TripRequests", {})}
  />
);

type TripRequestsProps = StackScreenProps<HomeStackParamList, "TripRequests">;

const TripRequests = (props: TripRequestsProps) => (
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

// const TripAcceptPage = (props: TripAcceptProps) => (
//   <Page>
//     <PageContent>
//       {props.route.params?.tripDetails && (
//         <TripAccept
//           onAction={() => props.navigation.navigate("TripRequests", {})}
//           tripDetails={props.route.params?.tripDetails}
//         />
//       )}
//     </PageContent>
//   </Page>
// );

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

const Stack = createStackNavigator<HomeStackParamList>();

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
        component={TripAccept}
        options={{ title: "Truck Request", headerRight: HeaderButtons }}
      />
      <Stack.Screen
        name="TruckSelect"
        component={TruckSelect}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
