import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import Trips from "./Trips";
import { LSPTripDetails } from "./LSPLanding";
import EWayBillGenerationPage from "../../../components/EWayBillGenerationPage";
import { I18nContext } from "../../../components/InternationalisationProvider";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type TripStackList = {
  Trips: {
    activeIndex?: number;
  };
  TripDetails: object;
  EWayBillGenerationPage: {
    tripId?: number;
  };
};

const Stack = createStackNavigator<TripStackList>();
const TripStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator initialRouteName={"Trips"} screenOptions={HeaderOptions}>
      <Stack.Screen 
        name="Trips"
        component={Trips}
        options={{ title: translate("trips") }}
      />
      <Stack.Screen
        name="TripDetails"
        component={LSPTripDetails}
        options={{ title: translate("trips") }}
      />
      <Stack.Screen
        name="EWayBillGenerationPage"
        component={EWayBillGenerationPage}
        options={{ title: translate("generate.ewb") }}
      />
    </Stack.Navigator>
  );
};

export default TripStack;
