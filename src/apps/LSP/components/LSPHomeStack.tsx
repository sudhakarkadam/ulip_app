import React, { useContext } from "react";
import {
  createStackNavigator,
  StackScreenProps,
  StackNavigationProp
} from "@react-navigation/stack";
import { HeaderOptions } from "../../../components/@styled/BaseElements";
import TripAccept from "./TripAccept";
import HomeMetrics from "./HomeMetrics";
import { Page, PageContent } from "../../../components/@styled/Page";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import {
  useIsFocused,
  CompositeNavigationProp
} from "@react-navigation/native";
import AddTruck from "./AddTruck";
import { LSPBottomTabList } from "./LSPLanding";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { I18nContext } from "../../../components/InternationalisationProvider";

// eslint-disable-next-line @typescript-eslint/prefer-interface
export type HomeStackParamList = {
  HomeMetricsComponent: undefined;
  TripRequests: object;
  TripAcceptPage: { tripDetails: GetTripsResponse };
  TruckSelect: undefined;
  AddTruck: undefined;
};

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "HomeMetricsComponent">,
  BottomTabNavigationProp<LSPBottomTabList>
>;

interface HomeMetricsProps {
  navigation: NavigationProps;
}

const HomeMetricsComponent = (props: HomeMetricsProps) => (
  <HomeMetrics
    onRequestClick={() => props.navigation.push("TripRequests", {})}
    focused={useIsFocused()}
    onTruckCreateClick={() => props.navigation.push("AddTruck")}
    onIntransitClick={() =>
      props.navigation.navigate("TripsStack", {
        screen: "Trips",
        params: { activeIndex: 1 }
      })
    }
  />
);

type TripRequestsProps = StackScreenProps<HomeStackParamList, "TripRequests">;

const TripRequests: React.FC<TripRequestsProps> = (
  props: TripRequestsProps
) => {
  return (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.PENDING_REQUESTS}
          from={AllApps.LSP}
          onRowClick={(_id, item) =>
            props.navigation.push("TripAcceptPage", { tripDetails: item })
          }
          focused={useIsFocused()}
        />
      </PageContent>
    </Page>
  );
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator
      initialRouteName={"HomeMetricsComponent"}
      screenOptions={HeaderOptions}
    >
      <Stack.Screen
        name="TripRequests"
        component={TripRequests}
        options={{ title: translate("home") }}
      />
      <Stack.Screen
        name="HomeMetricsComponent"
        component={HomeMetricsComponent}
        options={{ title: translate("home") }}
      />
      <Stack.Screen
        name="TripAcceptPage"
        component={TripAccept}
        options={{ title: translate("truck.request") }}
      />
      <Stack.Screen
        name="AddTruck"
        component={AddTruck}
        options={{ title: translate("add.truck") }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
