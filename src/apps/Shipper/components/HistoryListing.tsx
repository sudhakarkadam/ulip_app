import React from "react";
import { Flex1 } from "../../../components/@styled/Flex";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import { ShipperAppState } from "../reducers";
import { ConnectedProps, connect } from "react-redux";

const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const connector = connect(mapStateToProps, {} as any);

type OwnProps = ConnectedProps<typeof connector>;

const HistoryListing = (props: OwnProps) => {
  const businessId = props.userInfo?.business_details?.business_id;
  const handleRowClick = (_: any, trip: GetTripsResponse) => {
    props.navigation.push("ShipperTripDetails", { data: JSON.stringify(trip) });
  };
  return (
    <>
      <Flex1 bg="white">
        <TripList
          listingMode={ListingModes.COMPLETED}
          from={AllApps.SHIPPER}
          businessId={businessId}
          onRowClick={handleRowClick}
        />
      </Flex1>
    </>
  );
};

export default connector(HistoryListing);
