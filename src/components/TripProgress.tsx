import React from "react";
import { FlexRow, FlexColumn, Text, Flex } from "./@styled/BaseElements";
import LocationImgFaded from "../images/location-faded.svg";
import LocationImg from "../images/location.svg";
import CalendarImg from "../images/calendar.svg";
import CalendarImgDark from "../images/calendar-dark.svg";
import GoodsImg from "../images/goods.svg";
import GoodsImgDark from "../images/goods-dark.svg";
import TruckImg from "../images/solid-truck.svg";
import TruckImgDark from "../images/truck-dark.svg";
import colors from "../theme/colors";

interface OwnProps {
  currentStep: number;
}

const flexValues = [0.6, 2.3, 6.5, 28];

const TripProgress = (props: OwnProps) => {
  const { currentStep } = props;
  return (
    <FlexColumn p={5} backgroundColor="white" height={120}>
      <Text fontSize={3} fontWeight={700}>
        Trip details
      </Text>
      <FlexRow justifyContent="space-around" mt={4}>
        <Flex>
          {currentStep === 0 ? <LocationImg /> : <LocationImgFaded />}
        </Flex>
        <Flex>{currentStep === 1 ? <CalendarImgDark /> : <CalendarImg />}</Flex>
        <Flex>{currentStep === 2 ? <GoodsImgDark /> : <GoodsImg />}</Flex>
        <Flex>{currentStep === 3 ? <TruckImgDark /> : <TruckImg />}</Flex>
      </FlexRow>
      <FlexRow justifyContent="flex-end" mt={5}>
        <FlexRow
          flex={flexValues[currentStep]}
          position="relative"
          border="2px"
          borderRadius="10px"
          borderColor={`${colors.grays[1]}`}
        >
          <Flex
            position="absolute"
            right={-2}
            top={-6}
            border="6px"
            borderRadius="100px"
            borderColor={`${colors.grays[1]}`}
          ></Flex>
        </FlexRow>
        <FlexRow
          flex={4}
          border="2px"
          borderRadius="10px"
          borderColor={`${colors.grays[3]}`}
        ></FlexRow>
      </FlexRow>
    </FlexColumn>
  );
};

export default TripProgress;
