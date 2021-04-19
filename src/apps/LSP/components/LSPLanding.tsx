/* eslint-disable @typescript-eslint/prefer-interface */
/* eslint-disable react/display-name */
import React, { useContext } from "react";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import HomeSelected from "../../../images/home_selected.svg";
import HomeBlur from "../../../images/home_blur.svg";
import InTransitSelected from "../../../images/intransit_selected.svg";
import InTransitBlur from "../../../images/intransit_blur.svg";
import HistorySelected from "../../../images/history_selected.svg";
import HistoryBlur from "../../../images/history_blur.svg";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import UlipBottomTab from "../../../components/UlipBottomTab";

import { HeaderOptions } from "../../../components/@styled/BaseElements";
import { createStackNavigator } from "@react-navigation/stack";
import TripDetails from "../../../components/TripDetails";
import TripTracking from "../../../components/TripTracking";
import AccountsPage from "../../../components/AccountsPage";
import TruckSelect from "./TruckSelect";
import { RootStackParamList } from "./AuthenticatedFlow";
import { TripStackList } from "./LSPTripStack";
import { Page, PageContent } from "../../../components/@styled/Page";
import HomeStack from "./LSPHomeStack";
import { useIsFocused } from "@react-navigation/native";
import AccountInactive from "../../../images/user-circle.svg";
import AccountActive from "../../../images/user-circle-dark.svg";
import TripStack from "./LSPTripStack";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { I18nContext } from "../../../components/InternationalisationProvider";

type HistoryProps = StackScreenProps<RootStackParamList, "TripDetails">;
interface TripNavProps {
  disableEWB?: boolean;
  navigation?: StackNavigationProp<TripStackList, "EWayBillGenerationPage">;
}

const Stack = createStackNavigator();
const History = (props: HistoryProps) => (
  <Page>
    <PageContent>
      <TripList
        listingMode={ListingModes.COMPLETED}
        from={AllApps.LSP}
        onRowClick={(_id, item) =>
          props.navigation.push("TripDetails", { tripDetails: item })
        }
        focused={useIsFocused()}
      />
    </PageContent>
  </Page>
);
export const LSPTripDetails = (props: HistoryProps & TripNavProps) => {
  const { tripDetails } = props.route.params;
  const tripData = tripDetails as GetTripsResponse;
  return (
    <Page>
      <PageContent>
        <TripDetails
          id={tripData.tsr_id + ""}
          pickupDateString={new Date(
            tripData.pickup_request_time
          ).toLocaleDateString()}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight + ""}
          truckUnit={tripData.weight_unit}
          documents={tripData.trip_details?.documents || []}
          places={[
            tripData.source_location_details,
            tripData.destination_location_details
          ]}
          goodsSegment={tripData.goods_segment}
          showEwb={!props.disableEWB}
          ewbStatus={tripData.trip_details?.ewb_status}
          ewbNumber={tripData.trip_details?.ewb_number}
          tripId={tripData.trip_details?.id}
          navigation={props.navigation}
        />
      </PageContent>
    </Page>
  );
};

const HistoryStack = () => {
  const { translate } = useContext(I18nContext);
  return (
    <Stack.Navigator initialRouteName={"History"} screenOptions={HeaderOptions}>
      <Stack.Screen
        name="History"
        component={History}
        options={{ title: translate("history")}}
      />
      <Stack.Screen
        name="TripDetails"
        component={props => <LSPTripDetails disableEWB {...props} />}
        options={{ title: translate("trips") }}
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
      <Stack.Screen name="AccountsPage" options={{ title: translate("accounts") }}>
        {() => <AccountsPage persona="LSP" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export type LSPBottomTabList = {
  HomeStack: undefined;
  TripsStack: object;
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
    name: "TripsStack",
    label: <TranslationText id="trips"></TranslationText>,
    component: TripStack,
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

const MainBottomTab: React.FC = () => {
  return <UlipBottomTab tabs={tabs}></UlipBottomTab>;
};

export type LSPAuthenticatedStackParamList = {
  MainBottomTab: undefined;
  TruckSelect: undefined;
  TripTracking: {
    tripId: number;
  };
};

const MainStack = createStackNavigator<LSPAuthenticatedStackParamList>();

const LSPLanding = () => {
  return (
    <MainStack.Navigator initialRouteName="MainBottomTab" headerMode="none">
      <MainStack.Screen
        name="MainBottomTab"
        component={MainBottomTab}
      ></MainStack.Screen>
      <MainStack.Screen
        name="TruckSelect"
        component={TruckSelect}
      ></MainStack.Screen>
      <MainStack.Screen
        name="TripTracking"
        component={TripTracking}
        options={{
          headerShown: false
        }}
      />
    </MainStack.Navigator>
  );
};

export default LSPLanding;
