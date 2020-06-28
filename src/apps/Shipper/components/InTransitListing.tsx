import React, { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Flex } from "../../../components/@styled/BaseElements";
import colors from "../../../theme/colors";
import { TabView, TabBar } from "react-native-tab-view";
import { AllApps } from "../../../models/CommonModel";
import { TripList, ListingModes } from "../../../components/TripListing";
import { Dimensions } from "react-native";

const Trips: React.FunctionComponent<StackScreenProps<
  {
    TripTracking: {
      tripId: number;
    };
  },
  "TripTracking"
>> = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "ON-ROAD", title: "ON-ROAD" },
    { key: "ACTIVE", title: "ACTIVE" }
  ]);

  const OnRoad = () => (
    <TripList
      listingMode={ListingModes.ON_ROAD}
      from={AllApps.SHIPPER}
      onRowClick={id => {
        props.navigation.navigate("TripTracking", { tripId: id });
      }}
    />
  );
  const Active = () => (
    <TripList
      listingMode={ListingModes.ACTIVE}
      from={AllApps.SHIPPER}
      onRowClick={id => {
        props.navigation.navigate("TripTracking", { tripId: id });
      }}
    />
  );

  return (
    <Flex flex={1}>
      <TabView
        renderTabBar={tabBarProps => {
          return (
            <TabBar
              {...tabBarProps}
              navigationState={{ index, routes }}
              style={{
                backgroundColor: colors.white,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 4
                },
                shadowOpacity: 1,
                elevation: 4
              }}
              indicatorStyle={{
                backgroundColor: colors.primary,
                height: 2
              }}
              labelStyle={{
                color:
                  tabBarProps.navigationState.index === index
                    ? colors.primary
                    : colors.black[0],
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
