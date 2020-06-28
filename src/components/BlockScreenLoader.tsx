import React from "react";
import { Flex, StyledActivityIndicator, Box } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { Modal } from "react-native";

const BlockScreenLoader: React.FunctionComponent<{}> = () => {
  return (
    <Modal transparent={true} visible>
      <Flex
        bg={"rgba(0,0,0,0.2)"}
        flex={1}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box bg={colors.white} p={4} style={{ borderRadius: 50 }}>
          <StyledActivityIndicator />
        </Box>
      </Flex>
    </Modal>
  );
};
export default BlockScreenLoader;
