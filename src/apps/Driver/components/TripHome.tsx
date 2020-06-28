import React, { useEffect } from "react";
import { ScrollView, ActivityIndicator, FlatList, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import colors from "../../../theme/colors";
import styled from "styled-components/native";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex,
  Box
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import StyledButton from "../../../components/@styled/StyledButton";
import { TripStamp, convert } from "../../../components/TripStamp";
import { StackNavigationProp } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { DriverActionCreators } from "../actions/DriverActionCreators";
import { DriverAppState } from "../reducers";

import { driverTrips } from "../../../fixtures/DriverTrips";
import { ConnectedProps, connect } from "react-redux";
import { isLoading, isInit } from "../../../utils/actionCreator";
import { StickyBottom } from "../../../components/StickyBottom";
const options = {
  title: "Select proof",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};
const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
`;

const capture = callback => {
  ImagePicker.showImagePicker(options, response => {
    callback(response.uri);
  });
};

const { getTrips, updateTrip, upload } = DriverActionCreators;
const mapDispatchToProps = { getTrips, updateTrip, upload };
const mapStateToProps = (state: DriverAppState) => ({
  trips: state.trips,
  phone: state.common.user.data.user_details.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripHome">;
};

const Trip: React.FC<Props> = props => {
  useEffect(() => {
    props.getTrips(props.phone);
  }, []);

  if (isLoading(props.trips) || isInit(props.trips))
    return <ActivityIndicator />;

  const trips = driverTrips || props.trips.data;
  // const trips = props.trips.data;

  if (!trips) return <PrimaryText p={20}>No trips</PrimaryText>;

  const bottomSheetContent = () => {
    const trip = trips?.find(t => t);
    const today = new Date().toLocaleDateString();
    const tripStartDate = new Date(trip.pickup_date).toLocaleDateString();

    if (trip.trip.status === "CREATED") {
      if (today === tripStartDate) {
        return (
          <StyledButton
            width="100%"
            height="40"
            title="Start Trip"
            onPress={() => {
              props.updateTrip({ sr_id: trip.id, status: "TRIP_STARTED" });
            }}
          />
        );
      } else {
        return (
          <>
            <Text color="#7A869A">It will be enabled on {tripStartDate}</Text>
            <StyledButton
              height="40"
              width="100%"
              title="Start Trip"
              style={{ opacity: 0.6 }}
              disabled={true}
              onPress={() => {}}
            />
          </>
        );
      }
    }

    if (trip.trip.status === "TRIP_STARTED") {
      return (
        <>
          <Box textAlign="left" alignItems="flex-start">
            <Text textAlign="left" color="#7A869A">
              Pickup point
            </Text>
            <View style={{ flex: 1 }}></View>
          </Box>
          <FlexRow>
            <StyledButton
              height="40"
              width="50%"
              title="GO TO MAP"
              onPress={() => {}}
            />
            <StyledButton
              height="40"
              width="50%"
              title="CAPTURE POP"
              onPress={() => {
                // upload pop
                capture(data => {
                  const fd = new FormData();
                  fd.append("file", data);
                  props.upload({
                    file: fd,
                    id: trip.trip.id,
                    type: "POP"
                  });
                });
              }}
            />
          </FlexRow>
        </>
      );
    }

    if (trip.trip.status === "IN_TRANSIT") {
      return (
        <>
          <Box textAlign="left" alignItems="flex-start">
            <Text textAlign="left" color="#7A869A">
              Destination point
            </Text>
            <View style={{ flex: 1 }}></View>
          </Box>
          <FlexRow>
            <StyledButton
              height="40"
              width="50%"
              title="GO TO MAP"
              onPress={() => {}}
            />
            <StyledButton
              height="40"
              width="50%"
              title="Reached"
              onPress={() => {
                props.updateTrip({ sr_id: trip.id, status: "REACHED" });
              }}
            />
          </FlexRow>
        </>
      );
    }

    if (trip.trip.status === "REACHED") {
      return (
        <StyledButton
          height="40"
          width="100%"
          title="Capture POD"
          onPress={() => {
            // upload pop
            capture(data => {
              const fd = new FormData();
              fd.append("file", data);
              props.upload({
                file: fd,
                id: trip.trip.id,
                type: "POD"
              });
            });
          }}
        />
      );
    }
  };

  return (
    <>
      <ScrollView>
        <FlatList
          onRefresh={() => props.getTrips(props.phone)}
          refreshing={isLoading(props.trips)}
          data={[trips[0]] || []}
          renderItem={t => {
            const trip = t.item;
            const isCreated = t.item.trip.status === "CREATED";
            const isStarted = t.item.trip.status === "TRIP_STARTED";
            const isInTransit = t.item.trip.status === "IN_TRANSIT";
            const isReached =
              t.item.trip.status === "REACHED" ||
              t.item.trip.status === "COMPLETED";

            return (
              <Flex mt={4}>
                <Card>
                  <FlexRow p={7} backgroundColor="white">
                    <FlexColumn flex={1.8}>
                      <Text
                        color={`${colors.blues[5]}`}
                        fontSize={20}
                        fontWeight={"bold"}
                      >
                        Trip Details
                      </Text>
                      <Flex style={{ paddingVertical: 25 }}>
                        <PrimaryText>Pickup Date</PrimaryText>
                        <PrimaryText
                          style={{ fontWeight: "bold", fontSize: 20 }}
                        >
                          {new Date(trip.pickup_date).toLocaleDateString()}
                        </PrimaryText>
                      </Flex>
                    </FlexColumn>
                    <FlexColumn>
                      <StyledButton
                        variant="outline"
                        height="40px"
                        width="122px"
                        title={"Details"}
                        onPress={() => props.navigation.navigate("TripDetails")}
                        style={{ marginBottom: 10 }}
                      />
                      <StyledButton
                        variant="outline"
                        height="40px"
                        width="122px"
                        title={"Documents"}
                        onPress={() => {}}
                      />
                    </FlexColumn>
                  </FlexRow>
                </Card>
                <Box pl={7} pr={7} backgroundColor="white">
                  <TripStamp
                    track={isStarted || isInTransit || isReached}
                    places={[
                      ...(isStarted || isInTransit || isReached
                        ? [
                            {
                              name: "Your location",
                              relativeDistance: 23,
                              // @ts-ignore
                              crossed: true
                            }
                          ]
                        : []),
                      ...(isCreated
                        ? [
                            {
                              ...convert(trip.pickUp_location)
                            }
                          ]
                        : []),
                      ...(isStarted
                        ? [
                            {
                              ...convert(trip.pickUp_location),
                              tag: "Pickup Point"
                            }
                          ]
                        : []),
                      ...(isInTransit || isReached
                        ? [
                            {
                              ...convert(trip.pickUp_location),
                              // @ts-ignore
                              crossed: true
                            }
                          ]
                        : []),

                      ...(isReached
                        ? [
                            {
                              ...convert(trip.delivery_location),
                              // @ts-ignore
                              crossed: true,
                              tag: "Destination Point"
                            }
                          ]
                        : [convert(trip.delivery_location)])
                    ]}
                  />
                </Box>
              </Flex>
            );
          }}
        />
      </ScrollView>
      <StickyBottom>{bottomSheetContent()}</StickyBottom>
    </>
  );
};

export const TripHome = connector(Trip);
