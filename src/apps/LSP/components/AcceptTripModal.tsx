import React, { useState } from "react";
import {
  Flex,
  TextWrapper,
  FlexRow
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import Input from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import { TripAcceptRequest } from "../models/TripAcceptance";
import { ReduxCustomAction } from "../../../utils/actionCreator";
import LSPActionTypes from "../actions/LSPActions";
import { ToastAndroid } from "react-native";

interface OwnProps {
  onAccept: (
    apiArgs: TripAcceptRequest
  ) => Promise<
    ReduxCustomAction<LSPActionTypes.TRIP_ACCEPT_SUCCESS, TripAcceptRequest, {}>
  >;
  onClose: () => void;
  returningScreen: () => void;
  id: number;
}

const AcceptTripModal = (props: OwnProps) => {
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [truck, setTruck] = useState("");

  return (
    <Flex>
      <PrimaryText>Driver Details</PrimaryText>
      <TextWrapper label="Driver's Name">
        <Input value={driverName} onChangeText={text => setDriverName(text)} />
      </TextWrapper>
      <TextWrapper label="Mobile Number">
        <Input
          value={driverMobile}
          keyboardType={"numeric"}
          maxLength={10}
          onChangeText={text => setDriverMobile(text)}
        />
      </TextWrapper>
      <TextWrapper label="Choose Truck">
        <SelectComponent
          data={[{ label: "EICHER 19 FEET", value: "xyz" }]}
          defaultValue={"xyz"}
          getSelectedValue={val => setTruck(val)}
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
          title="Accept"
          style={{ flex: 1 }}
          onPress={() =>
            props
              .onAccept({
                sr_id: props.id,
                driver: {
                  name: driverName,
                  mobile_number: driverMobile
                },
                truck_type: truck
              })
              .then(() => {
                props.onClose();
                ToastAndroid.show(
                  "Trip Successfully Accepted",
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
          disabled={!driverName || !driverMobile}
        />
      </FlexRow>
    </Flex>
  );
};

export default AcceptTripModal;
