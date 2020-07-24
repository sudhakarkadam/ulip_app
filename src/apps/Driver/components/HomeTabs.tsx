/* eslint-disable react/display-name */
import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountsPage from "../../../components/AccountsPage";
import { TripHome } from "./TripHome";
import TripDetails from "./TripDetails";
import { Text, HeaderOptions } from "../../../components/@styled/BaseElements";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import UlipBottomTab from "../../../components/UlipBottomTab";
import { TranslationText } from "../../../components/InternationalisationProvider";

const Stack = createStackNavigator();

const HomeStack = () => {
  const [headerTitle, setHeaderTitle] = useState("");
  const setTitle = data => {
    setHeaderTitle(data.id);
  };
  const headerTitleText = (
    <Text fontSize={2}>
      <TranslationText id="trip.id" />
      <Text style={{ fontWeight: "bold", fontSize: 20 }}>{headerTitle}</Text>
    </Text>
  );
  return (
    <Stack.Navigator
      initialRouteName={"TripHome"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen name="TripHome" options={{ title: headerTitleText }}>
        {navigationProps => (
          <TripHome
            setTitle={setTitle}
            navigation={navigationProps.navigation}
          />
        )}
      </Stack.Screen>
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

const tabs = [
  {
    name: "HomeStack",
    label: "HOME",
    component: HomeStack,
    activeImage: HomeSelected,
    inActiveImage: HomeBlur
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
