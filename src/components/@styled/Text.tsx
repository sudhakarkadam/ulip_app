import React, { useState } from "react";
import styled from "styled-components/native";
import Tooltip from "react-native-walkthrough-tooltip";
import {
  Text,
  Flex,
  FlexRow,
  Icon,
  TouchableNativeFeedback
} from "./BaseElements";
import colors from "../../theme/colors";
import { vehicleFormats } from "../../utils/constants";

// @ts-ignore
import trackTruck from "../../images/question-mark.png";

// export const PrimaryText = styled(Text)`
//   color: ${colors.blues[0]};
// `;

export const PrimaryText = styled(Text)`
  color: ${colors.primary};
  font-size: 16px;
  font-family: Roboto-Regular;
`;

export const ErrorText = styled(Text)`
  color: tomato;
  font-size: 12px;
  font-family: Roboto-Regular;
  margin-top: -12px;
  margin-bottom: 6px;
`;

export const PrimaryLabel = styled(Text)`
  color: ${colors.lighter.primary};
  font-size: 14px;
  font-family: Roboto-Light;
`;

export const PrimaryHeaderText = styled(Text)`
  color: ${colors.primary};
  font-size: 20px;
  font-family: Roboto-Medium;
`;

export const PrimaryLightText = styled(Text)`
  color: ${colors.lighter.primary};
  font-size: 16px;
  font-family: Roboto-Regular;
`;

export const SecondaryText = styled(Text)`
  color: ${colors.grays[5]};
  font-size: 16px;
  font-family: Roboto-Regular;
`;

export const SecondaryLabel = styled(Text)`
  color: ${colors.grays[5]};
  text-transform: capitalize;
  font-size: 14px;
  font-family: Roboto-Regular;
`;
export const SmallCapitalText = styled(Text)`
  color: ${colors.grays[5]};
  text-transform: uppercase;
  font-size: 12px;
  font-family: Roboto-Regular;
`;
// export const PrimaryLabel = styled(PrimaryText)`
//   color: ${colors.primary};
//   font-weight: bold;
//   font-size: 16px;
//   text-transform: capitalize;
// `;

export const LightText = styled(Text)`
  color: ${colors.grays[1]};
  font-family: Roboto-Regular;
`;

export const PrimaryTextSmall = styled(Text)`
  color: ${colors.primary};
  font-size: 14px;
  font-family: Roboto-Regular;
`;

interface TextWrapperPropTypes {
  children: React.ReactNode;
  label: React.ReactNode;
  showTooltip?: boolean;
}

export const TextWrapper = ({
  label,
  showTooltip,
  children
}: TextWrapperPropTypes) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const getTooltipTemplate = () => {
    return (
      <Flex>
        <Text>Formats of Vehicle No.</Text>
        {vehicleFormats.map((val, index) => (
          <Text key={index}>{val}</Text>
        ))}
      </Flex>
    );
  };

  return (
    <Flex mb={2}>
      <FlexRow mb={3} style={{ alignItems: "center" }}>
        <SecondaryLabel style={{ textTransform: "none" }}>
          {label}
        </SecondaryLabel>
        {showTooltip && (
          <Tooltip
            isVisible={toolTipVisible}
            content={getTooltipTemplate()}
            placement="right"
            onClose={() => setToolTipVisible(false)}
          >
            <TouchableNativeFeedback onPress={() => setToolTipVisible(true)}>
              <Icon source={trackTruck} ml={3} />
            </TouchableNativeFeedback>
          </Tooltip>
        )}
      </FlexRow>
      {children}
    </Flex>
  );
};
