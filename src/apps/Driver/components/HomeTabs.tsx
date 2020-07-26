/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountsPage from "../../../components/AccountsPage";
import { TripHome } from "./TripHome";
import TripDetails from "./TripDetails";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import UpcomingTrips from "./DriverUpcomingTrips";
import UlipBottomTab from "../../../components/UlipBottomTab";
import { I18nContext } from "../../../components/InternationalisationProvider";

const Stack = createStackNavigator();

const HomeStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName={"TripList"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="TripList"
        options={{ title: translate("home") }}
        component={UpcomingTrips}
      ></Stack.Screen>
      <Stack.Screen name="TripHome" component={TripHome} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
    </Stack.Navigator>
  );
};

const AccountsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"AccountsPage"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="AccountsPage" options={{ title: "Home" }}>
        {() => <AccountsPage persona={"driver"} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const Hometabs = () => {
  const { translate } = useContext(I18nContext);
  const tabs = [
    {
      name: "HomeStack",
      label: translate("home"),
      component: HomeStack,
      activeImage: HomeSelected,
      inActiveImage: HomeBlur
    },
    {
      name: "Account",
      label: translate("account"),
      component: AccountsStack,
      activeImage: InTransitSelected,
      inActiveImage: InTransitBlur
    }
  ];
  return <UlipBottomTab tabs={tabs} />;
};

export default Hometabs;
