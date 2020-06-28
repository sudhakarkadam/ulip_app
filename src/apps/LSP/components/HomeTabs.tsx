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
import { AllApps } from "../../../models/CommonModel";
import UlipBottomTab from "../../../components/UlipBottomTab";
import TripAccept from "./TripAccept";
import { Box, Icon } from "../../../components/@styled/BaseElements";
import search from "../../../images/loupe.png";
import notification from "../../../images/notification.png";
import { createStackNavigator } from "@react-navigation/stack";

const HomeMetricsComponent = props => (
  <HomeMetrics
    onRequestClick={() => props.navigation.navigate("TripRequests")}
  />
);
const History = () => (
  <TripList listingMode={ListingModes.COMPLETED} from={AllApps.LSP} />
);
const Stack = createStackNavigator();
const TripRequests = props => (
  <TripList
    listingMode={ListingModes.PENDING_REQUESTS}
    from={AllApps.LSP}
    onRowClick={(id, item) =>
      props.navigation.navigate("TripAcceptPage", { tripDetails: item })
    }
  />
);

const TripAcceptPage = props => (
  <TripAccept
    onAction={() => props.navigation.navigate("TripRequests")}
    tripDetails={props.route.params.tripDetails}
  />
);
const HeaderButtons = () => (
  <Box pr={6} flexDirection="row">
    <Icon p={4} mx={10} source={notification} />
    <Icon p={4} source={search} />
  </Box>
);
const Home = () => {
  return (
    <Stack.Navigator initialRouteName={"HomeMetricsComponent"}>
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
const tabs = [
  {
    name: "HomeStack",
    label: "HOME",
    component: Home,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "TripsStack",
    label: "TRIPS",
    component: Trips,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "HistoryStack",
    label: "HISTORY",
    component: History,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  }
];

const Hometabs = () => {
  return <UlipBottomTab tabs={tabs} />;
};

export default Hometabs;
