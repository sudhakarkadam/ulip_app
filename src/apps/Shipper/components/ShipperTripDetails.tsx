import React from "react";
import { StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import TripDetails from "../../../components/TripDetails";
import { HomeStackParamList } from "./HomeStack";
import { GetTripsResponse } from "../../../models/CommonModel";
import { Page, PageContent } from "../../../components/@styled/Page";

type ShipperTripDetailsProps = StackScreenProps<
  HomeStackParamList,
  "ShipperTripDetails"
>;

interface TripNavProps {
  disableEWB?: boolean;
  navigation?: StackNavigationProp<
    HomeStackParamList,
    "EWayBillGenerationPage"
  >;
}

const ShipperTripDetails = (props: ShipperTripDetailsProps & TripNavProps) => {
  const { data } = props.route.params;
  const tripData = JSON.parse(data) as GetTripsResponse;
  return (
    <Page>
      <PageContent>
        <TripDetails
          id={tripData.tsr_id + ""}
          pickupDateString={moment(
            new Date(tripData.pickup_request_time),
            moment.defaultFormatUtc
          ).format("DD/MM/YYYY")}
          truckType={tripData.truck_type_preference}
          truckWeight={tripData.weight + ""}
          truckUnit={tripData.weight_unit}
          places={[
            tripData.source_location_details,
            tripData.destination_location_details
          ]}
          goodsSegment={tripData.goods_segment}
          documents={tripData.trip_details?.documents || []}
          showEwb={!props.disableEWB}
          navigation={props.navigation}
          ewbNumber={tripData.trip_details?.ewb_number}
          ewbStatus={tripData.trip_details?.ewb_status}
          tripId={tripData.trip_details?.id}
        />
      </PageContent>
    </Page>
  );
};

export default ShipperTripDetails;
