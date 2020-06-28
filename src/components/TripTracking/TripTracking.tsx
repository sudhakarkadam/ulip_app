import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, Box } from "../@styled/BaseElements";
import Tag from "../@styled/Tag";
import { Flex1, FlexRow, FlexCenter } from "../@styled/Flex";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import colors from "../../theme/colors";
import TopBar from "./TopBar";
import Hop from "./Hop";
import { TripTrackingProps as TTDataProps } from "./TripTracking.model";
import { CommonState } from "../../reducers";
import Map from "./Map";

import { cityLatLongs, currentLocations, hops } from "../../fixtures/MapMocks";
import Button from "../@styled/StyledButton";

const mapStateToProps = (state: CommonState, props: Props): TTDataProps => {
  const trip = (state.trips.data || []).find(
    t => t.id === props.route.params.tripId
  );
  const pickUpCity = ((trip && trip.pickUp_location.city) || "").toLowerCase();
  const dropCity = ((trip && trip.delivery_location.city) || "").toLowerCase();
  const delay = trip && trip.trip && trip.trip.status;

  // @ts-ignore
  const source = cityLatLongs[pickUpCity];
  // @ts-ignore
  const destination = cityLatLongs[dropCity];
  // @ts-ignore
  const currentLocation = currentLocations[`${pickUpCity}_${dropCity}`];
  // @ts-ignore
  const completedHops = hops[`${pickUpCity}_${dropCity}`];
  const status = delay ? "DELAYED" : "ON-TIME";

  return {
    source,
    destination,
    currentLocation,
    completedHops,
    status
  };
};

const connector = connect(mapStateToProps, null);

const HeadBox: React.FC<{ bigText: string; smallText: string }> = ({
  bigText = "",
  smallText = ""
}) => (
  <Flex1 alignItems="center">
    <Text fontSize={0} color="black.1">
      {smallText}
    </Text>
    <Text fontWeight="bold">{bigText}</Text>
  </Flex1>
);

const TripHead: React.FC<{}> = () => {
  return (
    <FlexRow
      bg="white"
      justifyContent="center"
      alignItems="center"
      p={3}
      py={4}
      style={{
        elevation: 5
      }}
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
      borderBottomWidth={1}
      borderBottomColor={colors.grays[2]}
    >
      <HeadBox bigText="BANGALORE" smallText="21 JUN, 3:00 AM" />
      <FlexCenter>
        <Text color="black.0" px={2} fontSize={40} lineHeight="40px">
          →
        </Text>
      </FlexCenter>
      <HeadBox bigText="MUMBAI" smallText="30 JUN, 6:00 PM" />
    </FlexRow>
  );
};

type Props = StackScreenProps<
  {
    TripTracking: {
      tripId: string;
    };
  },
  "TripTracking"
>;

const TripTracking: React.FC<Props & TTDataProps> = ({ status, ...props }) => {
  const { navigation, route } = props;
  const { tripId } = route.params;

  const onBackPress = () => navigation.goBack();

  const isTripNotTrackable =
    !props.source ||
    !props.destination ||
    !props.currentLocation ||
    !props.completedHops;

  if (isTripNotTrackable) {
    return (
      <Flex1 alignItems="center" justifyContent="center">
        <Text mb={3}>Trip Tracking is not Avaible at the Momment!</Text>
        <Button onPress={onBackPress} title="Go Back" />
      </Flex1>
    );
  }

  return (
    <>
      <Flex1>
        <TopBar {...{ onBackPress, tripId, status }} />
        <Map
          hops={props.completedHops}
          source={props.source.name}
          destination={props.destination.name}
          currentLocation={props.currentLocation}
        />
        <ScrollBottomSheet
          componentType="FlatList"
          snapPoints={["30%", "50%", "75%"]}
          initialSnapIndex={2}
          renderHandle={() => <TripHead />}
          ListHeaderComponent={
            <FlexRow bg="white" pt={4} px={3}>
              <Tag text="LOCATIONS" />
            </FlexRow>
          }
          data={props.completedHops || []}
          keyExtractor={item => item.name}
          renderItem={({ item, index }) => (
            <Hop
              index={index}
              lastIndex={(props.completedHops || []).length - 1 === index}
              locationName={item.name}
              timeText={item.time}
              delayText={item.delay}
            />
          )}
          containerStyle={{
            zIndex: 2
          }}
          contentContainerStyle={{
            backgroundColor: "white"
          }}
        />
      </Flex1>
    </>
  );
};

export default connector(TripTracking);
