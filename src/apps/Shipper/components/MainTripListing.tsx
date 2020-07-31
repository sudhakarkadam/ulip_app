import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Text, Box, Flex } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";
import FloatingButton from "../../../components/@styled/FloatingButton";
import CreateTripCard from "../../../components/CreateTripCard";
import { HomeStackParamList } from "./HomeStack";
import { TripList, ListingModes } from "../../../components/TripListing";
import { AllApps, GetTripsResponse } from "../../../models/CommonModel";
import { CommonState } from "../../../reducers";
import { ConnectedProps, connect } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { isLoading, isInit } from "../../../utils/actionCreator";
import BlockScreenLoader from "../../../components/BlockScreenLoader";
import { PageContent, Page } from "../../../components/@styled/Page";
import { useIsFocused } from "@react-navigation/native";

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
  const userPersonaDetails = props.userInfo.user_details.find(
    role => role.profile.persona.toLowerCase() === props.userInfo.userPersona
  );
  useEffect(() => {
    props.getMetrics({
      business_id: userPersonaDetails?.business_details?.business_id || "",
      persona: props.userInfo.userPersona?.toUpperCase() || ""
    });
  }, []);
  const focused = useIsFocused();
  if (isLoading(props.metrics) || isInit(props.metrics)) {
    return <BlockScreenLoader />;
  }

  const requests = props.metrics.data.status_count_details;
  const tripCount = (requests.CREATED || 0) + (requests.ACCEPTED || 0);
  const handleRowClick = (_: any, trip: GetTripsResponse) => {
    props.navigation.push("ShipperTripDetails", { data: JSON.stringify(trip) });
  };

  return (
    <Page>
      <PageContent>
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
              focused={focused}
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
      </PageContent>
    </Page>
  );
};

export default connector(MainTripListing);
