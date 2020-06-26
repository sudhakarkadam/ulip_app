import React, { useState } from "react";
import Input from "../components/InputComponent";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { Text, FlexColumn, Flex, TextWrapper } from "./@styled/BaseElements";

interface OwnProps {
  createProfileCallback: (data: { name: string }) => void;
}

const PersonProfile = (props: OwnProps) => {
  const [name, setName] = useState("");
  return (
    <FlexColumn p={6} backgroundColor="white" height={320}>
      <Flex>
        <Text color={`${colors.black[2]}`} fontSize={4} fontWeight={700}>
          Personal details
        </Text>
      </Flex>
      <TextWrapper label="Full name">
        <Input value={name} onChangeText={text => setName(text)} />
      </TextWrapper>
      <TextWrapper label="Mobile number">
        <Input
          editable={false}
          value={"8823423412"}
          onChangeText={text => setName(text)}
        />
      </TextWrapper>
      <Flex mt={5}>
        <StyledButton
          disabled={!name}
          title="Save profile"
          height={40}
          fontSize={14}
          onPress={() => {
            props.createProfileCallback({ name });
          }}
        />
      </Flex>
    </FlexColumn>
  );
};

export default PersonProfile;