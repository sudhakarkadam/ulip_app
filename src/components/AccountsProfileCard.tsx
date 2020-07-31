import React from "react";
import styled from "styled-components/native";
import { GestureResponderEvent } from "react-native";
import { TouchableOpacity, Text, Flex, FlexRow } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { PrimaryHeaderText } from "./@styled/Text";
import Tick from "../images/tick.svg";

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
  icon?: JSX.Element;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const ProfileCard = styled(FlexRow)`
  background-color: white;
  padding: ${(props: ProfileCardTypes) => (props.isBigCard ? "12px" : "10px")};
  border-radius: 2px;
  width: 100%;
  margin: 15px 0;
  justify-content: center;
  elevation: 5;
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
      {!!icon && <Flex width={60}>{icon}</Flex>}
      <Flex flex={1} ml={2} justifyContent={"center"}>
        <PrimaryHeaderText
          fontSize={isBigCard ? 18 : 16}
          color={colors.primary}
        >
          {text}
        </PrimaryHeaderText>
        {!!subText && (
          <Text mt={1} color={colors.grays[5]} fontSize={10}>
            {subText}
          </Text>
        )}
      </Flex>
      {showTick && <Tick />}
    </ProfileCard>
  </TouchableOpacity>
);

export default AccountsProfileCard;
