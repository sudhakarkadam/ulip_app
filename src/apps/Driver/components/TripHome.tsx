import React, { useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  FlatList,
  View,
  Animated
} from "react-native";
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
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { DriverActionCreators } from "../actions/DriverActionCreators";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { ConnectedProps, connect } from "react-redux";
import { isLoading, isInit } from "../../../utils/actionCreator";
import { StickyBottom } from "../../../components/StickyBottom";
import { CommonState } from "../../../reducers";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { PageContent, Page } from "../../../components/@styled/Page";
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

const capture = (callback: (data: FormData) => void) => {
  ImagePicker.showImagePicker(options, data => {
    const fd = new FormData();
    fd.append("file", {
      // @ts-ignore
      uri: data.uri,
      type: data.type || "",
      name: data.fileName
    });
    callback(fd);
  });
};

const { getTripById, updateTrip, upload } = DriverActionCreators;
const mapDispatchToProps = { getTripById, updateTrip, upload };
const mapStateToProps = (state: CommonState) => ({
  trip: state.driverTrip,
  phone: state.user.data.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripHome">;
} & StackScreenProps<DriverHomeStackParamList, "TripHome">;

const SwipeActions = (
  _: Animated.AnimatedInterpolation,
  dragX: Animated.AnimatedInterpolation
) => {
  const translate = dragX.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 65]
  });
  return (
    <View
      style={{ flex: 1, backgroundColor: "#42526E", justifyContent: "center" }}
    >
      <Animated.Text
        style={{
          color: "white",
          paddingHorizontal: 0,
          fontWeight: "bold",
          transform: [{ translateX: translate }]
        }}
      >
        STARTING...
      </Animated.Text>
    </View>
  );
};

const getStartText = () => {
  return (
    <Text>
      <TranslationText id="swipe.to.start" /> <Text fontSize={5}>&#187;</Text>
    </Text>
  );
};

