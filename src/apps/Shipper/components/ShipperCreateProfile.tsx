import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";

const personIcon = require("../../../icons/person-icon.png");

type ScreenProps = StackScreenProps<{ [key: string]: undefined }, "Profile">;

const ShipperCreateProfile = (props: ScreenProps) => {
  return (
    <Flex>
      <CardComp
        cardHeading="STEP 1"
        taskHeading="Profile set up"
        imgSrc={personIcon}
        taskClickCallback={() => props.navigation.navigate("PersonProfile")}
      ></CardComp>
      <CardComp
        cardHeading="STEP 2"
        taskHeading="Company set up"
        imgSrc={personIcon}
        taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
      ></CardComp>
    </Flex>
  );
};

export default ShipperCreateProfile;
