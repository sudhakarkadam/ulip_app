import styled from "styled-components/native";

import colors from "../theme/colors";
import {
  TouchableNativeFeedback,
  View,
  Text,
  ViewProps,
  TextProps,
  TouchableNativeFeedbackProps
} from "react-native";
import React from "react";

export const PrimaryText = styled.Text`
  color: ${colors.primary};
  font-size: 12;
`;

export const UpperCasePrimaryText = styled.Text`
  color: ${colors.primary};
  font-size: 12;
  text-transform: uppercase;
`;

export const PrimaryTextInput = styled.TextInput`
  color: ${colors.primary};
  border: solid 1px ${colors.grays[1]};
  font-size: 14;
  width: 300;
  border-radius: 5px;
`;

interface PrimaryTouchableProps {
  label: string;
  viewProps?: ViewProps;
  textProps?: TextProps;
  touchableProps?: TouchableNativeFeedbackProps;
}

export const PrimaryTouchable = (props: PrimaryTouchableProps) => (
  <TouchableNativeFeedback {...props.touchableProps}>
    <View
      style={{
        backgroundColor: `${colors.primary}`,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5
      }}
      {...props.viewProps}
    >
      <Text
        style={{
          color: `${colors.white}`,
          textTransform: "uppercase",
          fontSize: 12
        }}
        {...props.textProps}
      >
        {props.label}
      </Text>
    </View>
  </TouchableNativeFeedback>
);
