import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import CreateTripCard from "./CreateTripCard";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";
import { HomeStackParamList } from "./HomeStack";

const personIcon = require("../../../icons/person-icon.png");

const { savePersonalProfile } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => {
  return {
    userInfo: state.user.data
  };
};
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

type AllProps = StackScreenProps<HomeStackParamList, "CreateProfile"> &
  ConnectedProps<typeof connector>;

const ShipperCreateProfile = (props: AllProps) => {
  const { userInfo } = props;
  const personVerified = userInfo && userInfo.personalProfile ? true : false;
  const comapnyVerified = userInfo && userInfo.companyProfile ? true : false;
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
      <Flex mt={3} />
      <CreateTripCard
        createTripCallback={() => props.navigation.navigate("CreateTrip")}
      />
    </Flex>
  );
};

export default connector(ShipperCreateProfile);
