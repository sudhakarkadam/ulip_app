import React from "react";
import { FlexColumn, Flex } from "../../../components/@styled/BaseElements";
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
      name: trip.pickUp_location.city,
      state: trip.pickUp_location.state,
      address: trip.pickUp_location.address
    },
    {
      name: trip.delivery_location.city,
      state: trip.delivery_location.state,
      address: trip.delivery_location.address
    }
  ];
  return (
    <FlexColumn mt={3} backgroundColor="white" flex={1}>
      <TripDetails
        id={trip.id.toString()}
        pickupDate={new Date(trip.pickup_date)}
        truckType={trip.truck_type_preference}
        truckWeight={trip.weight.toString()}
        truckUnit={trip.weight_unit}
        lspProvider={trip.lsp_name}
        places={places}
      />
      <Flex style={{ flexDirection: "row", marginHorizontal: 25 }}>
        <StyledButton
          title="Accept"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(
              <AcceptTripModal
                onAccept={props.acceptTrip}
                onClose={props.hideModal}
                returningScreen={props.onAction}
                id={props.tripDetails.id}
              />
              // , [
              // {
              //   text: "CLOSE",
              //   action: () => {
              //     console.log("clicked OK");
              //     props.hideModal();
              //     return {};
              //   }
              // },
              // {
              //   text: "ACCEPT",
              //   action: () => {
              //     console.log("clicked NOT OK");
              //     return {};
              //   }
              // }
              // ]
            );
          }}
        />
        <StyledButton
          title="Reject"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(
              <RejectTripModal
                onReject={props.rejectTrip}
                onClose={props.hideModal}
                returningScreen={props.onAction}
                id={props.tripDetails.id}
              />
              //   , [
              //   {
              //     text: "CLOSE",
              //     action: () => {
              //       console.log("clicked OK");
              //       props.hideModal();
              //       return {};
              //     }
              //   },
              //   {
              //     text: "REJECT",
              //     action: () => {
              //       console.log("clicked NOT OK");
              //       return {};
              //     }
              //   }
              // ]
            );
          }}
        />
      </Flex>
      {/* Add footer here */}
    </FlexColumn>
  );
};

export default connector(withModal(TripAcceptPage));
