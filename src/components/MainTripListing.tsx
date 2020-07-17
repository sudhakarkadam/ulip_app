import React, { useEffect } from "react";
import { Text, Box, Flex } from "./@styled/BaseElements";
import { Flex1 } from "./@styled/Flex";
import FloatingButton from "./@styled/FloatingButton";
import CreateTripCard from "./CreateTripCard";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "./HomeStack";
import { TripList, ListingModes } from "./TripListing";
import { AllApps, GetTripsResponse } from "../models/CommonModel";
import { CommonState } from "../reducers";
import { ConnectedProps, connect } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import { isLoading, isInit } from "../utils/actionCreator";
import BlockScreenLoader from "./BlockScreenLoader";

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  metrics: state.HomeMetrics
});

const { getMetrics } = ActionCreators;
const mapDispatchToProps = { getMetrics };

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = StackScreenProps<HomeStackParamList, "MainTripListing">;

type OwnProps = ConnectedProps<typeof connector>;

const MainTripListing = (props: Props & OwnProps) => {
  const businessId = props.userInfo?.business_details?.business_id;
  useEffect(() => {
    props.getMetrics({
      businessId: businessId || 1
    });
  }, []);
  if (isLoading(props.metrics) || isInit(props.metrics)) {
    return <BlockScreenLoader />;
  }

  const requests = props.metrics.data.transport_service_request;
  const tripCount = (requests.CREATED || 0) + (requests.ACCEPTED || 0);
  const handleRowClick = (_: any, trip: GetTripsResponse) => {
    props.navigation.push("ShipperTripDetails", { data: JSON.stringify(trip) });
  };

  return (
    <>
      {!tripCount && (
        <>
          <Flex mt="3" />
          <CreateTripCard
            createTripCallback={() => props.navigation.push("CreateTrip")}
          />
        </>
      )}

      {!!tripCount && (
        <Flex1 bg="white">
          <TripList
            listingMode={ListingModes.UPCOMING}
            from={AllApps.SHIPPER}
            onRowClick={handleRowClick}
          />
          <Box position="absolute" bottom="15" right="20">
            <FloatingButton
              size="large"
              onPress={() => props.navigation.push("CreateTrip")}
            >
              <Text color="white" fontSize="7">
                +
              </Text>
            </FloatingButton>
          </Box>
        </Flex1>
      )}
    </>
  );
};

export default connector(MainTripListing);
