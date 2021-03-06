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
import AccountInactive from "../../../images/user-circle.svg";
import AccountActive from "../../../images/user-circle-dark.svg";
import { TranslationText } from "../../../components/InternationalisationProvider";

export type ShipperBottomTabList = {
  HomeStack: undefined;
  InTransitStack: undefined;
  HistoryStack: undefined;
  Account: undefined;
};
const tabs = [
  {
    name: "HomeStack",
    label: <TranslationText id="home"></TranslationText>,
    component: HomeStack,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
  },
  {
    name: "InTransitStack",
    label: <TranslationText id="in.transit"></TranslationText>,
    component: InTransitStack,
    activeImage: InTransitSelected,
    inActiveImage: InTransitBlur
  },
  {
    name: "HistoryStack",
    label: <TranslationText id="history"></TranslationText>,
    component: HistoryStack,
    activeImage: HistorySelected,
    inActiveImage: HistoryBlur
  },
  {
    name: "Account",
    label: <TranslationText id="account"></TranslationText>,
    component: AccountsStack,
    activeImage: AccountActive,
    inActiveImage: AccountInactive
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
