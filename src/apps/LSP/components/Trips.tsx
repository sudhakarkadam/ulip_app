import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import { Flex } from "../../../components/@styled/BaseElements";
import colors from "../../../theme/colors";
import { AllApps } from "../../../models/CommonModel";
import { TripList, ListingModes } from "../../../components/TripListing";
import { renderTabBarLable } from "../../../components/NavHelper";
import { Page, PageContent } from "../../../components/@styled/Page";
import {
  useIsFocused,
  CompositeNavigationProp,
  RouteProp
} from "@react-navigation/native";

import { TripStackList } from "./LSPTripStack";
import { LSPAuthenticatedStackParamList } from "./LSPLanding";

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<TripStackList, "Trips">,
  StackNavigationProp<LSPAuthenticatedStackParamList>
>;

type RouteProps = RouteProp<TripStackList, "Trips">;

interface Props {
  navigation: NavigationProps;
  route: RouteProps;
}

const Trips = (props: Props) => {
  const [index, setIndex] = useState(props.route.params?.activeIndex || 0);
  const [routes] = useState([
    { key: "UPCOMING", title: "UPCOMING" },
    { key: "ON-ROAD", title: "ON-ROAD" },
    { key: "PENDING", title: "PENDING" }
  ]);
  const Upcoming = () => (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.UPCOMING}
          from={AllApps.LSP}
          onRowClick={(_id, item) =>
            props.navigation.push("TripDetails", { tripDetails: item })
          }
          focused={useIsFocused()}
        />
      </PageContent>
    </Page>
  );
  const OnRoad = () => (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.ON_ROAD}
          from={AllApps.LSP}
          onRowClick={(_, _item) =>
            props.navigation.push("TripTracking", {
              tripId: Number(_item.trip_details?.id)
            })
          }
          focused={useIsFocused()}
        />
      </PageContent>
    </Page>
  );
  const Pending = () => (
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.PENDING}
          from={AllApps.LSP}
          onRowClick={(_id, item) =>
            props.navigation.push("TripDetails", { tripDetails: item })
          }
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
            case "UPCOMING": {
              if (routes[index].key === route.key) return <Upcoming />;
              return null;
            }

            case "PENDING": {
              if (routes[index].key === route.key) return <Pending />;
              return null;
            }
            // return <Pending />;
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
export default Trips;
