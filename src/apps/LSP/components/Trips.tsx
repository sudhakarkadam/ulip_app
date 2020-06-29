import React, { useState } from "react";
import { Flex } from "../../../components/@styled/BaseElements";
import colors from "../../../theme/colors";
import { TabView, TabBar } from "react-native-tab-view";
import { AllApps } from "../../../models/CommonModel";
import { TripList, ListingModes } from "../../../components/TripListing";
import { Dimensions } from "react-native";
const Trips: React.FunctionComponent<{}> = props => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "UPCOMING", title: "UPCOMING" },
    { key: "ON-ROAD", title: "ON-ROAD" },
    { key: "PENDING", title: "PENDING" }
  ]);
  const Upcoming = () => (
    <TripList
      listingMode={ListingModes.UPCOMING}
      from={AllApps.LSP}
      onRowClick={(_id, item) =>
        props.navigation.push("TripDetails", { tripDetails: item })
      }
    />
  );
  const OnRoad = () => (
    <TripList
      listingMode={ListingModes.ON_ROAD}
      from={AllApps.LSP}
      onRowClick={
        (id, _item) => props.navigation.push("TripTracking", { tripId: id })

        // props.navigation.navigate("TripDetails", { tripDetails: item })
      }
    />
  );
  const Pending = () => (
    <TripList
      listingMode={ListingModes.PENDING}
      from={AllApps.LSP}
      onRowClick={(_id, item) =>
        props.navigation.push("TripDetails", { tripDetails: item })
      }
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
