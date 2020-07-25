import React, { useEffect } from "react";
import {
  FlexColumn,
  FlexRow,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import {
  PrimaryTextSmall,
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
    const profileCreated = props.user.data.user_details.find(
      role => role.profile.persona === "LSP"
    );
    const businessCreated = profileCreated?.business_details;
    props.getMetrics({
      business_id: businessCreated?.business_id || "",
      persona: "LSP"
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
              <PrimaryTextSmall>
                <TranslationText id="requests" />
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
          </FlexRow>
          <FlexRow height={100} mb={20}>
            <MetricBox>
              <PrimaryTextSmall>
                {" "}
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
            <MetricBox>
              <PrimaryTextSmall>
                <TranslationText id="pending" />
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
          </FlexRow>
        </FlexColumn>
      </PageContent>
    </Page>
  );
};
export default connector(HomeMetrics);
