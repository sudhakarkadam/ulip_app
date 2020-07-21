import React from "react";
import {
  Text,
  Box,
  Icon,
  TouchableOpacity as Button
} from "../@styled/BaseElements";
import Tag from "../@styled/Tag";
import { Flex1, FlexRow } from "../@styled/Flex";
import { TranslationText } from "../InternationalisationProvider";

// @ts-ignore
import backIcon from "../../icons/back-no-tail.png";

interface TopBarProps {
  onBackPress?: () => void;
  tripId: string;
  status?: string;
}
const TopBar: React.FC<TopBarProps> = ({
  onBackPress = () => {},
  tripId,
  status = "ON-TIME"
}) => (
  <FlexRow alignItems="center" mx={4} mt={3} zIndex={2}>
    <Button
      height={40}
      width={40}
      borderRadius={40 / 2}
      bg="white"
      style={{ elevation: 3 }}
      mr={4}
      alignItems="center"
      justifyContent="center"
      onPress={onBackPress}
    >
      <Icon style={{ width: 23, height: 23 }} source={backIcon} />
    </Button>
    <FlexRow
      flex={1}
      bg="white"
      p={3}
      alignItems="center"
      style={{ elevation: 3 }}
    >
      <Flex1>
        <Text color="black.1" fontSize={0}>
          <TranslationText id="trip.id" />
        </Text>
        <Text fontWeight="bold">TRIP-{tripId}</Text>
      </Flex1>
      <Box>
        <Tag text={status} type="primary" />
      </Box>
    </FlexRow>
  </FlexRow>
);

export default TopBar;
