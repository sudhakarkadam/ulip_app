import React from "react";
import styled from "styled-components/native";
import { ImageSourcePropType, GestureResponderEvent } from "react-native";
import {
  Image,
  TouchableOpacity,
  Text,
  Flex,
  FlexRow
} from "./@styled/BaseElements";
import colors from "../theme/colors";
const tick = require("../icons/tick.png");

interface ProfileCardTypes {
  isBigCard?: boolean;
}

interface OwnProps {
  key?: string;
  disabled?: boolean;
  isBigCard?: boolean;
  showTick?: boolean;
  subText?: string | boolean;
  text: string;
  icon: ImageSourcePropType;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ProfileCard = styled(FlexRow)`
  background-color: white;
  padding: ${(props: ProfileCardTypes) => (props.isBigCard ? "15px" : "10px")};
  border-radius: 10px;
  width: 100%;
  margin: 6px 0;
  justify-content: center;
  border: 2px solid ${colors.grays[2]};
`;

const AccountsProfileCard = ({
  disabled,
  isBigCard,
  showTick,
  subText,
  text,
  icon,
  onPress
}: OwnProps) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <ProfileCard isBigCard={isBigCard} alignItems={"center"}>
      <Image
        width={isBigCard ? 50 : 35}
        height={isBigCard ? 50 : 35}
        borderRadius={50}
        source={icon}
        mr={2}
      />
      <Flex flex={1} ml={2} justifyContent={"center"}>
        <Text fontSize={isBigCard ? 18 : 16} color={colors.primary}>
          {text}
        </Text>
        {subText && (
          <Text mt={1} color={colors.grays[5]} fontSize={10}>
            {subText}
          </Text>
        )}
      </Flex>
      {showTick && <Image width={25} height={25} source={tick} />}
    </ProfileCard>
  </TouchableOpacity>
);

export default AccountsProfileCard;
