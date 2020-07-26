/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable react/display-name */
import React from "react";
import UlipBottomTab from "../../../components/UlipBottomTab";
import HomeStack from "./HomeStack";
import InTransitStack from "./InTransitStack";
import HistoryStack from "./HistoryStack";
import AccountsStack from "../../../components/AccountsStack";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import { createStackNavigator } from "@react-navigation/stack";
import TripTracking from "../../../components/TripTracking";

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

export type ShipperAuthenticatedStackParamList = {
  MainBottomTab: undefined;
  TripTracking: { tripId: number };
};

const Stack = createStackNavigator<ShipperAuthenticatedStackParamList>();

const MainBottomTab: React.FC = () => (
  <UlipBottomTab tabs={tabs}></UlipBottomTab>
);

const ShipperHome = () => {
  return (
    <Stack.Navigator initialRouteName="MainBottomTab" headerMode="none">
      <Stack.Screen
        name="MainBottomTab"
        component={MainBottomTab}
      ></Stack.Screen>
      <Stack.Screen name="TripTracking" component={TripTracking}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ShipperHome;
