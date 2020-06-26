import React from "react";
import { FlexColumn, Flex } from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import styled from "styled-components/native";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import withModal, {
  IWithModalInjectedProps
} from "../../../components/@styled/Modal";
import AcceptTripModal from "./AcceptTripModal";
import RejectTripModal from "./RejectTripModal";

const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
  margin-horizontal: 25;
`;

const TripAcceptPage = (props: IWithModalInjectedProps) => {
  return (
    <FlexColumn mt={3} backgroundColor="white" flex={1}>
      <Card
        style={{
          paddingVertical: 10,
          paddingHorizontal: 25,
          marginHorizontal: 0,
          borderStyle: "dashed", // dashed border not coming.
          borderRadius: 1,
          flexDirection: "row"
        }}
      >
        <PrimaryText style={{ textTransform: "uppercase" }}>
          trip id:{" "}
        </PrimaryText>
        <PrimaryText style={{ fontWeight: "bold" }}>
          TR29182917182717
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Pickup Date</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          30/06/2020
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Truck Type</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          Open
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Required Weight</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          2.5 Ton
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7, borderBottomColor: "white" }}>
        <PrimaryText>Uploaded Documents</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          ---
        </PrimaryText>
      </Card>
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
