import React, { useEffect } from "react";
import { Text, Box, Flex } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";
import FloatingButton from "../../../components/@styled/FloatingButton";
import CreateTripCard from "./CreateTripCard";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "./HomeStack";
import {
  TripList,
  ListingModes,
  listingConfig
} from "../../../components/TripListing";
import { AllApps } from "../../../models/CommonModel";
import { ShipperAppState } from "../reducers";
import { ConnectedProps, connect } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";

const mapStateToProps = (state: ShipperAppState) => ({
  trips: state.trips
});

const { getTrips } = ActionCreators;
const mapDispatchToProps = { getTrips };

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Props = StackScreenProps<HomeStackParamList, "MainTripListing">;

type OwnProps = ConnectedProps<typeof connector>;

const MainTripListing = (props: Props & OwnProps) => {
  const config = listingConfig[ListingModes.PENDING] as any;
  useEffect(() => {
    props.getTrips({ status: config.status, businessId: "3" });
  }, []);
  const trips = props.trips.data || [];
  return (
    <>
      {!trips.length && (
        <>
          <Flex mt="3" />
          <CreateTripCard
            createTripCallback={() => props.navigation.push("CreateTrip")}
          />
        </>
      )}

      {!!trips.length && (
        <Flex1 bg="white">
          <TripList listingMode={ListingModes.PENDING} from={AllApps.LSP} />
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
