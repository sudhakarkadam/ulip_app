import React from "react";
import { Flex, TextWrapper } from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import SelectComponent from "../../../components/SelectComponent";

const RejectTripModal = () => {
  return (
    <Flex>
      <PrimaryText>Are you sure?</PrimaryText>
      <TextWrapper label="Choose Reason">
        <SelectComponent
          data={[{ label: "Drivers Unavailable", value: "xyz" }]}
          defaultValue={"xyz"}
          getSelectedValue={() => {}}
        />
      </TextWrapper>
    </Flex>
  );
};

export default RejectTripModal;
