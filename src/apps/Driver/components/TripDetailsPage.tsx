import React from "react";
import { Component } from "react";
import { ScrollView } from "react-native";
import colors from "../../../theme/colors";
import styled from "styled-components/native";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex
} from "../../../components/@styled/BaseElements";
import { PrimaryText } from "../../../components/@styled/Text";
import StyledButton from "../../../components/@styled/StyledButton";
import { TripStamp } from "../../../components/TripStamp";

const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
`;

export default class TripPage extends Component {
  render() {
    return (
      <ScrollView>
        <Flex>
          <Card>
            <FlexRow p={7} backgroundColor="white">
              <FlexColumn flex={1.8}>
                <Text
                  color={`${colors.blues[5]}`}
                  fontSize={20}
                  fontWeight={"bold"}
                >
                  Trip Details
                </Text>
                <Flex style={{ paddingVertical: 25 }}>
                  <PrimaryText>Pickup Date</PrimaryText>
                  <PrimaryText style={{ fontWeight: "bold", fontSize: 20 }}>
                    30/06/2020
                  </PrimaryText>
                </Flex>
              </FlexColumn>
              <FlexColumn>
                <StyledButton
                  variant="outline"
                  height="40px"
                  width="122px"
                  title={"Details"}
                  onPress={() => {}}
                  style={{ marginBottom: 10 }}
                />
                <StyledButton
                  variant="outline"
                  height="40px"
                  width="122px"
                  title={"Documents"}
                  onPress={() => {}}
                />
              </FlexColumn>
            </FlexRow>
          </Card>
          <FlexRow backgroundColor="white">
            <TripStamp
              places={[
                { name: "Bangalore", state: "Karnataka", relativeDistance: 0 },
                {
                  name: "Mumbai",
                  state: "Maharashtra",
                  relativeDistance: 1239,
                  address:
                    "ICC Chambers, Saki Bihar Rd, Muranjan Wadi, Marol, Andheri East, Mumbai, Maharashtra 40072"
                },
                { name: "Phi Phi", state: "Heaven", relativeDistance: 4532 }
              ]}
            />
          </FlexRow>
        </Flex>
      </ScrollView>
    );
  }
}
