import React, { useEffect } from "react";
import {
  FlexColumn,
  FlexRow,
  Flex,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import styled from "styled-components";
import { LSPAppState } from "../reducers";
import LSPActionCreators from "../actions/LSPActionCreators";
import { connect, ConnectedProps } from "react-redux";

const MetricBox = styled(TouchableOpacity)`
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
const connector = connect(mapStateToProps, mapDispatchToProps);
interface OwnProps {
  onRequestClick: () => void;
}
const HomeMetrics = (props: OwnProps & ConnectedProps<typeof connector>) => {
  useEffect(() => {
    props.getMetrics({ businessId: 2 });
  }, []);
  const metrics = props.HomeMetrics.data;
  return (
    <FlexColumn
      backgroundColor={colors.grays[2]}
      flex={1}
      style={{ paddingHorizontal: 13, paddingVertical: 30 }}
    >
      <FlexRow height={100} mb={20}>
        <MetricBox onPress={props.onRequestClick}>
          <PrimaryText>REQUESTS</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.CREATED}
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>TRUCKS</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {Object.keys(metrics.trucks).reduce((total, type) => {
              return total + metrics.trucks[type];
            }, 0)}
          </PrimaryText>
        </MetricBox>
      </FlexRow>
      <FlexRow height={100} mb={20}>
        <MetricBox>
          <PrimaryText>ON-ROAD</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.IN_PROGRESS}
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>PENDING</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            {metrics.transport_service_request.PENDING_POD}
          </PrimaryText>
        </MetricBox>
      </FlexRow>
    </FlexColumn>
  );
};
export default connector(HomeMetrics);
