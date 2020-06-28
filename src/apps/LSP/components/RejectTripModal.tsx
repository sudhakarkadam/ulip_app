import React, { useState } from "react";
import {
  Flex,
  TextWrapper,
  FlexRow
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import SelectComponent from "../../../components/SelectComponent";
import { TripRejectRequest } from "../models/TripAcceptance";
import { ReduxCustomAction } from "../../../utils/actionCreator";
import LSPActionTypes from "../actions/LSPActions";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";

interface OwnProps {
  onReject: (
    apiArgs: TripRejectRequest
  ) => Promise<
    ReduxCustomAction<LSPActionTypes.TRIP_REJECT_SUCCESS, TripRejectRequest, {}>
  >;
  onClose: () => void;
  returningScreen: () => void;
}

const RejectTripModal = (props: OwnProps) => {
  const [reason, setReason] = useState("");
  return (
    <Flex>
      <PrimaryText>Are you sure?</PrimaryText>
      <TextWrapper label="Choose Reason">
        <SelectComponent
          data={[{ label: "Drivers Unavailable", value: "xyz" }]}
          defaultValue={"xyz"}
          getSelectedValue={val => setReason(val)}
        />
      </TextWrapper>
      <FlexRow mt={4}>
        <StyledButton
          title="Close"
          style={{ flex: 1 }}
          variant={"outline"}
          onPress={props.onClose}
        />
        <StyledButton
          title="Reject"
          style={{ flex: 1 }}
          onPress={() =>
            props.onReject({ reason: reason, sr_id: 1 }).then(() => {
              props.onClose();
              props.returningScreen();
            })
          }
        />
      </FlexRow>
    </Flex>
  );
};

export default RejectTripModal;
