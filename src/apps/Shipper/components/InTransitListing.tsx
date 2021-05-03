import React, { useContext, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Flex } from "../../../components/@styled/BaseElements";
import colors from "../../../theme/colors";
import { TabView, TabBar } from "react-native-tab-view";
import { AllApps } from "../../../models/CommonModel";
import { TripList, ListingModes } from "../../../components/TripListing";
import { renderTabBarLable } from "../../../components/NavHelper";
import { Dimensions } from "react-native";
import { PageContent, Page } from "../../../components/@styled/Page";
import {
  CompositeNavigationProp,
  useIsFocused
} from "@react-navigation/native";
import { IntransitStackParams } from "./InTransitStack";
import { ShipperAuthenticatedStackParamList } from "./ShipperHome";
import { I18nContext } from "../../../components/InternationalisationProvider";

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<IntransitStackParams, "InTransitListing">,
  StackNavigationProp<ShipperAuthenticatedStackParamList>
>;

interface Props {
  navigation: NavigationProps;
}

const InTransitListing: React.FunctionComponent<Props> = props => {
  const [index, setIndex] = useState(0);
  const { translate } = useContext(I18nContext);
  const [routes] = useState([
    { key: "ON-ROAD", title: translate("onroad") },
    { key: "ACTIVE", title: translate("active") }
  ]);

  const OnRoad = () => (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.ON_ROAD}
          from={AllApps.SHIPPER}
          onRowClick={(_, tsr) => {
            props.navigation.navigate("TripTracking", {
              tripId: tsr.trip_details?.id || -1
            });
          }}
          focused={useIsFocused()}
        />
      </PageContent>
    </Page>
  );
  const Active = () => (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.ACTIVE}
          from={AllApps.SHIPPER}
          onRowClick={id => {
            props.navigation.navigate("TripTracking", { tripId: +id });
          }}
          focused={useIsFocused()}
        />
      </PageContent>
    </Page>
  );

  return (
    <Flex flex={1}>
      <TabView
        renderTabBar={tabBarProps => {
          return (
            <TabBar
              {...tabBarProps}
              renderLabel={renderTabBarLable}
              activeColor={colors.primary}
              inactiveColor={colors.lighter.primary}
              navigationState={{ index, routes }}
              style={{
                backgroundColor: colors.lightest.primary,
                elevation: 0
              }}
              indicatorStyle={{
                backgroundColor: colors.lightest.primary,
                height: 2
              }}
              labelStyle={{
                fontSize: 16
              }}
            />
          );
        }}
        navigationState={{ index, routes }}
        renderScene={({ route }) => {
          switch (route.key) {
            case "ACTIVE": {
              if (routes[index].key === route.key) return <Active />;
              return null;
            }
            case "ON-ROAD": {
              if (routes[index].key === route.key) return <OnRoad />;
              return null;
            }
            default:
              return null;
          }
        }}
        initialLayout={{ width: Dimensions.get("window").width }}
        onIndexChange={setIndex}
      />
    </Flex>
  );
};
export default InTransitListing;
