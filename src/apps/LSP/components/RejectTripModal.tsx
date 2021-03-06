import React, { useState, useContext } from "react";
import { Flex, FlexRow } from "../../../components/@styled/BaseElements";
import { PrimaryText, TextWrapper } from "../../../components/@styled/Text";
import SelectComponent from "../../../components/SelectComponent";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import { ToastAndroid } from "react-native";
import {
  TranslationText,
  I18nContext
} from "../../../components/InternationalisationProvider";
import ActionCreators from "../../../actions/ActionCreators";
import { ConnectedProps, connect } from "react-redux";

const { rejectTrip } = ActionCreators;
const connector = connect(null, { rejectTrip });
type RejectTripType = ConnectedProps<typeof connector>["rejectTrip"];

interface OwnProps {
  onReject: RejectTripType;
  onClose: () => void;
  returningScreen: () => void;
  id: number;
  rejectReasons: string[];
}

const RejectTripModal = (props: OwnProps) => {
  const [reason, setReason] = useState("");
  const { translate } = useContext(I18nContext);
  return (
    <Flex>
      <PrimaryText>
        <TranslationText id="are.you.sure" />
      </PrimaryText>
      <TextWrapper label={<TranslationText id="choose.reason" />}>
        <SelectComponent
          placeholder={translate("choose.a.reason")}
          data={props.rejectReasons.map(reason => ({
            label: reason,
            value: reason
          }))}
          defaultValue={""}
          getSelectedValue={val => setReason(val)}
        />
      </TextWrapper>
      <FlexRow mt={4}>
        <StyledButton
          title={<TranslationText id="close" />}
          style={{ flex: 1 }}
          variant={"outline"}
          onPress={props.onClose}
        />
        <StyledButton
          title={<TranslationText id="reject" />}
          style={{ flex: 1 }}
          disabled={!reason}
          onPress={() =>
            props
              .onReject({ reject_reason: reason, tsr_id: props.id })
              .then(() => {
                props.onClose();
                ToastAndroid.show(
                  translate("trip.successfully.rejected"),
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
        />
      </FlexRow>
    </Flex>
  );
};

export default RejectTripModal;
