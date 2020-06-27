import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import { RootStackParamList } from "./AuthenticatedFlow";

const personIcon = require("../../../icons/person-icon.png");

type ScreenProps = StackScreenProps<RootStackParamList, "CreateProfile">;

const DriverCreateProfile = (props: ScreenProps) => {
  return (
    <Flex mt={4}>
      <CardComp
        cardHeading="STEP 1"
        taskHeading="Profile set up"
        imgSrc={personIcon}
        taskClickCallback={() => props.navigation.navigate("PersonProfile")}
      ></CardComp>
    </Flex>
  );
};

export default DriverCreateProfile;
