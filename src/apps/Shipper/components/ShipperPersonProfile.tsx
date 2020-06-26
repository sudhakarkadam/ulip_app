import React from "react";
import PersonProfile from "../../../components/PersonProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./AuthenticatedFlow";

type Props = StackScreenProps<RootStackParamList, "PersonProfile">;

const ShipperPersonProfile = (props: Props) => {
  return (
    <PersonProfile
      createProfileCallback={() => props.navigation.navigate("CreateTrip")}
    />
  );
};

export default ShipperPersonProfile;
