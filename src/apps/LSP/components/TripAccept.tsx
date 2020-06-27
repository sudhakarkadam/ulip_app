import React from "react";
import { FlexColumn, Flex } from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import withModal, {
  IWithModalInjectedProps
} from "../../../components/@styled/Modal";
import TripDetails from "../../../components/TripDetails";
import AcceptTripModal from "./AcceptTripModal";
import RejectTripModal from "./RejectTripModal";

const TripAcceptPage = (props: IWithModalInjectedProps) => {
  return (
    <FlexColumn mt={3} backgroundColor="white" flex={1}>
      <TripDetails />
      <Flex style={{ flexDirection: "row", marginHorizontal: 25 }}>
        <StyledButton
          title="Accept"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(<AcceptTripModal />, [
              {
                text: "CLOSE",
                action: () => {
                  console.log("clicked OK");
                  props.hideModal();
                  return {};
                }
              },
              {
                text: "ACCEPT",
                action: () => {
                  console.log("clicked NOT OK");
                  return {};
                }
              }
            ]);
          }}
        />
        <StyledButton
          title="Reject"
          style={{ flex: 1 }}
          onPress={() => {
            props.showModal(<RejectTripModal />, [
              {
                text: "CLOSE",
                action: () => {
                  console.log("clicked OK");
                  props.hideModal();
                  return {};
                }
              },
              {
                text: "REJECT",
                action: () => {
                  console.log("clicked NOT OK");
                  return {};
                }
              }
            ]);
          }}
        />
      </Flex>
      {/* Add footer here */}
    </FlexColumn>
  );
};

export default withModal(TripAcceptPage);
