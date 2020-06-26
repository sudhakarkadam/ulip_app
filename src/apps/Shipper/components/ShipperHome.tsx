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
import ShipperCreateProfile from "./ShipperCreateProfile";

const Tab = createBottomTabNavigator();

const tabs = [
  {
    name: "LandingHome",
    label: "HOME",
    component: ShipperCreateProfile,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "InTransit",
    label: "IN-TRANSIT",
    component: ShipperCreateProfile,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "History",
    label: "HISTORY",
    component: ShipperCreateProfile,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  }
];

const ShipperHome = () => {
  return (
    <Tab.Navigator>
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
