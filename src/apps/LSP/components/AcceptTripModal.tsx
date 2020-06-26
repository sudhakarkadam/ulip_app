import React, { useState } from "react";
import { Flex, TextWrapper } from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import Input from "../../../components/InputComponent";
import SelectComponent from "../../../components/SelectComponent";

const AcceptTripModal = () => {
  const [driverName, setDriverName] = useState("");
  const [driverMobile, setDriverMobile] = useState("");

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
          getSelectedValue={() => {}}
        />
      </TextWrapper>
    </Flex>
  );
};

export default AcceptTripModal;
