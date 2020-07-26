import React from "react";
import { Flex, ScrollView } from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import withModal, {
  IWithModalInjectedProps
} from "../../../components/@styled/Modal";
import TripDetails from "../../../components/TripDetails";
import AcceptTripModal from "./AcceptTripModal";
import RejectTripModal from "./RejectTripModal";
import { LSPAppState } from "../reducers";
import { connect, ConnectedProps } from "react-redux";
import LSPActionCreators from "../actions/LSPActionCreators";
import { GetTripsResponse } from "../../../models/CommonModel";
const { acceptTrip, rejectTrip } = LSPActionCreators;

interface OwnProps {
  onAction: () => void;
  tripDetails: GetTripsResponse;
}

const mapStateToProps = (state: LSPAppState) => ({
  acceptedTripStatus: state.acceptedTripStatus,
  rejectedTripStatus: state.rejectedTripStatus
});
const mapDispatchToProps = { acceptTrip, rejectTrip };
const connector = connect(mapStateToProps, mapDispatchToProps);

const TripAcceptPage = (
  props: OwnProps & IWithModalInjectedProps & ConnectedProps<typeof connector>
) => {
  const trip = props.tripDetails;
  const places = [
    {
      name: trip.source_location_details.city,
      state: trip.source_location_details.state,
      address: trip.source_location_details.address
    },
    {
      name: trip.destination_location_details.city,
      state: trip.destination_location_details.state,
      address: trip.destination_location_details.address
    }
  ];
  return (
    <ScrollView mt={3} backgroundColor="white" flex={1}>
      <TripDetails
        id={trip.tsr_id.toString()}
        pickupDate={new Date(trip.pickup_date)}
        truckType={trip.truck_type_preference}
        truckWeight={trip.weight.toString()}
        truckUnit={trip.weight_unit}
        lspProvider={trip.legal_name}
        places={places}
        documents={trip.trip_details?.documents}
      />
      <Flex style={{ flexDirection: "row", marginHorizontal: 25 }}>
        <StyledButton
          title="Reject"
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(
              <RejectTripModal
                onReject={props.rejectTrip}
                onClose={props.hideModal}
                returningScreen={props.onAction}
                id={props.tripDetails.tsr_id}
              />
            );
          }}
        />
        <StyledButton
          title="Accept"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(
              <AcceptTripModal
                onAccept={props.acceptTrip}
                onClose={props.hideModal}
                returningScreen={props.onAction}
                id={props.tripDetails.tsr_id}
              />
            );
          }}
        />
      </Flex>
    </ScrollView>
  );
};

export default connector(withModal(TripAcceptPage));
