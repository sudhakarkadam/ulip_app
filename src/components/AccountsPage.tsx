import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Image } from "react-native";
import styled from "styled-components/native";
import { Text, Flex, FlexRow } from "./@styled/BaseElements";
import { UserDataModel } from "../models/CommonModel";
const personIcon = require("../images/sample-profile.png");
const driverIcon = require("../icons/driver-icon.png");
import { DriverAppState } from "../apps/Driver/reducers";
import AccountsProfileCard from "./AccountsProfileCard";

const mapStateToProps = (state: DriverAppState) => ({
  userInfo: state.common.user.data
});

const connector = connect(mapStateToProps, {});

interface OwnProps {
  navigation: { navigate: Function };
  userInfo?: UserDataModel | null;
  persona: "driver" | "lsp" | "shipper";
}

const Wrapper = styled(Flex)`
  align-items: center;
  margin: 30px 50px;
`;

const ProfileWrapper = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
`;

const personaMapping: any = {
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
  },
  shipper: {
    text: "I am a shipper",
    icon: driverIcon,
    navigationScreen: "CreateProfile",
    businessKey: "shipper_details"
  }
};

const ProfileSection = ({ persona, navigation }: OwnProps) => {
  return (
    <>
      <ProfileWrapper>
        <Text>Current Profile</Text>
        <AccountsProfileCard
          disabled
          isBigCard
          showTick
          text={personaMapping[persona].text}
          icon={personaMapping[persona].icon}
        />
      </ProfileWrapper>
      <ProfileWrapper>
        <Text>Other Profiles</Text>
        {Object.keys(personaMapping).map(otherPersona =>
          otherPersona !== persona ? (
            <AccountsProfileCard
              key={otherPersona}
              text={personaMapping[otherPersona].text}
              subText={"SETUP REQUIRED"}
              icon={personaMapping[otherPersona].icon}
              onPress={() =>
                navigation.navigate(
                  personaMapping[otherPersona].navigationScreen
                )
              }
            />
          ) : null
        )}
      </ProfileWrapper>
    </>
  );
};

const AccountsPage: React.FC<OwnProps & ConnectedProps<typeof connector>> = (
  props: OwnProps
) => {
  const personName =
    props.userInfo &&
    props.userInfo.user_details &&
    props.userInfo.user_details.name;
  const contactNumber =
    props.userInfo &&
    props.userInfo.user_details &&
    props.userInfo.user_details.phone_number;
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
        navigation={props.navigation}
        userInfo={props.userInfo}
      />
    </Wrapper>
  ) : null;
};

export default connector(AccountsPage);
