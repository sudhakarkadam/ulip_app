/* eslint-disable react/display-name */
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Flex } from "../../../components/@styled/BaseElements";
import { PrimaryText, LightText } from "../../../components/@styled/Text";
import HomeStack from "./HomeStack";
import InTransitStack from "./InTransitStack";
import HistroyListing from "./HistoryListing";

import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: "HomeStack",
    label: "HOME",
    component: HomeStack,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "InTransitStack",
    label: "IN-TRANSIT",
    component: InTransitStack,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "HistoryStack",
    label: "HISTORY",
    component: HistroyListing,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  }
];

const ShipperHome = () => {
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
                <Flex marginTop={3}>
                  {focused ? <tab.activeImage /> : <tab.inActiveImage />}
                </Flex>
              );
            },
            tabBarLabel: ({ focused }) =>
              focused ? (
                <PrimaryText>{tab.label}</PrimaryText>
              ) : (
                <LightText>{tab.label}</LightText>
              )
          }}
        ></Tab.Screen>
      ))}
    </Tab.Navigator>
  );
};

export default ShipperHome;