const Trip: React.FC<Props> = props => {
  const getTrip = () => props.getTripById(props.route.params.id);

  useEffect(() => {
    getTrip();
  }, []);

  if (isLoading(props.trip) || isInit(props.trip)) return <ActivityIndicator />;

  // const trips = driverTrips || props.trips.data;
  const trip = props.trip.data;
  console.log(trip);
  if (!trip)
    return (
      <Page>
        <PageContent>
          <PrimaryText p={20}>
            <TranslationText id="no.trips"></TranslationText>
          </PrimaryText>
        </PageContent>
      </Page>
    );

  const bottomSheetContent = () => {
    const today = new Date().toLocaleDateString();
    const tripStartDate = new Date(
      trip.pickup_request_time
    ).toLocaleDateString();

    if (trip.trip_status === "CREATED") {
      if (today === tripStartDate) {
        return (
          <Flex width="100%">
            <Swipeable
              renderLeftActions={SwipeActions}
              onSwipeableLeftOpen={async () => {
                await props.updateTrip({
                  sr_id: trip.trip_id,
                  status: "TRIP_STARTED"
                });
                getTrip();
              }}
            >
              <StyledButton width="100%" height="50" title={getStartText()} />
            </Swipeable>
          </Flex>
        );
      } else {
        return (
          <>
            <Text color="#7A869A">
              <TranslationText
                id="it.will.be.enabled"
                interpolations={{ date: tripStartDate }}
              />
            </Text>
            <StyledButton
              width="100%"
              title={<TranslationText id="start.trip"></TranslationText>}
              style={{ opacity: 0.6 }}
              disabled={true}
              onPress={() => {}}
            />
          </>
        );
      }
    }

    if (trip.trip_status === "TRIP_STARTED") {
      return (
        <>
          <Box textAlign="left" alignItems="flex-start">
            <Text textAlign="left" color="#7A869A">
              <TranslationText id="pick.up.point"></TranslationText>
            </Text>
            <View style={{ flex: 1 }}></View>
          </Box>
          <FlexRow>
            <StyledButton
              height="40"
              width="50%"
              title={<TranslationText id="go.to.map"></TranslationText>}
              onPress={() => {}}
            />
            <StyledButton
              height="40"
              width="50%"
              title={<TranslationText id="capture.pop"></TranslationText>}
              onPress={() => {
                // upload pop
                capture(async d => {
                  await props.upload({
                    file: d,
                    id: trip.trip_id,
                    type: "POP"
                  });
                  getTrip();
                });
              }}
            />
          </FlexRow>
        </>
      );
    }

    if (trip.trip_status === "IN_TRANSIT") {
      return (
        <>
          <Box textAlign="left" alignItems="flex-start">
            <Text textAlign="left" color="#7A869A">
              {<TranslationText id="destination.point"></TranslationText>}
            </Text>
            <View style={{ flex: 1 }}></View>
          </Box>
          <FlexRow>
            <StyledButton
              height="40"
              width="50%"
              title={<TranslationText id="go.to.map"></TranslationText>}
              onPress={() => {}}
            />
            <StyledButton
              height="40"
              width="50%"
              title={<TranslationText id="reached"></TranslationText>}
              onPress={async () => {
                await props.updateTrip({
                  sr_id: trip.tsr_id,
                  status: "REACHED"
                });
                getTrip();
              }}
            />
          </FlexRow>
        </>
      );
    }

    if (trip.trip_status === "REACHED") {
      return (
        <StyledButton
          width="100%"
          title="Capture POD"
          onPress={() => {
            // upload pop
            capture(async d => {
              await props.upload({
                file: d,
                id: trip.trip_id,
                type: "POD"
              });
              getTrip();
            });
          }}
        />
      );
    }
    return;
  };

  return (
    <Page>
      <PageContent>
        <ScrollView>
          <FlatList
            onRefresh={() => props.getTripById(props.route.params.id)}
            refreshing={isLoading(props.trip)}
            data={[trip]}
            renderItem={t => {
              const trip = t.item;
              const isCreated = t.item.trip_status === "CREATED";
              const isStarted = t.item.trip_status === "TRIP_STARTED";
              const isInTransit = t.item.trip_status === "IN_TRANSIT";
              const isReached =
                t.item.trip_status === "REACHED" ||
                t.item.trip_status === "COMPLETED";

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
                          <PrimaryText>
                            <TranslationText id="pick.up.date" />
                          </PrimaryText>
                          <PrimaryText
                            style={{ fontWeight: "bold", fontSize: 20 }}
                          >
                            <TranslationText
                              id="placeholder"
                              interpolations={{
                                value: new Date(
                                  trip.pickup_request_time
                                ).toLocaleDateString()
                              }}
                            />
                          </PrimaryText>
                        </Flex>
                      </FlexColumn>
                      <FlexColumn>
                        <StyledButton
                          variant="outline"
                          height="40px"
                          width="122px"
                          title={"Details"}
                          onPress={() =>
                            props.navigation.navigate("TripDetails")
                          }
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
                                ...convert(trip.source_location_details)
                              }
                            ]
                          : []),
                        ...(isStarted
                          ? [
                              {
                                ...convert(trip.source_location_details),
                                tag: "Pickup Point"
                              }
                            ]
                          : []),
                        ...(isInTransit || isReached
                          ? [
                              {
                                ...convert(trip.source_location_details),
                                // @ts-ignore
                                crossed: true
                              }
                            ]
                          : []),

                        ...(isReached
                          ? [
                              {
                                ...convert(trip.destination_location_details),
                                // @ts-ignore
                                crossed: true,
                                tag: "Destination Point"
                              }
                            ]
                          : [convert(trip.destination_location_details)])
                      ]}
                    />
                  </Box>
                </Flex>
              );
            }}
          />
        </ScrollView>
        <StickyBottom>{bottomSheetContent()}</StickyBottom>
      </PageContent>
    </Page>
  );
};

export const TripHome = connector(Trip);
