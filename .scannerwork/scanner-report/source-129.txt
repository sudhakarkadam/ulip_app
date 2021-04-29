import React from "react";
import { Text, Box, Icon } from "../@styled/BaseElements";
import { Flex1, Flex3, FlexRow } from "../@styled/Flex";

// @ts-ignore
import trackTruck from "../../images/truck-black.png";

const HopBorder: React.FC<{ lastIndex?: boolean }> = ({
  lastIndex = false
}) => (
  <Box position="relative" mr={5} ml={2}>
    <Box
      position="absolute"
      justifyContent="center"
      alignItems="center"
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      <Box height={7} width={7} borderRadius={7 / 2} bg="grays.1" />
    </Box>
    <Box
      flex={1}
      borderRightWidth={1}
      borderColor="grays.1"
      borderStyle="dashed"
    />
    <Box
      flex={1}
      borderRightWidth={lastIndex ? 0 : 1}
      borderColor="grays.1"
      borderStyle="dashed"
    />
  </Box>
);

interface HopItemProps {
  locationName: string;
  timeText: string;
  delayText: string;
  index: number;
  lastIndex?: boolean;
}
const HopItem: React.FC<HopItemProps> = ({
  locationName,
  timeText,
  delayText,
  index
}) => (
  <FlexRow
    flex={1}
    py={4}
    alignItems="center"
    justifyContent="space-between"
    borderTopWidth={index ? 1 : 0}
    borderColor="grays.2"
  >
    <Flex3 flexDirection="row">
      <Box>
        <Text>{locationName || ""}</Text>
        <Text color="black.1" fontSize={0}>
          {timeText || ""}
        </Text>
      </Box>
      {!index && (
        <Icon
          source={trackTruck}
          style={{ width: 22, height: 22 }}
          marginLeft={1}
        />
      )}
    </Flex3>
    <Flex1 alignItems="flex-end">
      <Text color="black.1" fontSize={1}>
        {delayText || ""}
      </Text>
    </Flex1>
  </FlexRow>
);

const Hop: React.FC<HopItemProps> = ({
  index,
  locationName,
  timeText,
  delayText,
  lastIndex = false
}) => (
  <FlexRow px={5} bg="white">
    <HopBorder lastIndex={lastIndex} />
    <HopItem {...{ locationName, timeText, delayText, index }} />
  </FlexRow>
);

export default Hop;
