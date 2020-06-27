import React from "react";
import { TouchableOpacity } from "./BaseElements";
import { TouchableOpacityProps } from "react-native";

export interface FloatingButtonProps {
  size?: string;
  appearance?: string;
}

interface Sizes {
  [key: string]: number;
}

const FloatingButton: React.FC<FloatingButtonProps & TouchableOpacityProps> = ({
  size = "medium",
  appearance = "default",
  children,
  style,
  ...rest
}) => {
  const sizes: Sizes = {
    small: 40,
    medium: 48,
    large: 56
  };
  return (
    <TouchableOpacity
      justifyContent="center"
      alignItems="center"
      bg={appearance}
      width={sizes[size]}
      height={sizes[size]}
      borderRadius={sizes[size] / 2}
      style={{
        elevation: 10,
        ...(style as object)
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};
export default FloatingButton;
