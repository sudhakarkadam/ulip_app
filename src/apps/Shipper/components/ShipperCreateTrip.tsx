import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";
import CreateTrip from "./CreateTrip";
import { HomeStackParamList } from "./HomeStack";

const { createTrip } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { createTrip };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip"> &
  ConnectedProps<typeof connector>;

const ShipperCreateTrip = (props: CreateTripProps) => {
  const { userInfo } = props;
  const businessId =
    userInfo && userInfo.business_details
      ? userInfo.business_details.business_id
      : 0;
  return (
    <CreateTrip
      createTripCallback={async () => {
        //@ts-ignore
        await props.createTrip({ business_id: businessId });
        props.navigation.navigate("MainTripListing");
        return;
      }}
    />
  );
};

export default connector(ShipperCreateTrip);
