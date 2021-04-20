/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountsPage from "../../../components/AccountsPage";
import { TripHome } from "./TripHome";
import TripDetails from "./TripDetails";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import HomeSelected from "../../../images/home_selected.svg";
import History from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import HomeBlur from "../../../images/home_blur.svg";
import DriverTripsListing from "./DriverUpcomingTrips";
import UlipBottomTab from "../../../components/UlipBottomTab";
import PODDetails from "../../../components/PODDetails";
import { I18nContext } from "../../../components/InternationalisationProvider";
import AccountInactive from "../../../images/user-circle.svg";
import AccountActive from "../../../images/user-circle-dark.svg";

const Stack = createStackNavigator();

const HomeStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName={"TripList"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="TripList" options={{ title: translate("home") }}>
        {props => (
          <DriverTripsListing
            {...props}
            status={["CREATED", "IN_TRANSIT", "REACHED", "TRIP_STARTED"]}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="TripHome"
        component={TripHome}
        options={{ title: translate("trip.home") }}
      />
      <Stack.Screen
        name="TripDetails"
        component={TripDetails}
        options={{ title: translate("trip.details") }}
      />
      <Stack.Screen
        name="PODDetailsPage"
        component={PODDetails}
        options={{ title: translate("pod.details.page") }}
      />
    </Stack.Navigator>
  );
};

const AccountsStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName={"AccountsPage"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="AccountsPage" options={{ title: translate("home") }}>
        {() => <AccountsPage persona="DRIVER" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const PastTrips = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName={"TripList"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="TripList" options={{ title: translate("home") }}>
        {props => (
          <DriverTripsListing
            {...props}
            title={translate("past.trips")}
            status={["COMPLETED"]}
          />
        )}
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
      name: "PastStack",
      label: translate("history"),
      component: PastTrips,
      activeImage: History,
      inActiveImage: HistoryBlur
    },
    {
      name: "Account",
      label: translate("account"),
      component: AccountsStack,
      activeImage: AccountActive,
      inActiveImage: AccountInactive
    }
  ];
  return <UlipBottomTab tabs={tabs} />;
};

export default Hometabs;
