/* eslint-disable react/display-name */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Flex } from "../../../components/@styled/BaseElements";
import { PrimaryText, LightText } from "../../../components/@styled/Text";
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

const Tab = createBottomTabNavigator();
const Home = props => (
  <HomeMetrics
    onRequestClick={() => props.navigation.navigate("TripRequests")}
  />
);
const History = () => (
  <TripList listingMode={ListingModes.COMPLETED} from={AllApps.LSP} />
);
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
  return (
    <Tab.Navigator initialRouteName={tabs[0].name}>
      {tabs.map(tab => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <Flex pt={3}>
                  {focused ? <tab.activeImage /> : <tab.inActiveImage />}
                </Flex>
              );
            },
            tabBarLabel: ({ focused }) =>
              focused ? (
                <PrimaryText py={2}>{tab.label}</PrimaryText>
              ) : (
                <LightText pb={2}>{tab.label}</LightText>
              )
          }}
        ></Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default Hometabs;
