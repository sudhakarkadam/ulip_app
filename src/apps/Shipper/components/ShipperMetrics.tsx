import React, { useEffect } from "react";
import {
  FlexColumn,
  FlexRow,
  TouchableOpacity,
  Box
} from "../../../components/@styled/BaseElements";
import {
  PrimaryTextSmall,
  PrimaryHeaderText,
  PrimaryText
} from "../../../components/@styled/Text";
import styled from "styled-components";
import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { isLoading } from "../../../utils/actionCreator";
import BlockScreenLoader from "../../../components/BlockScreenLoader";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { Page, PageContent } from "../../../components/@styled/Page";
import Road from "../../../images/road.svg";
import { CommonState } from "../../../reducers";
import { HomeStackParamList } from "./HomeStack";
import { StackScreenProps } from "@react-navigation/stack";

const MetricBox = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.yellow};
  flex: 1;
  margin-horizontal: 12;
  border-radius: 10;
  border-color: ${({ theme }) => theme.colors.yellow};
  border-width: 1;
  padding: 10px;
`;

const IconBox = styled(TouchableOpacity)`
  border-color: ${({ theme }) => theme.colors.yellow};
  border-width: 1;
  padding: 8px;
  border-radius: 5;
  margin-horizontal: 12;
  justify-content: center;
  align-items: center;
`;

const { getMetrics } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  HomeMetrics: state.HomeMetrics,
  user: state.user
});
const mapDispatchToProps = { getMetrics };
const connector = connect(mapStateToProps, mapDispatchToProps);

const HomeMetrics = (
  props: ConnectedProps<typeof connector> &
    StackScreenProps<HomeStackParamList, "ShipperMetrics">
) => {
  useEffect(() => {
    const profileCreated = props.user.data.user_details.find(
      role => role.profile.persona === "SHIPPER"
    );
    const businessCreated = profileCreated?.business_details;
    props.getMetrics({
      business_id: businessCreated?.business_id || "",
      persona: "SHIPPER"
    });
  }, []);
  const metrics = props.HomeMetrics.data;
  return (
    <Page>
      <PageContent>
        {isLoading(props.HomeMetrics) && <BlockScreenLoader />}
        <FlexColumn
          flex={1}
          style={{ paddingHorizontal: 13, paddingVertical: 30 }}
        >
          <FlexRow height={100} mb={20}>
            <MetricBox
              onPress={() => props.navigation.navigate("MainTripListing")}
            >
              <PrimaryTextSmall>
                <TranslationText id="requested" />
              </PrimaryTextSmall>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: (
                      metrics.status_count_details.CREATED || 0
                    ).toString()
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
            <MetricBox>
              <PrimaryTextSmall>
                {" "}
                <TranslationText id="pending.literally" />
              </PrimaryTextSmall>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: (
                      metrics.status_count_details.PENDING_POD || 0
                    ).toString()
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
            <MetricBox>
              <PrimaryTextSmall>
                <TranslationText id="on.road" />
              </PrimaryTextSmall>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: (
                      metrics.status_count_details.IN_PROGRESS || 0
                    ).toString()
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
          </FlexRow>
          <FlexColumn mx={5} mb={5}>
            <Box
              borderWidth="1px"
              borderColor="grays.3"
              borderStyle="solid"
              borderBottomWidth="0px"
              mb={2}
              height="0px"
            ></Box>
            <Box
              borderWidth="1px"
              borderColor="grays.3"
              borderStyle="solid"
              borderBottomWidth="0px"
              width="100%"
              height="0px"
            ></Box>
          </FlexColumn>
          <FlexRow>
            <IconBox onPress={() => props.navigation.navigate("CreateTrip")}>
              <Box mb={2}>
                <Road />
              </Box>
              <PrimaryText style={{ fontSize: 10 }}>
                <TranslationText id="create.trip"></TranslationText>
              </PrimaryText>
            </IconBox>

            <IconBox onPress={() => props.navigation.navigate("WarehouseAdd")}>
              <Box mb={2}>
                <Road />
              </Box>
              <PrimaryText style={{ fontSize: 10 }}>
                <TranslationText id="add.warehouse"></TranslationText>
              </PrimaryText>
            </IconBox>
          </FlexRow>
        </FlexColumn>
      </PageContent>
    </Page>
  );
};
export default connector(HomeMetrics);
