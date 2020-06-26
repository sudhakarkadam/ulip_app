import React from "react";
import { Flex } from "./@styled/BaseElements";
import NITIAayog from "../images/NITIAayog.svg";

const SplashScreen = () => {
  return (
    <Flex style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <NITIAayog />
    </Flex>
  );
};

export default SplashScreen;
