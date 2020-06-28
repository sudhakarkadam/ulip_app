import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import { connect, ConnectedProps } from "react-redux";
import { ShipperAppState } from "../reducers";
import { HomeStackParamList } from "./HomeStack";

const personIcon = require("../../../icons/person-icon.png");
const mapStateToProps = (state: ShipperAppState) => {
  return {
    userInfo: state.user.data
  };
};
const connector = connect(mapStateToProps, {} as any);

type AllProps = StackScreenProps<HomeStackParamList, "CreateProfile"> &
  ConnectedProps<typeof connector>;

const ShipperCreateProfile = (props: AllProps) => {
  const { userInfo } = props;
  const personVerified = userInfo?.user_details?.name;
  const comapnyVerified = userInfo?.business_details;
  return (
    <Flex>
      {!personVerified && (
        <CardComp
          cardHeading="STEP 1"
          taskHeading="Profile set up"
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("PersonProfile")}
        ></CardComp>
      )}
      <Flex mt={3} />
      {!comapnyVerified && (
        <CardComp
          cardHeading="STEP 2"
          taskHeading="Company set up"
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
        ></CardComp>
      )}
    </Flex>
  );
};

export default connector(ShipperCreateProfile);
