import React, { useState } from "react";
import { ScrollView } from "react-native";
import Input from "../components/InputComponent";
import MapComp from "./MapComp";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { Text, FlexColumn, Flex, TextWrapper } from "./@styled/BaseElements";

interface OwnProps {
  createCompanyCallback: (companyData: {
    name: string;
    regNumber: string;
  }) => void;
}

const CompanyProfile = (props: OwnProps) => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  return (
    <ScrollView>
      <FlexColumn p={6} backgroundColor="white" height="100%">
        <Flex>
          <Text color={`${colors.black[2]}`} fontSize={4} fontWeight={700}>
            Company details
          </Text>
        </Flex>
        <TextWrapper label="Company name">
          <Input value={name} onChangeText={text => setName(text)} />
        </TextWrapper>
        <TextWrapper label="Registration Number">
          <Input value={regNumber} onChangeText={text => setRegNumber(text)} />
        </TextWrapper>
        <TextWrapper label="Locate on map">
          <Flex height={200}>
            <MapComp />
          </Flex>
        </TextWrapper>
        <Flex mt={10}>
          <StyledButton
            disabled={!name || !regNumber}
            title="Save company"
            height={40}
            fontSize={14}
            onPress={() => {
              props.createCompanyCallback({ name, regNumber });
            }}
          />
        </Flex>
      </FlexColumn>
    </ScrollView>
  );
};

export default CompanyProfile;
