import React from "react";
import {
  FlexColumn,
  FlexRow,
  Flex
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import colors from "../../../theme/colors";
import styled from "styled-components";

const MetricBox = styled(Flex)`
  background-color: white;
  flex: 1;
  margin-horizontal: 12;
  border-radius: 3;
  border-color: ${colors.grays[2]};
  border-width: 1;
  padding: 10px;
`;

const HomeMetrics = () => {
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
            14
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>TRUCKS</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            23
          </PrimaryText>
        </MetricBox>
      </FlexRow>
      <FlexRow height={100} mb={20}>
        <MetricBox>
          <PrimaryText>ON-ROAD</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            25
          </PrimaryText>
        </MetricBox>
        <MetricBox>
          <PrimaryText>PENDING</PrimaryText>
          <PrimaryText
            style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
          >
            7
          </PrimaryText>
        </MetricBox>
      </FlexRow>
    </FlexColumn>
  );
};

export default HomeMetrics;
