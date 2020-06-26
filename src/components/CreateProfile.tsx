import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "./CardComp";
import { Flex } from "./@styled/BaseElements";

const personIcon = require("../icons/person-icon.png");

type ScreenProps = StackScreenProps<{ [key: string]: undefined }, "Profile">;

const CreateProfile = (props: ScreenProps) => {
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

export default CreateProfile;
