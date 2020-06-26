import React from "react";
import { Text } from "./BaseElements";
import colors from "../../theme/colors";

export interface TagProps {
  text: string;
  icon?: any;
  type?: "default" | "primary";
}

export const Tag: React.FC<TagProps> = ({ text, type = "default" }) => {
  const color = type === "primary" ? colors.white : colors.primary;
  const bg = type === "primary" ? colors.primary : colors.grays[1];

  return (
    <Text
      color={color}
      bg={bg}
      borderRadius={2}
      px={3}
      py={2}
      fontSize={0}
      textAlign="center"
    >
      {text || ""}
    </Text>
  );
};

export default Tag;
