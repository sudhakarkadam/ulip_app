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
import profile from "../images/40px.png";
import trailerTruck from "../images/trailerTruckColored.png";
import containerTruck from "../images/containerTruckColored.png";
import openTruck from "../images/openTruckColored.png";
import Filter from "../images/sort.svg";
import Sort from "../images/filter.svg";
import {
  SecondaryText,
  PrimaryLabel,
  SmallCapitalText
} from "../components/@styled/Text";
import moment from "moment";
import { RequestStatus, AllApps, TruckType } from "../models/CommonModel";
import { CommonState } from "../reducers";
import ActionCreators from "../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { FlatList } from "react-native";

interface OwnProps {
  listingMode: ListingModes;
  from: AllApps;
  onRowClick?: (id: string | number) => void;
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

const listingConfig = {
  [ListingModes.UPCOMING]: {
    default: {
      title: "Upcoming trips",
      primaryWidget: IconWidget.CALENDAR,
      secondaryWidget: IconWidget.LABEL,
      status: [RequestStatus.ACCEPTED]
    },
    [AllApps.LSP]: {
      primaryWidget: IconWidget.PROFILE,
      secondaryWidget: IconWidget.TRUCK
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

const CalendarComponent = ({ date }) => {
  const momentDate = moment(date, moment.defaultFormatUtc);
  const month = momentDate.format("MMM");
  const day = momentDate.format("D");
  return (
    <Flex border={2} borderColor={colors.grays[2]} borderRadius={6}>
      <PrimaryLabel px={2} py={1} textAlign={"center"} fontSize={2}>
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
const mapStateToProps = (state: CommonState) => ({
  trips: state.trips
});
const { getTrips } = ActionCreators;
const mapDispatchToProps = { getTrips };

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
type ReduxProps = ConnectedProps<typeof connector>;

const TripListing: React.FunctionComponent<OwnProps & ReduxProps> = props => {
  const { from, listingMode } = props;
  let config = listingConfig[listingMode] as any;

  useEffect(() => {
    props.getTrips({ status: config.status, businessId: "3" });
  }, [listingMode]);

  const data = props.trips.data || [];
  if (config.default) {
    config = { ...config.default, ...(config[from] || {}) };
  }
  return (
    <Flex flex={1} pt={5} bg={colors.grays[3]}>
      <Flex bg={colors.white} flex={1}>
        <FlexRow
          justifyContent={"space-between"}
          p={5}
          borderBottomColor={colors.grays[3]}
          borderBottomWidth={1}
        >
          <FlexRow flex={1}>
            <PrimaryLabel>{config.title}</PrimaryLabel>
            <Text
              mx={4}
              px={3}
              bg={colors.primary}
              color={colors.white}
              borderRadius={20}
            >
              {data.length}
            </Text>
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
                  if (listingMode === ListingModes.PENDING && props.onRowClick)
                    props.onRowClick(item.id);
                  return;
                }}
              >
                <FlexRow
                  key={item.id}
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
                      {!!item.trip && (
                        <>
                          {config.primaryWidget === IconWidget.PROFILE &&
                            !!item.pickup_date && (
                              <SecondaryText>{`${
                                item.trip.driver_name
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
                              ).format("DD/MM/YYYY")}${!!item.trip &&
                                !!item.trip.eta &&
                                `  •  ${moment(item.trip.eta).format(
                                  "DD/MM/YYYY"
                                )}`}`}</SecondaryText>
                            )}
                        </>
                      )}
                    </FlexRow>
                    <FlexRow>
                      <PrimaryLabel>{item.pickUp_location.city}</PrimaryLabel>
                      <Text
                        color={colors.grays[1]}
                        px={2}
                        fontSize={40}
                        lineHeight={"30px"}
                      >
                        →
                      </Text>
                      <PrimaryLabel>{item.delivery_location.city}</PrimaryLabel>
                    </FlexRow>
                    <FlexRow>
                      <SecondaryText fontSize={1} color={colors.grays[1]}>
                        {`${item.good_type}  •  ${item.weight} ${item.weight_unit}`}
                      </SecondaryText>
                    </FlexRow>
                  </Flex>
                  {config.secondaryWidget === IconWidget.TRUCK && (
                    <Box>
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
                        {item.status}
                      </Text>
                    </Box>
                  )}
                  {config.secondaryWidget === IconWidget.CALENDAR && (
                    <Box>
                      <SmallCapitalText>ON-TIME</SmallCapitalText>
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
  );
};
export const TripList = connector(TripListing);
