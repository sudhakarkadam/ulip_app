import React from "react";
import styled from "styled-components/native";
import { Text, Flex } from "./BaseElements";
import colors from "../../theme/colors";

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

export const TextWrapper = (props: {
  children: React.ReactNode;
  label: React.ReactNode;
}) => {
  return (
    <Flex mb={2}>
      <SecondaryLabel mb={3} style={{ textTransform: "none" }}>
        {props.label}
      </SecondaryLabel>
      {props.children}
    </Flex>
  );
};
