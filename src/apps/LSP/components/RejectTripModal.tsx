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
import { ToastAndroid } from "react-native";

interface OwnProps {
  onReject: (
    apiArgs: TripRejectRequest
  ) => Promise<
    ReduxCustomAction<LSPActionTypes.TRIP_REJECT_SUCCESS, TripRejectRequest, {}>
  >;
  onClose: () => void;
  returningScreen: () => void;
  id: number;
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
            props
              .onReject({ reason: reason, sr_id: props.id })
              .then(() => {
                props.onClose();
                ToastAndroid.show(
                  "Trip Successfully Rejected",
                  ToastAndroid.SHORT
                );
                props.returningScreen();
              })
              .catch(() => {
                ToastAndroid.show(
                  "Something went wrong. Please try again later.",
                  ToastAndroid.SHORT
                );
              })
          }
        />
      </FlexRow>
    </Flex>
  );
};

export default RejectTripModal;
