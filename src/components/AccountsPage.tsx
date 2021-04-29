import React, { useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text, Flex, FlexRow, Box } from "./@styled/BaseElements";
import { UserDataModel, UserPersonaTypes } from "../models/CommonModel";
const personIcon = require("../images/sample-profile.png");

import DriverIcon from "../images/driver.svg";
import LSPIcon from "../images/lsp.svg";
import ShipperIcon from "../images/shipper.svg";
import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import AccountsProfileCard from "./AccountsProfileCard";
import { TranslationText, I18nContext } from "./InternationalisationProvider";
import { PageContent, Page } from "./@styled/Page";
import { keys } from "../utils/keys";

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});

const { setUserPersona } = ActionCreators;
const mapDispatchToProps = { setUserPersona };

const connector = connect(mapStateToProps, mapDispatchToProps);

interface OwnProps {
  userInfo?: UserDataModel;
  persona: UserPersonaTypes;
  selectedOtherPersona?: (user: UserPersonaTypes) => void;
}

interface ProfileProps {
  persona: UserPersonaTypes;
  selectedOtherPersona: (user: UserPersonaTypes) => void;
  userInfo: UserDataModel;
}

const ProfileWrapper = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
`;

type Text = "i.am.shipper" | "i.am.driver" | "i.am.lsp";
interface Payload {
  text: Text;
  icon: any;
  navigationScreen: string;
  businessKey: string;
}
export const personaMapping: Record<UserPersonaTypes, Payload> = {
  SHIPPER: {
    text: "i.am.shipper" as "i.am.shipper",
    icon: <ShipperIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "shipper_details"
  },
  DRIVER: {
    text: "i.am.driver" as "i.am.driver",
    icon: <DriverIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "driver_details"
  },
  LSP: {
    text: "i.am.lsp" as "i.am.lsp",
    icon: <LSPIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "lsp_details"
  }
};

const ProfileSection = ({
  persona,
  selectedOtherPersona,
  userInfo
}: ProfileProps) => {
  const { translate } = useContext(I18nContext);
  return (
    <>
      <ProfileWrapper>
        <TranslationText id="current.profile" />
        <AccountsProfileCard
          disabled
          isBigCard
          showTick
          text={translate(personaMapping[persona].text)}
          icon={personaMapping[persona].icon}
        />
      </ProfileWrapper>
      <ProfileWrapper>
        <TranslationText id="other.profiles" />
        {keys(personaMapping).map(otherPersona => {
          const isSetupComplete = userInfo.user_details?.find(
            role => role.profile.persona === otherPersona
          );
          return otherPersona !== persona ? (
            <AccountsProfileCard
              key={otherPersona}
              text={translate(personaMapping[otherPersona].text)}
              subText={isSetupComplete ? "" : translate("setup.required")}
              icon={personaMapping[otherPersona].icon}
              onPress={() => selectedOtherPersona(otherPersona)}
            />
          ) : null;
        })}
      </ProfileWrapper>
    </>
  );
};

const getProfileUsername = (userInfo: UserDataModel) =>
  userInfo?.user_details?.find(
    details => details?.profile.persona === userInfo.userPersona
  )?.profile?.name;

const AccountsPage: React.FC<OwnProps &
  ConnectedProps<typeof connector>> = props => {
  const personName =
    getProfileUsername(props.userInfo) || props.userInfo.login_id;
  const contactNumber = props.userInfo.phone_number;
  return contactNumber && personName ? (
    <Page>
      <PageContent>
        <ScrollView>
          <Box alignItems="center" m="10">
            <FlexRow mb={20}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 50 }}
                source={personIcon}
              />
            </FlexRow>
            <Text fontSize={16}>{personName}</Text>
            <Text>{`+91-${contactNumber}`}</Text>
            <ProfileSection
              persona={props.persona}
              selectedOtherPersona={user => props.setUserPersona({ user })}
              userInfo={props.userInfo}
            />
          </Box>
        </ScrollView>
      </PageContent>
    </Page>
  ) : null;
};

export default connector(AccountsPage);
