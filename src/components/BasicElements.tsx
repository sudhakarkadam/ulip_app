import styled from "styled-components/native";

import colors from "../theme/colors";

export const PrimaryText = styled.Text`
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
