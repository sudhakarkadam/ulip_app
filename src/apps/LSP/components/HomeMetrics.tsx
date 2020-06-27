import React, { useEffect } from "react";
import {
  FlexColumn,
  FlexRow,
  Flex
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import styled from "styled-components";
import { LSPAppState } from "../reducer";
import LSPActionCreators from "../actions/LSPActionCreators";
import { connect, ConnectedProps } from "react-redux";

const MetricBox = styled(Flex)`
  background-color: white;
  flex: 1;
  margin-horizontal: 12;
  border-radius: 3;
  border-color: ${colors.grays[2]};
  border-width: 1;
  padding: 10px;
`;

const { getMetrics } = LSPActionCreators;

const mapStateToProps = (state: LSPAppState) => ({
  HomeMetrics: state.HomeMetrics
});
const mapDispatchToProps = { getMetrics };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const HomeMetrics = (props: ConnectedProps<typeof connector>) => {
  useEffect(() => {
    props.getMetrics({});
  }, []);
  const metrics = props.HomeMetrics.data;
  return (
    <FlexColumn
      backgroundColor={colors.grays[2]}
      flex={1}
      style={{ paddingHorizontal: 13, paddingVertical: 30 }}
    >
      <FlexRow height={100} mb={20}>
        <MetricBox>
          <PrimaryText>REQUESTS</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.created}
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>TRUCKS</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.trucks.type1 + metrics.trucks.type2}
          </PrimaryText>
        </MetricBox>
      </FlexRow>
      <FlexRow height={100} mb={20}>
        <MetricBox>
          <PrimaryText>ON-ROAD</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.in_progress}
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>PENDING</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.pending_pod}
          </PrimaryText>
        </MetricBox>
      </FlexRow>
    </FlexColumn>
  );
};

export default connector(HomeMetrics);
