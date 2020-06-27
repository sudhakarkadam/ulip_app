import React from "react";
import { Text, Box } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";
import FloatingButton from "../../../components/@styled/FloatingButton";

const MainTripListing = () => {
  return (
    <>
      <Flex1 bg="white"></Flex1>
      <Box position="absolute" bottom="15" right="20">
        <FloatingButton size="large">
          <Text color="white" fontSize="7">
            +
          </Text>
        </FloatingButton>
      </Box>
    </>
  );
};

export default MainTripListing;
