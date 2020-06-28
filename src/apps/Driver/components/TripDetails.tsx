import React from "react";
import { Flex } from "../../../components/@styled/BaseElements";
import TripDetails from "../../../components/TripDetails";

import { DriverAppState } from "../reducers";
import { connect, ConnectedProps } from "react-redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { convert } from "../../../components/TripStamp";

const mapStateToProps = (state: DriverAppState) => ({
  trips: state.trips
});
const connector = connect(mapStateToProps, null);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "Trip">;
};

const TripDetailsPage: React.FC<Props> = props => {
  const trip = props.trips.data[0];

  if (!trip) return null;
  return (
    <Flex backgroundColor="white">
      <TripDetails
        id={trip.trip.id + ""}
        pickupDate={new Date(trip.pickup_date)}
        places={[
          convert(trip.pickUp_location),
          convert(trip.delivery_location)
        ]}
        truckType={trip.truck_type_preference}
        truckUnit={trip.weight_unit}
        truckWeight={trip.weight}
      />
    </Flex>
  );
};

export default connector(TripDetailsPage);
