import React, { useContext, useEffect } from "react";
import {
  Box,
  Flex,
  FlexRow,
  Text,
  Image,
  TouchableOpacity
} from "./@styled/BaseElements";
import colors from "../theme/colors";
import {
  SecondaryText,
  SmallCapitalText,
  PrimaryHeaderText,
  PrimaryText
} from "../components/@styled/Text";
import moment from "moment";
import {
  RequestStatus,
  AllApps,
  TruckType,
  GetTripsResponse
} from "../models/CommonModel";
import ActionCreators from "../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { FlatList } from "react-native";
import { isLoading, isSuccess } from "../utils/actionCreator";
import BlockScreenLoader from "../components/BlockScreenLoader";
import { CommonState } from "../reducers";
import ContainerTruck from "../images/containerTruck.svg";
import TrailorTruck from "../images/trailorTruck.svg";
import OpenTruck from "../images/openTruck.svg";
import { TranslationText } from "./InternationalisationProvider";
import { I18nContext } from "../components/InternationalisationProvider";
import { Keys } from "src/typings/translation";

const profile = require("../images/40px.png");

interface OwnProps {
  listingMode: ListingModes;
  from: AllApps;
  onRowClick?: (id: string | number, trip: GetTripsResponse) => void;
  businessId?: any;
  focused: boolean;
}
export enum ListingModes {
  UPCOMING = "UPCOMING",
  ON_ROAD = "ON_ROAD",
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  PENDING_REQUESTS = "PENDING_REQUESTS",
  PENDING = "PENDING"
}

enum IconWidget {
  CALENDAR = "CALENDAR",
  TRUCK = "TRUCK",
  LABEL = "LABEL",
  PROFILE = "PROFILE"
}

export const listingConfig = {
  [ListingModes.UPCOMING]: {
    default: {
      title: <TranslationText id="upcoming.trips" />,

      primaryWidget: IconWidget.CALENDAR,
      secondaryWidget: IconWidget.LABEL,
      status: [RequestStatus.ACCEPTED, RequestStatus.CREATED]
    },
    [AllApps.LSP]: {
      primaryWidget: IconWidget.PROFILE,
      secondaryWidget: IconWidget.TRUCK,
      status: [RequestStatus.ACCEPTED]
    }
  },
  [ListingModes.ON_ROAD]: {
    default: {
      title: <TranslationText id="onroad" />,
      status: [RequestStatus.IN_PROGRESS],
      secondaryWidget: IconWidget.CALENDAR
    },
    [AllApps.LSP]: {
      primaryWidget: IconWidget.PROFILE
    }
  },
  [ListingModes.ACTIVE]: {
    title: <TranslationText id="active" />,
    status: [RequestStatus.PENDING_POD],
    secondaryWidget: IconWidget.LABEL
  },
  [ListingModes.COMPLETED]: {
    title: <TranslationText id="completed" />,
    status: [RequestStatus.COMPLETED],
    secondaryWidget: IconWidget.LABEL
  },
  [ListingModes.PENDING_REQUESTS]: {
    title: <TranslationText id="requests" />,
    status: [RequestStatus.CREATED],
    primaryWidget: IconWidget.CALENDAR,
    secondaryWidget: IconWidget.TRUCK
  },
  [ListingModes.PENDING]: {
    title: <TranslationText id="largeCase.pending" />,
    secondaryWidget: IconWidget.LABEL,
    status: [RequestStatus.PENDING_POD]
  }
};

const CalendarComponent = ({ date }: any) => {
  if (!date) return null;
  const momentDate = moment(date);
  const month = momentDate.format("MMM");
  const day = momentDate.format("D");
  return (
    <Flex border={2} borderColor={colors.grays[2]} borderRadius={6} width={44}>
      <PrimaryHeaderText px={2} textAlign={"center"} fontSize={2}>
        {day}
      </PrimaryHeaderText>
      <SmallCapitalText
        px={2}
        py={1}
        textAlign={"center"}
        color={colors.grays[5]}
        bg={colors.grays[2]}
      >
        {month}
      </SmallCapitalText>
    </Flex>
  );
};
const mapStateToProps = (state: CommonState) => ({
  trips: state.trips,
  user: state.user
});
const { getTrips } = ActionCreators;
const mapDispatchToProps = { getTrips };

const connector = connect(mapStateToProps, mapDispatchToProps);
type ReduxProps = ConnectedProps<typeof connector>;

