import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InTransitListing from "./InTransitListing";
import ShipperCreateTrip from "./ShipperCreateTrip";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import { useContext } from "react";
import { I18nContext } from "../../../components/InternationalisationProvider";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type IntransitStackParams = {
  InTransitListing: undefined;
  CreateTrip: undefined;
};

const Stack = createStackNavigator<IntransitStackParams>();
const InTransitStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName="InTransitListing"
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="InTransitListing"
        component={InTransitListing}
        options={{
          title: translate("intransit")
        }}
      />
      <Stack.Screen
        name="CreateTrip"
        component={ShipperCreateTrip}
        options={{
          title: translate("create.trip")
        }}
      />
    </Stack.Navigator>
  );
};

export default InTransitStack;
