import React, { useEffect } from "react";
import {
  PrimaryHeaderText,
  PrimaryLabel
} from "../../../components/@styled/Text";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { PageContent, Page } from "../../../components/@styled/Page";
import { connect, ConnectedProps } from "react-redux";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonState } from "../../../reducers";
import { DriverActionCreators } from "../actions/DriverActionCreators";

import {
  Flex,
  Box,
  Text,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import { ActivityIndicator } from "react-native";
import { isLoading, isSuccess } from "../../../utils/actionCreator";
import colors from "../../../theme/colors";
const { getTrips, updateTrip, upload } = DriverActionCreators;
const mapDispatchToProps = { getTrips, updateTrip, upload };
const mapStateToProps = (state: CommonState) => ({
  trips: state.driverTrips,
  phone: state.user.data.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripList">;
};
const UpcomingTrips: React.FC<Props> = ({
  getTrips,
  phone,
  trips,
  navigation
}) => {
  useEffect(() => {
    getTrips(phone);
  }, []);
  return (
    <Page>
      <PageContent>
        <PrimaryHeaderText m={8}>
          <TranslationText id="upcoming"></TranslationText>
        </PrimaryHeaderText>
        <Flex>
          {isLoading(trips) && <ActivityIndicator />}
          {isSuccess(trips) &&
            trips.data?.map(t => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TripHome", {
                        id: t.trip_id
                      })
                    }
                  >
                    <Box
                      m={6}
                      marginTop={2}
                      p={6}
                      bg={colors.secondary}
                      borderRadius={2}
                    >
                      <Text fontSize={16}>
                        {t.source_location_details.city} →{" "}
                        {t.destination_location_details.city}
                      </Text>
                      <Box mt={6} mb={2}>
                        <PrimaryLabel>
                          <TranslationText id="pick.up.date"></TranslationText>
                        </PrimaryLabel>
                        <PrimaryHeaderText>
                          <TranslationText
                            id="placeholder"
                            interpolations={{
                              value: new Date(
                                t.pickup_request_time
                              ).toLocaleDateString()
                            }}
                          ></TranslationText>
                        </PrimaryHeaderText>
                      </Box>
                    </Box>
                  </TouchableOpacity>
                </>
              );
            })}
        </Flex>
      </PageContent>
    </Page>
  );
};

export default connector(UpcomingTrips);
