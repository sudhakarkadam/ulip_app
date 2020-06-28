import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Flex } from "../../../components/@styled/BaseElements";
import TripDetails from "../../../components/TripDetails";
import { HomeStackParamList } from "./HomeStack";
import { GetTripsResponse } from "src/models/CommonModel";

type ShipperTripDetailsProps = StackScreenProps<
  HomeStackParamList,
  "ShipperTripDetails"
>;

const ShipperTripDetails = (props: ShipperTripDetailsProps) => {
  const { data } = props.route.params;
  const tripData = JSON.parse(data) as GetTripsResponse;
  return (
    <Flex height="100%" backgroundColor="white">
      <TripDetails
        id={tripData.id as any}
        pickupDate={tripData.pickup_date as any}
        truckType={tripData.truck_type_preference}
        truckWeight={tripData.weight as any}
        truckUnit={tripData.weight_unit}
        lspProvider={tripData.lsp_name}
        places={
          [
            {
              name: tripData.pickUp_location.city,
              ...tripData.pickUp_location
            },
            {
              name: tripData.delivery_location.city,
              ...tripData.delivery_location
            }
          ] as any
        }
      />
    </Flex>
  );
};

export default ShipperTripDetails;
