import React from "react";
import styled from "styled-components/native";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  GestureResponderEvent
} from "react-native";
import { Text, FlexColumn, FlexRow } from "./@styled/BaseElements";
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
  padding: ${(props: ProfileCardTypes) => (props.isBigCard ? "15px" : "8px")};
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  justify-content: center;
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
    <ProfileCard isBigCard={isBigCard}>
      <FlexColumn flex={0.2}>
        <Image
          style={{
            width: isBigCard ? 50 : 35,
            height: isBigCard ? 50 : 35,
            borderRadius: 50
          }}
          source={icon}
        />
      </FlexColumn>
      <FlexColumn flex={1.7} ml={isBigCard ? 10 : 0} justifyContent={"center"}>
        <Text fontSize={isBigCard ? 20 : 16} color={colors.primary}>
          {text}
        </Text>
        {subText && <Text fontSize={10}>{subText}</Text>}
      </FlexColumn>
      {showTick && (
        <FlexColumn flex={0.3} justifyContent={"center"}>
          <Image style={{ width: 25, height: 25 }} source={tick} />
        </FlexColumn>
      )}
    </ProfileCard>
  </TouchableOpacity>
);

export default AccountsProfileCard;
