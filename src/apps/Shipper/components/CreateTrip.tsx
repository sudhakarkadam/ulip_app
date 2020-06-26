import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex
} from "../../../components/@styled/BaseElements";
import LocationImg from "../../../images/location.svg";
import CalendarImg from "../../../images/calendar.svg";
import GoodsImg from "../../../images/goods.svg";
import TruckImg from "../../../images/solid-truck.svg";
import colors from "../../../theme/colors";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";

const { login } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.userInfo
});
const mapDispatchToProps = { login };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type Props = ConnectedProps<typeof connector>;

const CreateTrip = (props: Props) => {
  useEffect(() => {
    props.login({});
  }, []);
  return (
    <FlexColumn p={5} backgroundColor="white" height={120}>
      <Text fontSize={3} fontWeight={700}>
        Trip details
      </Text>
      <FlexRow justifyContent="space-around" mt={4}>
        <Flex>
          <LocationImg />
        </Flex>
        <Flex>
          <CalendarImg />
        </Flex>
        <Flex>
          <GoodsImg />
        </Flex>
        <Flex>
          <TruckImg />
        </Flex>
      </FlexRow>
      <FlexRow justifyContent="flex-end" mt={5}>
        <FlexRow
          flex={1}
          position="relative"
          border="2px"
          borderRadius="10px"
          borderColor={`${colors.grays[1]}`}
        >
          <Flex
            position="absolute"
            right={-2}
            top={-6}
            border="6px"
            borderRadius="100px"
            borderColor={`${colors.grays[1]}`}
          ></Flex>
        </FlexRow>
        <FlexRow
          flex={4}
          border="2px"
          borderRadius="10px"
          borderColor={`${colors.grays[3]}`}
        ></FlexRow>
      </FlexRow>
    </FlexColumn>
  );
};

export default connector(CreateTrip);
