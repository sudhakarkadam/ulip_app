import React from "react";
import { Flex, Box } from "./@styled/BaseElements";
import NITIAayog from "../images/logo.svg";
import { PrimaryText } from "./@styled/Text";
import colors from "../theme/colors";

const SplashScreen = () => {
  return (
    <Flex
      bg={"bg"}
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        bg={colors.white}
        borderRadius={100}
        p={5}
        height={150}
        width={150}
      >
        <NITIAayog />
      </Box>
      <PrimaryText pt={5}>UNIFIED LOGISTICS INTERFACE PLATFORM</PrimaryText>
    </Flex>
  );
};

export default SplashScreen;