const TripListing: React.FunctionComponent<OwnProps & ReduxProps> = props => {
  const { from, listingMode, focused } = props;
  let config = listingConfig[listingMode] as any;

  const fetchTrips = () => {
    const userPersonaDetails = props.user.data.user_details.find(
      role => role.profile.persona === props.user.data.userPersona
    );
    props.getTrips({
      status: config.status,
      businessId: userPersonaDetails?.business_details?.business_id || "",
      persona: props.user.data.userPersona
    });
  };

  useEffect(() => {
    if (focused) fetchTrips();
  }, [listingMode, focused]);

  const data = props.trips.data?.transport_service_requests || [];
  if (config.default) {
    config = { ...config.default, ...(config[from] || {}) };
  }

  const { translate } = useContext(I18nContext);
  return (
    <>
      {isLoading(props.trips) && <BlockScreenLoader />}
      {isSuccess(props.trips) && (
        <Flex flex={1} pt={5} bg={colors.white}>
          <Flex bg={colors.white} flex={1}>
            <FlexRow
              justifyContent={"space-between"}
              p={5}
              borderBottomColor={colors.grays[3]}
              borderBottomWidth={1}
            >
              <FlexRow flex={1}>
                <PrimaryHeaderText>{config.title}</PrimaryHeaderText>
                <Box
                  alignItems="center"
                  justifyContent="center"
                  alignSelf="center"
                  bg="blues.5"
                  mx={5}
                  mt={2}
                  px={3}
                  py={1}
                  borderRadius={10}
                >
                  <Text color={colors.white} fontSize={10}>
                    {data.length}
                  </Text>
                </Box>
              </FlexRow>
              {/* <Filter /> */}
              {/* <Box pl={8}>
                <Sort />
              </Box> */}
            </FlexRow>
            <FlatList
              ListEmptyComponent={
                <Box p={6}>
                  <SecondaryText>
                    <TranslationText id="no.entries" />
                  </SecondaryText>
                </Box>
              }
              data={data}
              renderItem={({ item }) => {
                const truckType = item.truck_type_preference;
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (props.onRowClick) props.onRowClick(item.tsr_id, item);
                      return;
                    }}
                  >
                    <FlexRow
                      key={item.tsr_id}
                      p={5}
                      borderBottomColor={colors.grays[2]}
                      borderBottomWidth={1}
                    >
                      {config.primaryWidget === IconWidget.PROFILE && (
                        <Image
                          source={profile}
                          height={44}
                          width={44}
                          resizeMode="contain"
                        />
                      )}
                      {config.primaryWidget === IconWidget.CALENDAR && (
                        <Box>
                          <CalendarComponent date={item.pickup_request_time} />
                        </Box>
                      )}
                      <Flex mx={5} flex={1}>
                        <FlexRow>
                          {!!item.trip_details && (
                            <>
                              {config.primaryWidget === IconWidget.PROFILE &&
                                !!item.pickup_request_time && (
                                  <SecondaryText>{`${
                                    item.trip_details.status
                                  }${!!item.pickup_request_time &&
                                    `  ???  ${moment(
                                      item.pickup_request_time
                                    ).format("DD/MM/YYYY")}`}`}</SecondaryText>
                                )}
                              {[
                                RequestStatus.COMPLETED,
                                RequestStatus.PENDING_POD
                              ].indexOf(item.status) > -1 &&
                                config.primaryWidget !== IconWidget.PROFILE && (
                                  <SecondaryText>{`${moment(
                                    item.pickup_request_time
                                  ).format("DD/MM/YYYY")}`}</SecondaryText>
                                )}
                            </>
                          )}
                        </FlexRow>
                        <FlexRow>
                          <PrimaryText>
                            {item.source_location_details.city ||
                              item.source_location_details.state ||
                              item.source_location_details.address}
                          </PrimaryText>
                          <Text
                            color={colors.grays[1]}
                            px={2}
                            fontSize={40}
                            lineHeight={"30px"}
                          >
                            ???
                          </Text>
                          <PrimaryText>
                            {item.destination_location_details.city ||
                              item.destination_location_details.state ||
                              item.destination_location_details.address}
                          </PrimaryText>
                        </FlexRow>
                        <FlexRow>
                          <SecondaryText fontSize={1} color={colors.grays[1]}>
                            {`${item.goods_segment}  ???  ${item.weight} ${item.weight_unit}`}
                          </SecondaryText>
                        </FlexRow>
                      </Flex>
                      {config.secondaryWidget === IconWidget.TRUCK && (
                        <Box alignItems="flex-end">
                          <Box>
                            <SmallCapitalText pb={2}>
                              {item.truck_type_preference}
                            </SmallCapitalText>
                            {truckType === TruckType.CONTAINER && (
                              <ContainerTruck />
                            )}
                            {truckType === TruckType.OPEN && <OpenTruck />}
                            {truckType === TruckType.TRAILOR && (
                              <TrailorTruck />
                            )}
                            {truckType === TruckType.TROLLEY && (
                              <TrailorTruck />
                            )}
                          </Box>
                        </Box>
                      )}
                      {config.secondaryWidget === IconWidget.LABEL && (
                        <Box>
                          <Text
                            fontSize={1}
                            color={colors.primary}
                            py={1}
                            px={3}
                            bg={colors.grays[2]}
                          >
                            {item.status === RequestStatus.CREATED
                              ? "??? " + translate("largeCase.pending")
                              : translate((item.status as unknown) as Keys)}
                          </Text>
                        </Box>
                      )}
                      {config.secondaryWidget === IconWidget.CALENDAR && (
                        <Box>
                          <SmallCapitalText textAlign={"center"}>
                            {
                              [translate("on.time"), translate("delay")][
                                Math.floor(Math.random() * 2)
                              ]
                            }
                          </SmallCapitalText>
                          <CalendarComponent date={item.pickup_request_time} />
                        </Box>
                      )}
                    </FlexRow>
                  </TouchableOpacity>
                );
              }}
            ></FlatList>
          </Flex>
        </Flex>
      )}
    </>
  );
};
export const TripList = connector(TripListing);
