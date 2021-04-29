import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { Flex } from "../../../components/@styled/BaseElements";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import { HomeStackParamList } from "./HomeStack";
import { I18nContext } from "../../../components/InternationalisationProvider";
import { PerosnaDetails } from "../../../models/CommonModel";
import { Page, PageContent } from "../../../components/@styled/Page";
const personIcon = require("../../../images/person-icon.png");
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
    (role: PerosnaDetails) => role.profile.persona === "SHIPPER"
  );
  const personVerified = profileExist?.profile.name;
  const comapnyVerified = profileExist?.business_details;
  return (
    <Page>
      <PageContent>
        {!personVerified && (
          <CardComp
            cardHeading={translate("step.one")}
            taskHeading={translate("profile.setup")}
            clickLabel={translate("start")}
            imgSrc={personIcon}
            taskClickCallback={() => {
              props.navigation.navigate("PersonProfile");
            }}
          ></CardComp>
        )}
        <Flex mt={3} />
        {!comapnyVerified && (
          <CardComp
            cardHeading={translate("step.two")}
            taskHeading={translate("company.setup")}
            clickLabel={translate("start")}
            imgSrc={personIcon}
            taskClickCallback={() =>
              props.navigation.navigate("CompanyProfile")
            }
            isDisable={personVerified ? false : true}
          ></CardComp>
        )}
      </PageContent>
    </Page>
  );
};

export default connector(ShipperCreateProfile);
