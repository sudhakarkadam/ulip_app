import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import { HomeStackParamList } from "./HomeStack";
import { I18nContext } from "../../../components/InternationalisationProvider";
const personIcon = require("../../../icons/person-icon.png");
const mapStateToProps = (state: CommonState) => {
  return {
    userInfo: state.user.data
  };
};
const connector = connect(mapStateToProps, {} as any);

type AllProps = StackScreenProps<HomeStackParamList, "CreateProfile"> &
  ConnectedProps<typeof connector>;

const ShipperCreateProfile = (props: AllProps) => {
  const { translate } = useContext(I18nContext);
  const profileExist = props.userInfo.user_details.find(
    role => role.profile.persona === "SHIPPER"
  );
  const personVerified = profileExist?.profile.name;
  const comapnyVerified = profileExist?.business_details;
  return (
    <Flex>
      {!personVerified && (
        <CardComp
          cardHeading="STEP 1"
          taskHeading={translate("profile.setup")}
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("PersonProfile")}
        ></CardComp>
      )}
      <Flex mt={3} />
      {!comapnyVerified && (
        <CardComp
          cardHeading="STEP 2"
          taskHeading={translate("company.setup")}
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("CompanyProfile")}
        ></CardComp>
      )}
    </Flex>
  );
};

export default connector(ShipperCreateProfile);
