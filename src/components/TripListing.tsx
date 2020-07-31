import React, { useEffect } from "react";
import {
  Box,
  Flex,
  FlexRow,
  Text,
  Image,
  TouchableOpacity
} from "./@styled/BaseElements";
import colors from "../theme/colors";
import Filter from "../images/sort.svg";
import Sort from "../images/filter.svg";
import {
  SecondaryText,
  PrimaryLabel,
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
import { ReducerState } from "../apps/LSP/store";
import { isLoading, isSuccess } from "../utils/actionCreator";
import BlockScreenLoader from "../components/BlockScreenLoader";

const profile = require("../images/40px.png");
const trailerTruck = require("../images/trailerTruckColored.png");
const containerTruck = require("../images/containerTruckColored.png");
const openTruck = require("../images/openTruckColored.png");

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
      title: "Upcoming trips",
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
      title: "On-Road",
      status: [RequestStatus.IN_PROGRESS],
      secondaryWidget: IconWidget.CALENDAR
    },
    [AllApps.LSP]: {
      primaryWidget: IconWidget.PROFILE
    }
  },
  [ListingModes.ACTIVE]: {
    title: "Active",
    status: [RequestStatus.PENDING_POD],
    secondaryWidget: IconWidget.LABEL
  },
  [ListingModes.COMPLETED]: {
    title: "Completed",
    status: [RequestStatus.COMPLETED],
    secondaryWidget: IconWidget.LABEL
  },
  [ListingModes.PENDING_REQUESTS]: {
    title: "Requests",
    status: [RequestStatus.CREATED],
    primaryWidget: IconWidget.CALENDAR,
    secondaryWidget: IconWidget.TRUCK
  },
  [ListingModes.PENDING]: {
    title: "Active",
    secondaryWidget: IconWidget.LABEL,
    status: [RequestStatus.PENDING_POD]
  }
};

const CalendarComponent = ({ date }: any) => {
  const momentDate = moment(date, moment.defaultFormatUtc);
  const month = momentDate.format("MMM");
  const day = momentDate.format("D");
  return (
    <Flex border={2} borderColor={colors.grays[2]} borderRadius={6} width={44}>
      <PrimaryLabel px={2} textAlign={"center"} fontSize={2}>
        {day}
      </PrimaryLabel>
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
const mapStateToProps = (state: ReducerState) => ({
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
      role => role.profile.persona.toLowerCase() === props.user.data.userPersona
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
              <Filter />
              <Box pl={8}>
                <Sort />
              </Box>
            </FlexRow>
            <FlatList
              ListEmptyComponent={
                <Box p={6}>
                  <SecondaryText>No entries</SecondaryText>
                </Box>
              }
              data={data}
              renderItem={({ item }) => {
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
                          <CalendarComponent date={item.pickup_date} />
                        </Box>
                      )}
                      <Flex mx={5} flex={1}>
                        <FlexRow>
                          {!!item.trip_details && (
                            <>
                              {config.primaryWidget === IconWidget.PROFILE &&
                                !!item.pickup_date && (
                                  <SecondaryText>{`${
                                    item.trip_details.driver_name
                                  }${!!item.pickup_date &&
                                    `  •  ${moment(item.pickup_date).format(
                                      "DD/MM/YYYY"
                                    )}`}`}</SecondaryText>
                                )}
                              {[
                                RequestStatus.COMPLETED,
                                RequestStatus.PENDING_POD
                              ].indexOf(item.status) > -1 &&
                                config.primaryWidget !== IconWidget.PROFILE && (
                                  <SecondaryText>{`${moment(
                                    item.pickup_date
                                  ).format(
                                    "DD/MM/YYYY"
                                  )}${!!item.trip_details &&
                                    !!item.trip_details.eta &&
                                    `  •  ${moment(
                                      item.trip_details.eta
                                    ).format("DD/MM/YYYY")}`}`}</SecondaryText>
                                )}
                            </>
                          )}
                        </FlexRow>
                        <FlexRow>
                          <PrimaryText>
                            {item.source_location_details.city}
                          </PrimaryText>
                          <Text
                            color={colors.grays[1]}
                            px={2}
                            fontSize={40}
                            lineHeight={"30px"}
                          >
                            →
                          </Text>
                          <PrimaryText>
                            {item.destination_location_details.city}
                          </PrimaryText>
                        </FlexRow>
                        <FlexRow>
                          <SecondaryText fontSize={1} color={colors.grays[1]}>
                            {`${item.goods_segment}  •  ${item.weight} ${item.weight_unit}`}
                          </SecondaryText>
                        </FlexRow>
                      </Flex>
                      {config.secondaryWidget === IconWidget.TRUCK && (
                        <Box alignItems="flex-end">
                          <SmallCapitalText>
                            {item.truck_type_preference}
                          </SmallCapitalText>
                          <Image
                            source={
                              item.truck_type_preference === TruckType.TRAILOR
                                ? trailerTruck
                                : item.truck_type_preference === TruckType.OPEN
                                ? openTruck
                                : containerTruck
                            }
                            height={20}
                            width={44}
                            resizeMode="contain"
                          />
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
                              ? "⚠ PENDING"
                              : item.status}
                          </Text>
                        </Box>
                      )}
                      {config.secondaryWidget === IconWidget.CALENDAR && (
                        <Box>
                          <SmallCapitalText textAlign={"center"}>
                            {
                              ["ON-TIME", "DELAY"][
                                Math.floor(Math.random() * 2)
                              ]
                            }
                          </SmallCapitalText>
                          <CalendarComponent date={item.pickup_date} />
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
