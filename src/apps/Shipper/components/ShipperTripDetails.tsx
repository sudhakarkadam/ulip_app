import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import TripDetails from "../../../components/TripDetails";
import { HomeStackParamList } from "./HomeStack";
import { GetTripsResponse } from "../../../models/CommonModel";
import { Page, PageContent } from "../../../components/@styled/Page";

type ShipperTripDetailsProps = StackScreenProps<
  HomeStackParamList,
  "ShipperTripDetails"
>;

const ShipperTripDetails = (props: ShipperTripDetailsProps) => {
  const { data } = props.route.params;
  const tripData = JSON.parse(data) as GetTripsResponse;
  return (
    <Page>
      <PageContent>
        <TripDetails
          id={tripData.tsr_id as any}
          pickupDateString={tripData.pickup_date as any}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight as any}
          truckUnit={tripData.weight_unit}
          lspProvider={tripData.legal_name}
          places={
            [
              {
                name: tripData.source_location_details.city,
                ...tripData.source_location_details
              },
              {
                name: tripData.destination_location_details.city,
                ...tripData.destination_location_details
              }
            ] as any
          }
          documents={tripData.trip_details?.documents || []}
        />
      </PageContent>
    </Page>
  );
};

export default ShipperTripDetails;
