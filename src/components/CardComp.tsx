import React from "react";
import { Image, ImageSourcePropType } from "react-native";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { FlexRow, Text, FlexColumn } from "./@styled/BaseElements";

const personIcon = require("../icons/person-icon.png");

interface OwnProps {
  taskClickCallback: () => void;
  cardHeading?: string;
  imgSrc?: ImageSourcePropType;
  taskHeading?: string;
  clickLabel?: string;
}

const CardComp = (props: OwnProps) => {
  const {
    cardHeading,
    imgSrc,
    taskHeading,
    clickLabel,
    taskClickCallback
  } = props;
  return (
    <FlexColumn p={6} backgroundColor="white" height={140}>
      <FlexRow>
        <Text color={`${colors.black[1]}`}>{cardHeading || "STEP 1"}</Text>
      </FlexRow>
      <FlexRow mt={3} ml={3}>
        <FlexRow pt={7}>
          <Image source={imgSrc || personIcon} />
        </FlexRow>
        <FlexColumn ml={10}>
          <FlexRow>
            <Text fontSize={4}>{taskHeading || "Create profile"}</Text>
          </FlexRow>
          <FlexRow mt={4}>
            <StyledButton
              width={120}
              title={clickLabel || "start"}
              onPress={() => {
                taskClickCallback();
              }}
            />
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    </FlexColumn>
  );
};

export default CardComp;
