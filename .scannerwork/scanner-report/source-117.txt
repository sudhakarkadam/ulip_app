import React from "react";
import { Route } from "react-native-tab-view";
import colors from "../theme/colors";
import { Box, Text } from "./@styled/BaseElements";
import { Props } from "react-native-tab-view/lib/typescript/src/TabBar";

export const renderTabBarLable: Props<Route>["renderLabel"] = ({
  route,
  focused,
  color
}) => {
  const bg = focused ? colors.secondary : "transparent";
  return (
    <Box bg={bg} border={`1px solid ${bg}`} py={2} px={4} borderRadius={25}>
      <Text color={color} fontSize={14} numberOfLines={1}>
        {route.title}
      </Text>
    </Box>
  );
};
