import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CreateTrip from "./CreateTrip";
import { HomeStackParamList } from "./HomeStack";

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip">;

const ShipperCreateTrip = (props: CreateTripProps) => {
  return (
    <CreateTrip
      createTripCallback={() => {
        props.navigation.navigate("MainTripListing");
        return;
      }}
    />
  );
};

export default ShipperCreateTrip;
