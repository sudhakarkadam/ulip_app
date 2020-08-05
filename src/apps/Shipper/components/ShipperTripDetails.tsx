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
          id={tripData.tsr_id + ""}
          pickupDateString={new Date(
            tripData.pickup_request_time
          ).toLocaleDateString()}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight + ""}
          truckUnit={tripData.weight_unit}
          places={[
            tripData.source_location_details,
            tripData.destination_location_details
          ]}
          goodsSegment={tripData.goods_segment}
          documents={tripData.trip_details.documents}
        />
      </PageContent>
    </Page>
  );
};

export default ShipperTripDetails;
