import React, { useContext } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text, Flex, FlexRow, Box } from "./@styled/BaseElements";
import { UserDataModel } from "../models/CommonModel";
const personIcon = require("../images/sample-profile.png");
//const driverIcon = require("../images/driver.svg");
import DriverIcon from "../images/driver.svg";
import LSPIcon from "../images/lsp.svg";
import ShipperIcon from "../images/shipper.svg";
import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import AccountsProfileCard from "./AccountsProfileCard";
import { TranslationText, I18nContext } from "./InternationalisationProvider";
import { PageContent, Page } from "./@styled/Page";

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});

const { setUserPersona } = ActionCreators;
const mapDispatchToProps = { setUserPersona };

const connector = connect(mapStateToProps, mapDispatchToProps);

interface OwnProps {
  userInfo?: UserDataModel | null;
  persona: "driver" | "lsp" | "shipper";
  selectedOtherPersona?: (user: string) => void;
}

interface ProfileProps {
  persona: "driver" | "lsp" | "shipper";
  selectedOtherPersona: (user: string) => void;
}

const ProfileWrapper = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
`;

type Actors = "shipper" | "driver" | "lsp";
type Text = "i.am.shipper" | "i.am.driver" | "i.am.lsp";
interface Payload {
  text: Text;
  icon: any;
  navigationScreen: string;
  businessKey: string;
}
export const personaMapping: Record<Actors, Payload> = {
  shipper: {
    text: "i.am.shipper" as "i.am.shipper",
    icon: <ShipperIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "shipper_details"
  },
  driver: {
    text: "i.am.driver" as "i.am.driver",
    icon: <DriverIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "driver_details"
  },
  lsp: {
    text: "i.am.lsp" as "i.am.lsp",
    icon: <LSPIcon />,
    navigationScreen: "CreateProfile",
    businessKey: "lsp_details"
  }
};

const ProfileSection = ({ persona, selectedOtherPersona }: ProfileProps) => {
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
        {Object.keys(personaMapping).map(otherPersona =>
          otherPersona !== persona ? (
            <AccountsProfileCard
              key={otherPersona}
              text={translate(personaMapping[otherPersona].text)}
              subText={translate("setup.required")}
              icon={personaMapping[otherPersona].icon}
              onPress={() => selectedOtherPersona(otherPersona)}
            />
          ) : null
        )}
      </ProfileWrapper>
    </>
  );
};

const AccountsPage: React.FC<OwnProps &
  ConnectedProps<typeof connector>> = props => {
  const personName = props.userInfo?.user_details?.name;
  const contactNumber = props.userInfo?.user_details?.phone_number;
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
            />
          </Box>
        </ScrollView>
      </PageContent>
    </Page>
  ) : null;
};

export default connector(AccountsPage);
