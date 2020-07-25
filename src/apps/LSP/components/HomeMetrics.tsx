import React, { useEffect } from "react";
import {
  FlexColumn,
  FlexRow,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import {
  PrimaryText,
  PrimaryHeaderText
} from "../../../components/@styled/Text";
import styled from "styled-components";
import ActionCreators from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { ReducerState } from "../store";
import { isLoading } from "../../../utils/actionCreator";
import BlockScreenLoader from "../../../components/BlockScreenLoader";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { Page, PageContent } from "../../../components/@styled/Page";

const MetricBox = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.yellow};
  flex: 1;
  margin-horizontal: 12;
  border-radius: 10;
  border-color: ${({ theme }) => theme.colors.yellow};
  border-width: 1;
  padding: 10px;
`;

const { getMetrics } = ActionCreators;

const mapStateToProps = (state: ReducerState) => ({
  HomeMetrics: state.HomeMetrics,
  user: state.user
});
const mapDispatchToProps = { getMetrics };
const connector = connect(mapStateToProps, mapDispatchToProps);
interface OwnProps {
  onRequestClick: () => void;
}
const HomeMetrics = (props: OwnProps & ConnectedProps<typeof connector>) => {
  useEffect(() => {
    props.getMetrics({
      businessId: props.user.data.business_details.business_id
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
            <MetricBox onPress={props.onRequestClick}>
              <PrimaryText>
                <TranslationText id="requests" />
              </PrimaryText>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: metrics.transport_service_request.CREATED + ""
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
            <MetricBox>
              <PrimaryText>
                <TranslationText id="trucks" />
              </PrimaryText>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value:
                      Object.keys(metrics.trucks).reduce((total, type) => {
                        return total + metrics.trucks[type];
                      }, 0) + ""
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
          </FlexRow>
          <FlexRow height={100} mb={20}>
            <MetricBox>
              <PrimaryText>
                {" "}
                <TranslationText id="on.road" />
              </PrimaryText>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: metrics.transport_service_request.IN_PROGRESS + ""
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
            <MetricBox>
              <PrimaryText>
                <TranslationText id="pending" />
              </PrimaryText>
              <PrimaryHeaderText
                style={{ fontWeight: "bold", fontSize: 30, marginTop: 7 }}
              >
                <TranslationText
                  id="placeholder"
                  interpolations={{
                    value: metrics.transport_service_request.PENDING_POD + ""
                  }}
                />
              </PrimaryHeaderText>
            </MetricBox>
          </FlexRow>
        </FlexColumn>
      </PageContent>
    </Page>
  );
};
export default connector(HomeMetrics);
