import React from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  Icon
} from "../../components/@styled/BaseElements";
import Received from "../../images/open-menu.png";
import notification from "../../images/notification.png";
import search from "../../images/loupe.png";
import colors from "../../theme/colors";

const Header = props => {
  return (
    <Flex p={16} bg={colors.white} flexDirection="row">
      <Icon p={10} marginRight={20} source={Received} />
      <Box flex={1}>
        <Text fontSize={16} style={{ textTransform: "uppercase" }}>
          {props.title}
        </Text>
      </Box>
      <Icon p={10} marginLeft={20} source={notification} />
      <Icon p={10} marginLeft={20} source={search} />
    </Flex>
  );
};
export default Header;
