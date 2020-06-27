import React from "react";
import PersonProfile from "../../../components/PersonProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./Root";

type Props = StackScreenProps<RootStackParamList, "PersonProfile">;

const DriverPersonProfile = (props: Props) => {
  return (
    <PersonProfile
      createProfileCallback={() => props.navigation.navigate("TripStart")}
    />
  );
};

export default DriverPersonProfile;
