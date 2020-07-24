import React from "react";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import { CommonState } from "../../../reducers";
import { ConnectedProps, connect } from "react-redux";
import { Page, PageContent } from "../../../components/@styled/Page";

const mapStateToProps = (state: CommonState) => ({
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
    <Page>
      <PageContent>
        <TripList
          listingMode={ListingModes.COMPLETED}
          from={AllApps.SHIPPER}
          businessId={businessId}
          onRowClick={handleRowClick}
        />
      </PageContent>
    </Page>
  );
};

export default connector(HistoryListing);
