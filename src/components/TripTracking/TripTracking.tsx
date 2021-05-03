import React from "react";
import { Dimensions } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";

import { Text } from "../@styled/BaseElements";
import { Flex, Flex1, FlexRow, FlexCenter } from "../@styled/Flex";
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
import ActionCreators from "../../actions/ActionCreators";
import { useEffect } from "react";
import { isLoading, isInit } from "../../utils/actionCreator";
import BlockScreenLoader from "../BlockScreenLoader";
import moment from "moment";
import EWayBillCard from "../EWayBillCard";
import { TripStackList } from "../../apps/LSP/components/LSPTripStack";

const MapmyIndia = require("mmi-widget");

const screen = Dimensions.get("window");
const screenHeight = screen.height;

const mapStateToProps = (state: CommonState): TTDataProps => {
  const trip = state.driverTrip.data;
  const pickupCity = (trip?.source_location_details.city || "").toLowerCase();
  const dropCity = (
    trip?.destination_location_details.city || ""
  ).toLowerCase();
  const delay = trip?.trip_status;

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
    dropCity,
    trackingId: trip?.tracking_request_id || "",
    driverTrip: state.driverTrip
  };
};

const { getTripById } = ActionCreators;

const mapDispatchToProps = { getTripById };

const connector = connect(mapStateToProps, mapDispatchToProps);

const HeadBox: React.FC<{ bigText: string; smallText: string }> = ({
  bigText = "",
  smallText = ""
}) => (
  <Flex1 alignItems="center">
    <SecondaryLabel style={{ textTransform: "uppercase" }}>
      {smallText}
    </SecondaryLabel>
    <PrimaryText fontWeight="bold">{(bigText || "").toUpperCase()}</PrimaryText>
  </Flex1>
);

interface TripHead {
  pickupCity: string;
  dropCity: string;
  pickUpEta: string;
  dropEta: string;
  ewbStatus?: string;
  ewbNumber?: string;
  tripId: number;
  navigation?: StackNavigationProp<TripStackList, "EWayBillGenerationPage">;
}
const TripHead: React.FC<TripHead> = ({
  pickupCity,
  dropCity,
  pickUpEta,
  dropEta,
  ewbStatus,
  ewbNumber,
  tripId,
  navigation
}) => {
  return (
    <Flex>
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
      <FlexRow bg="white" width={"100%"}>
        <EWayBillCard
          status={ewbStatus}
          ewbNumber={ewbNumber}
          tripId={tripId}
          navigation={navigation}
        />
      </FlexRow>
    </Flex>
  );
};

type ScreenProps = StackScreenProps<
  {
    TripTracking: {
      tripId: number;
    };
  },
  "TripTracking"
>;

interface TripNavProps {
  navigation?: StackNavigationProp<TripStackList, "EWayBillGenerationPage">;
}

type Props = ConnectedProps<typeof connector> & ScreenProps & TripNavProps;

const TripTracking: React.FC<Props> = ({
  status,
  pickupCity,
  dropCity,
  trackingId,
  ...props
}) => {
  const { navigation, route, driverTrip } = props;
  const { ewb_status, ewb_number } = driverTrip?.data || {};
  const { tripId } = route.params;

  const onBackPress = () => navigation.goBack();

  useEffect(() => {
    props.getTripById(tripId + "");
  }, []);

  if (isLoading(driverTrip) || isInit(driverTrip)) {
    return <BlockScreenLoader></BlockScreenLoader>;
  }

  const isTripNotTrackable = !pickupCity || !dropCity;
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
          requestType={trackingId}
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
              pickUpEta={moment(driverTrip.data?.pickup_request_time).format(
                "DD MMM, hh:mm a"
              )}
              dropCity={dropCity}
              dropEta="-- NA --"
              navigation={navigation}
              tripId={tripId}
              ewbNumber={ewb_number}
              ewbStatus={ewb_status}
            />
          )}
          // ListHeaderComponent={
          //   <FlexRow bg="white" pt={4} px={3}>
          //     <Tag text="LOCATIONS" />
          //   </FlexRow>
          // }
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
