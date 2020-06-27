import styled from "styled-components/native";
import { Text } from "./BaseElements";
import colors from "../../theme/colors";

export const PrimaryText = styled(Text)`
  color: ${colors.blues[0]};
`;
export const SecondaryText = styled(Text)`
  color: ${colors.grays[5]};
  text-transform: capitalize;
`;
export const SmallCapitalText = styled(Text)`
  color: ${colors.grays[5]};
  text-transform: uppercase;
  font-size: 12px;
`;
export const PrimaryLabel = styled(PrimaryText)`
  color: ${colors.primary};
  font-weight: bold;
  font-size: 16px;
  text-transform: capitalize;
`;

export const LightText = styled(Text)`
  color: ${colors.grays[1]};
`;
