import React from "react";
import { Flex1 } from "../../../components/@styled/Flex";
import { PrimaryHeaderText } from "../../../components/@styled/Text";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";

const TruckSelect = (props: any) => {
  return (
    <Flex1>
      <PrimaryHeaderText>I am search</PrimaryHeaderText>
      <StyledButton
        title="Go back"
        onPress={() => props.navigation.goBack()}
      ></StyledButton>
    </Flex1>
  );
};

export default TruckSelect;
