import React, { useEffect } from "react";
import { ScrollView, ActivityIndicator, FlatList } from "react-native";
import colors from "../../../theme/colors";
import styled from "styled-components/native";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import StyledButton from "../../../components/@styled/StyledButton";
import { TripStamp } from "../../../components/TripStamp";
import { StackNavigationProp } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { DriverActionCreators } from "../actions/DriverActionCreators";
import { DriverAppState } from "../reducers";
import { ConnectedProps, connect } from "react-redux";
import { isLoading, isInit } from "../../../utils/actionCreator";
import { Location } from "../models/DriverTrips";
import { Place } from "../../../components/TripStamp";
import { StickyBottom } from "../../../components/StickyBottom";

const convert = (loc: Location): Place => {
  return {
    name: loc.city,
    address: loc.address,
    state: loc.state
  };
};
const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
`;

const { getTrips } = DriverActionCreators;
const mapDispatchToProps = { getTrips };
const mapStateToProps = (state: DriverAppState) => ({
  trips: state.trips,
  phone: state.common.user.data.user_details.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripHome">;
};

const Trip: React.FC<Props> = props => {
  useEffect(() => {
    props.getTrips(props.phone);
  }, []);

  if (isLoading(props.trips) || isInit(props.trips))
    return <ActivityIndicator />;

  const trips = props.trips.data;

  const bottomSheetContent = () => {
    const trip = trips.find(t => t);
    const today = new Date().toLocaleDateString();
    const tripStartDate = new Date(trip.pickup_date).toLocaleDateString();

    if (trip.trip.status === "CREATED") {
      if (today !== tripStartDate) {
        return (
          <StyledButton
            width="100%"
            height="40"
            title="Start Trip"
            onPress={() => {}}
          />
        );
      } else {
        return (
          <>
            <Text color="#7A869A">It will be enabled on {tripStartDate}</Text>
            <StyledButton
              height="40"
              width="100%"
              title="Start Trip"
              style={{ opacity: 0.4 }}
              disabled={true}
              onPress={() => {}}
            />
          </>
        );
      }
    }
  };
  return (
    <>
      <ScrollView>
        <FlatList
          onRefresh={() => props.getTrips(props.phone)}
          refreshing={isLoading(props.trips)}
          data={trips.slice(1)}
          renderItem={t => {
            const trip = t.item;
            return (
              <Flex mt={4}>
                <Card>
                  <FlexRow p={7} backgroundColor="white">
                    <FlexColumn flex={1.8}>
                      <Text
                        color={`${colors.blues[5]}`}
                        fontSize={20}
                        fontWeight={"bold"}
                      >
                        Trip Details
                      </Text>
                      <Flex style={{ paddingVertical: 25 }}>
                        <PrimaryText>Pickup Date</PrimaryText>
                        <PrimaryText
                          style={{ fontWeight: "bold", fontSize: 20 }}
                        >
                          {new Date(trip.pickup_date).toLocaleDateString()}
                        </PrimaryText>
                      </Flex>
                    </FlexColumn>
                    <FlexColumn>
                      <StyledButton
                        variant="outline"
                        height="40px"
                        width="122px"
                        title={"Details"}
                        onPress={() => props.navigation.navigate("TripDetails")}
                        style={{ marginBottom: 10 }}
                      />
                      <StyledButton
                        variant="outline"
                        height="40px"
                        width="122px"
                        title={"Documents"}
                        onPress={() => {}}
                      />
                    </FlexColumn>
                  </FlexRow>
                </Card>
                <FlexRow pl={7} pr={7} backgroundColor="white">
                  <TripStamp
                    places={[
                      convert(trip.pickUp_location),
                      convert(trip.delivery_location)
                    ]}
                  />
                </FlexRow>
              </Flex>
            );
          }}
        />
      </ScrollView>
      <StickyBottom>{bottomSheetContent()}</StickyBottom>
    </>
  );
};

export const TripHome = connector(Trip);
