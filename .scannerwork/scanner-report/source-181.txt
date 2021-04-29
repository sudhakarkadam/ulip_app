import React, { useState } from "react";
import { Flex, FlexRow } from "../../../components/@styled/BaseElements";
import { PrimaryText, TextWrapper } from "../../../components/@styled/Text";
import Input from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";

import { ToastAndroid } from "react-native";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { VehicleListDetails } from "../../../models/CommonModel";
import ActionCreators from "../../../actions/ActionCreators";
import { ConnectedProps, connect } from "react-redux";
import { I18nContext } from "../../../components/InternationalisationProvider";
import { useContext } from "react";

const { acceptTrip } = ActionCreators;
const connector = connect(null, { acceptTrip });
type AcceptTripType = ConnectedProps<typeof connector>["acceptTrip"];

interface OwnProps {
  onAccept: AcceptTripType;
  onClose: () => void;
  returningScreen: () => void;
  id: number;
  vehiclesList: VehicleListDetails[];
}

const AcceptTripModal = (props: OwnProps) => {
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");
  const [truck, setTruck] = useState("");
  const { translate } = useContext(I18nContext);

  return (
    <Flex>
      <PrimaryText mb={4}>
        <TranslationText id="driver.details" />
      </PrimaryText>
      <TextWrapper label={<TranslationText id="driver.name" />}>
        <Input value={driverName} onChangeText={text => setDriverName(text)} />
      </TextWrapper>
      <TextWrapper label={<TranslationText id="mobile.number" />}>
        <Input
          value={driverMobile}
          keyboardType={"numeric"}
          maxLength={10}
          onChangeText={text => setDriverMobile(text)}
        />
      </TextWrapper>
      <TextWrapper label={<TranslationText id="choose.truck" />}>
        <SelectComponent
          placeholder={translate("select.truck")}
          data={(props.vehiclesList || []).map(vehicle => ({
            label: vehicle.truck_name,
            value: vehicle.vehicle_id?.toString()
          }))}
          defaultValue={""}
          getSelectedValue={val => setTruck(val)}
        />
      </TextWrapper>
      <FlexRow mt={4}>
        <StyledButton
          title={translate("close")}
          style={{ flex: 1 }}
          variant={"outline"}
          onPress={props.onClose}
        />
        <StyledButton
          title={translate("accept")}
          style={{ flex: 1 }}
          onPress={() =>
            props
              .onAccept({
                tsr_id: props.id,
                driver_name: driverName,
                driver_phone_number: driverMobile,
                vehicle_id: Number(truck)
              })
              .then(() => {
                props.onClose();
                ToastAndroid.show(
                  translate("trip.successfully.accepted"),
                  ToastAndroid.SHORT
                );
                props.returningScreen();
              })
              .catch(() => {
                ToastAndroid.show(
                  translate("something.went wrong.please.try.again.later"),
                  ToastAndroid.SHORT
                );
              })
          }
          disabled={!driverName || !driverMobile || !truck}
        />
      </FlexRow>
    </Flex>
  );
};

export default AcceptTripModal;
