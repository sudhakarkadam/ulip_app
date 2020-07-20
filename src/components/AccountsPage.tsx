import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Image, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Text, Flex, FlexRow } from "./@styled/BaseElements";
import { UserDataModel } from "../models/CommonModel";
const personIcon = require("../images/sample-profile.png");
const driverIcon = require("../icons/driver-icon.png");
import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import AccountsProfileCard from "./AccountsProfileCard";
import { TranslationText } from "./InternationalisationProvider";

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

const Wrapper = styled(Flex)`
  align-items: center;
  margin: 40px;
`;

const ProfileWrapper = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
`;

export const personaMapping: any = {
  shipper: {
    text: "I am a shipper",
    icon: driverIcon,
    navigationScreen: "CreateProfile",
    businessKey: "shipper_details"
  },
  driver: {
    text: "I am a driver",
    icon: driverIcon,
    navigationScreen: "CreateProfile",
    businessKey: "driver_details"
  },
  lsp: {
    text: "I am a logistic service provider",
    icon: driverIcon,
    navigationScreen: "CreateProfile",
    businessKey: "lsp_details"
  }
};

const ProfileSection = ({ persona, selectedOtherPersona }: ProfileProps) => {
  return (
    <ScrollView style={{ width: "100%" }}>
      <ProfileWrapper>
        <TranslationText id="curent.profile" />
        <AccountsProfileCard
          disabled
          isBigCard
          showTick
          text={personaMapping[persona].text}
          icon={personaMapping[persona].icon}
        />
      </ProfileWrapper>
      <ProfileWrapper>
        <TranslationText id="other.profiles" />
        {Object.keys(personaMapping).map(otherPersona =>
          otherPersona !== persona ? (
            <AccountsProfileCard
              key={otherPersona}
              text={personaMapping[otherPersona].text}
              subText={<TranslationText id="setup.required" />}
              icon={personaMapping[otherPersona].icon}
              onPress={() => selectedOtherPersona(otherPersona)}
            />
          ) : null
        )}
      </ProfileWrapper>
    </ScrollView>
  );
};

const AccountsPage: React.FC<OwnProps &
  ConnectedProps<typeof connector>> = props => {
  const personName = props.userInfo?.user_details?.name;
  const contactNumber = props.userInfo?.user_details?.phone_number;
  return contactNumber && personName ? (
    <Wrapper>
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
    </Wrapper>
  ) : null;
};

export default connector(AccountsPage);
