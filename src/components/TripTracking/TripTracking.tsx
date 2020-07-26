import React from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { StackScreenProps } from "@react-navigation/stack";

import { Text } from "../@styled/BaseElements";
import Tag from "../@styled/Tag";
import { Flex1, FlexRow, FlexCenter } from "../@styled/Flex";
import ScrollBottomSheet from "react-native-scroll-bottom-sheet";
import colors from "../../theme/colors";
import TopBar from "./TopBar";
import Hop from "./Hop";
import { TripTrackingProps as TTDataProps } from "./TripTracking.model";
import { CommonState } from "../../reducers";

import { cityLatLongs, currentLocations, hops } from "../../fixtures/MapMocks";
import Button from "../@styled/StyledButton";
import { TranslationText } from "../InternationalisationProvider";
import { SecondaryLabel, PrimaryText } from "../@styled/Text";

const MapmyIndia = require("mmi-widget");

const screen = Dimensions.get("window");
const screenHeight = screen.height;

const mapStateToProps = (state: CommonState, props: Props): TTDataProps => {
  const trip = (state.trips.data || []).find(
    t => t.id === props.route.params.tripId
  );
  const pickupCity = ((trip && trip.pickUp_location.city) || "").toLowerCase();
  const dropCity = ((trip && trip.delivery_location.city) || "").toLowerCase();
  const delay = trip && trip.trip && trip.trip.status;

  // @ts-ignore
  const source = cityLatLongs[pickupCity];
  // @ts-ignore
  const destination = cityLatLongs[dropCity];
  // @ts-ignore
  const currentLocation = currentLocations[`${pickupCity}_${dropCity}`];
  // @ts-ignore
  const completedHops = hops[`${pickupCity}_${dropCity}`];
  const status = delay ? "DELAYED" : "ON-TIME";

  return {
    source,
    destination,
    currentLocation,
    completedHops,
    status,
    pickupCity: pickupCity,
    dropCity
  };
};

const connector = connect(mapStateToProps, null);

const HeadBox: React.FC<{ bigText: string; smallText: string }> = ({
  bigText = "",
  smallText = ""
}) => (
  <Flex1 alignItems="center">
    <SecondaryLabel>{smallText}</SecondaryLabel>
    <PrimaryText fontWeight="bold">{(bigText || "").toUpperCase()}</PrimaryText>
  </Flex1>
);

interface TripHead {
  pickupCity: string;
  dropCity: string;
  pickUpEta: string;
  dropEta: string;
}
const TripHead: React.FC<TripHead> = ({
  pickupCity,
  dropCity,
  pickUpEta,
  dropEta
}) => {
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
      <HeadBox bigText={pickupCity} smallText={pickUpEta} />
      <FlexCenter>
        <Text color="black.0" px={2} fontSize={40} lineHeight="40px">
          →
        </Text>
      </FlexCenter>
      <HeadBox bigText={dropCity} smallText={dropEta} />
    </FlexRow>
  );
};

type Props = StackScreenProps<
  {
    TripTracking: {
      tripId: number;
    };
  },
  "TripTracking"
>;

const TripTracking: React.FC<Props & TTDataProps> = ({
  status,
  pickupCity,
  dropCity,
  ...props
}) => {
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
        <Text mb={3} style={{ flexWrap: "wrap" }}>
          <TranslationText id="trip.tracking.not.available" />
        </Text>
        <Button
          onPress={onBackPress}
          title={<TranslationText id="go.back" />}
        />
      </Flex1>
    );
  }

  const TrackingComponent = MapmyIndia.default.MapmyIndiaULIPTrip;

  return (
    <>
      <Flex1>
        <TopBar {...{ onBackPress, tripId: tripId.toString(), status }} />
        <TrackingComponent
          style={{ flex: 1 }}
          requestType="2"
          vehicalType="truck"
          destinationLat={19.07609}
          destinationLng={72.877426}
          refreshInterVal={5000}
        />
        <ScrollBottomSheet
          componentType="FlatList"
          snapPoints={["30%", "60%", screenHeight - 80]}
          initialSnapIndex={2}
          renderHandle={() => (
            <TripHead
              pickupCity={pickupCity}
              pickUpEta="21 JUN, 3:00 AM"
              dropCity={dropCity}
              dropEta="30 JUN, 6:00 PM"
            />
          )}
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
            backgroundColor: "white",
            flex: 1
          }}
        />
      </Flex1>
    </>
  );
};

export default connector(TripTracking);
