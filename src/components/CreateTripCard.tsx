import React from "react";
import colors from "../theme/colors";
import { FlexRow, FlexColumn, Text, Flex } from "./@styled/BaseElements";
import StyledButton from "./@styled/StyledButton";
import RoadImg from "../images/road.svg";

interface OwnProps {
  createTripCallback: () => void;
}

const CreateTripCard = (props: OwnProps) => {
  const { createTripCallback } = props;
  return (
    <FlexRow p={7} backgroundColor="white" height={180}>
      <FlexColumn flex={1.8}>
        <Text color={`${colors.black[2]}`} fontSize={6} fontWeight={600}>
          Create a trip
        </Text>
        <Text color={`${colors.grays[5]}`} fontSize={2}>
          Raise a request to logistic service provider.
        </Text>
        <Flex mt={3}>
          <StyledButton
            fontSize={14}
            height="40"
            title="start"
            onPress={createTripCallback}
          />
        </Flex>
      </FlexColumn>
      <FlexColumn alignItems="center" alignSelf="center" flex={2}>
        <RoadImg />
      </FlexColumn>
    </FlexRow>
  );
};

export default CreateTripCard;