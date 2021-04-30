import React, { useEffect } from "react";
import { ScrollView, ActivityIndicator } from "react-native";
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
import { isLoading, isSuccess } from "../../../utils/actionCreator";
import colors from "../../../theme/colors";
import { useIsFocused } from "@react-navigation/native";
import { Status } from "../../../models/DriverTrips";

const mapDispatchToProps = { getDriverTrips: ActionCreators.getDriverTrips };
const mapStateToProps = (state: CommonState) => ({
  trips: state.driverTrips,
  phone: state.user.data.phone_number
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "TripList">;
  status: Status[];
  title?: string;
};
const UpcomingTrips: React.FC<Props> = ({
  getDriverTrips,
  phone,
  trips,
  navigation,
  status,
  title
}) => {
  const focused = useIsFocused();

  useEffect(() => {
    if (focused) {
      getDriverTrips({
        driverPhoneNumber: phone,
        status
      });
    }
  }, [focused]);
  return (
    <Page>
      <PageContent>
        <ScrollView>
          <PrimaryHeaderText m={8}>
            {title || <TranslationText id="upcoming"></TranslationText>}
          </PrimaryHeaderText>
          <Flex>
            {isLoading(trips) && <ActivityIndicator />}
            {!isLoading(trips) && (!trips.data || trips.data.length === 0) && (
              <PrimaryText mx={8}>
                {(title && <TranslationText id="no.upcoming.trips" />) || (
                  <TranslationText id="no.upcoming.trips"></TranslationText>
                )}
              </PrimaryText>
            )}
            {isSuccess(trips) &&
              trips.data?.map(t => {
                return (
                  <React.Fragment key={t.tsr_id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("TripHome", {
                          id: t.trip_id.toString()
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
                            {t.source_location_details.city ||
                              t.source_location_details.state ||
                              t.source_location_details.address}
                          </Text>
                          <Text fontSize={16} paddingBottom={2}>
                            {" "}
                            →{" "}
                          </Text>
                          <Text fontSize={16}>
                            {t.destination_location_details.city ||
                              t.destination_location_details.state ||
                              t.destination_location_details.address}
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
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(UpcomingTrips);
