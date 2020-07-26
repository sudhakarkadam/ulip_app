import React from "react";
import { Box, Icon, TouchableOpacity as Button } from "../@styled/BaseElements";
import Tag from "../@styled/Tag";
import { Flex1, FlexRow } from "../@styled/Flex";
import { TranslationText } from "../InternationalisationProvider";

// @ts-ignore
import backIcon from "../../icons/back-no-tail.png";
import { PrimaryText, SecondaryLabel } from "../@styled/Text";

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
  <FlexRow alignItems="center" mx={4} mt={5} zIndex={2} position="absolute">
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
        <SecondaryLabel>
          <TranslationText id="trip.id" />
        </SecondaryLabel>
        <PrimaryText fontWeight="bold">TRIP-{tripId}</PrimaryText>
      </Flex1>
      <Box>
        <Tag text={status} type="success" />
      </Box>
    </FlexRow>
  </FlexRow>
);

export default TopBar;
