import React from "react";
import colors from "../../../theme/colors";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex
} from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton";
import RoadImg from "../../../images/road.svg";

const CreateTripCard = () => {
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
            width="120"
            height="40"
            title="start"
            onPress={() => console.log("route to create trip")}
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
