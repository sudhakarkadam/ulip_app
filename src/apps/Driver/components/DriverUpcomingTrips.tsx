import React, { useEffect } from "react";
import {
  PrimaryHeaderText,
  PrimaryLabel,
  PrimaryText
} from "../../../components/@styled/Text";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { PageContent, Page } from "../../../components/@styled/Page";
import { connect, ConnectedProps } from "react-redux";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import { StackNavigationProp } from "@react-navigation/stack";
import { CommonState } from "../../../reducers";
import ActionCreators from "../../../actions/ActionCreators";

import {
  Flex,
  Box,
  Text,
  TouchableOpacity,
  FlexRow
} from "../../../components/@styled/BaseElements";
import { ActivityIndicator } from "react-native";
import { isLoading, isSuccess } from "../../../utils/actionCreator";
import colors from "../../../theme/colors";
const { getDriverTrips, updateTrip, upload } = ActionCreators;
const mapDispatchToProps = { getDriverTrips, updateTrip, upload };
const mapStateToProps = (state: CommonState) => ({
  trips: state.driverTrips,
  phone: state.user.data.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripList">;
};
const UpcomingTrips: React.FC<Props> = ({
  getDriverTrips,
  phone,
  trips,
  navigation
}) => {
  useEffect(() => {
    getDriverTrips(phone);
  }, []);
  return (
    <Page>
      <PageContent>
        <PrimaryHeaderText m={8}>
          <TranslationText id="upcoming"></TranslationText>
        </PrimaryHeaderText>
        <Flex>
          {isLoading(trips) && <ActivityIndicator />}
          {!isLoading(trips) && (!trips.data || trips.data.length === 0) && (
            <PrimaryText mx={8}>
              <TranslationText id="no.upcoming.trips"></TranslationText>
            </PrimaryText>
          )}
          {isSuccess(trips) &&
            trips.data?.map(t => {
              return (
                <React.Fragment key={t.tsr_id}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("TripHome", {
                        id: t.tsr_id.toString()
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
                      <FlexRow style={{ alignItems: "center" }}>
                        <Text fontSize={16}>
                          {t.source_location_details.city}
                        </Text>
                        <Text fontSize={16} paddingBottom={2}>
                          {" "}
                          →{" "}
                        </Text>
                        <Text fontSize={16}>
                          {t.destination_location_details.city}
                        </Text>
                      </FlexRow>
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
                </React.Fragment>
              );
            })}
        </Flex>
      </PageContent>
    </Page>
  );
};

export default connector(UpcomingTrips);
