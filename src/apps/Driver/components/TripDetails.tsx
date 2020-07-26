import React from "react";
import { Flex } from "../../../components/@styled/BaseElements";
import TripDetails from "../../../components/TripDetails";
import { PrimaryText } from "../../../components/@styled/Text";

import { connect, ConnectedProps } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { convert } from "../../../components/TripStamp";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { CommonState } from "../../../reducers";

const mapStateToProps = (state: CommonState) => ({
  trip: state.driverTrip
});
const connector = connect(mapStateToProps, {});

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripDetails">;
};

const TripDetailsPage: React.FC<Props> = props => {
  const trip = props.trip.data;

  if (!trip)
    return (
      <PrimaryText>
        <TranslationText id="does.not.exist" />
      </PrimaryText>
    );
  return (
    <Flex backgroundColor="white">
      <TripDetails
        id={trip.trip_id + ""}
        pickupDate={new Date(trip.pickup_request_time)}
        places={[
          convert(trip.source_location_details),
          convert(trip.destination_location_details)
        ]}
        truckType={trip.vehicle_details.truck_type}
        truckUnit={trip.weight_unit}
        truckWeight={trip.weight + ""}
        documents={trip.documents as any}
      />
    </Flex>
  );
};

export default connector(TripDetailsPage);
