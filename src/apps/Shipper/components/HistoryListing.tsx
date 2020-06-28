import React from "react";
import { Flex1 } from "../../../components/@styled/Flex";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps } from "../../../models/CommonModel";
import { ShipperAppState } from "../reducers";
import { ConnectedProps, connect } from "react-redux";

const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const connector = connect(mapStateToProps, {} as any);

type OwnProps = ConnectedProps<typeof connector>;

const HistoryListing = (props: OwnProps) => {
  const businessId = props.userInfo?.business_details?.business_id;
  return (
    <>
      <Flex1 bg="white">
        <TripList
          listingMode={ListingModes.COMPLETED}
          from={AllApps.SHIPPER}
          businessId={businessId}
        />
      </Flex1>
    </>
  );
};

export default connector(HistoryListing);
