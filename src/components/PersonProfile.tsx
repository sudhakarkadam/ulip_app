import React, { useState } from "react";
import Input from "../components/InputComponent";
import StyledButton from "../components/@styled/StyledButton";
import { Flex } from "./@styled/BaseElements";
import { UserDataModel } from "../models/CommonModel";
import { PrimaryHeaderText } from "./@styled/Text";
import { Flex1 } from "./@styled/Flex";
import { Page, PageContent } from "./@styled/Page";

interface OwnProps {
  createProfileCallback: (data: { name: string }) => void;
  userInfo: UserDataModel | null;
}

const PersonProfile = (props: OwnProps) => {
  const [name, setName] = useState("");
  return (
    <Page>
      <PageContent>
        <Flex1 p={6} mt={4} backgroundColor="white">
          <Flex mb={5}>
            <PrimaryHeaderText>Personal details</PrimaryHeaderText>
          </Flex>
          <Input
            value={name}
            onChangeText={text => setName(text)}
            label="Full name"
          />
          <Input
            label="Mobile number"
            editable={false}
            value={`+91-${props.userInfo?.phone_number}` || ""}
            onChangeText={text => setName(text)}
          />
          <Flex mt={5}>
            <StyledButton
              disabled={!name}
              title="Save profile"
              fontSize={14}
              onPress={() => {
                props.createProfileCallback({ name });
              }}
            />
          </Flex>
        </Flex1>
      </PageContent>
    </Page>
  );
};

export default PersonProfile;
