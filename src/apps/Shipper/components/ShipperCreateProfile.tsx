import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import { RootStackParamList } from "./AuthenticatedFlow";
import CreateTripCard from "./CreateTripCard";

const personIcon = require("../../../icons/person-icon.png");

type ScreenProps = StackScreenProps<RootStackParamList, "CreateProfile">;

const ShipperCreateProfile = (props: ScreenProps) => {
  return (
    <Flex>
      <CardComp
        cardHeading="STEP 1"
        taskHeading="Profile set up"
        imgSrc={personIcon}
        taskClickCallback={() => props.navigation.navigate("PersonProfile")}
      ></CardComp>
      <Flex mt={3} />
      <CardComp
        cardHeading="STEP 2"
        taskHeading="Company set up"
        imgSrc={personIcon}
        taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
      ></CardComp>
      <Flex mt={3} />
      <CreateTripCard
        createTripCallback={() => props.navigation.navigate("CreateTrip")}
      />
    </Flex>
  );
};

export default ShipperCreateProfile;
