import styled from "styled-components/native";
import { Text } from "./BaseElements";
import colors from "../../theme/colors";

// export const PrimaryText = styled(Text)`
//   color: ${colors.blues[0]};
// `;

export const PrimaryText = styled(Text)`
  color: ${colors.primary};
  font-size: 16px;
`;

export const PrimaryLabel = styled(Text)`
  color: ${colors.lighter.primary};
  font-size: 14px;
`;

export const PrimaryHeaderText = styled(Text)`
  color: ${colors.primary};
  font-size: 20px;
  font-weight: bold;
`;

export const PrimaryLightText = styled(Text)`
  color: ${colors.lighter.primary};
  font-size: 16px;
`;

export const SecondaryText = styled(Text)`
  color: ${colors.grays[5]};
`;
export const SmallCapitalText = styled(Text)`
  color: ${colors.grays[5]};
  text-transform: uppercase;
  font-size: 12px;
`;
// export const PrimaryLabel = styled(PrimaryText)`
//   color: ${colors.primary};
//   font-weight: bold;
//   font-size: 16px;
//   text-transform: capitalize;
// `;

export const LightText = styled(Text)`
  color: ${colors.grays[1]};
`;

export const PrimaryTextSmall = styled(Text)`
  color: ${colors.primary};
  font-size: 14px;
`;
