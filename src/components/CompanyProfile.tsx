import React, { useState } from "react";
import { ScrollView } from "react-native";
import Input from "../components/InputComponent";
import MapComp from "./MapComp";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { FlexColumn, Flex, TouchableOpacity } from "./@styled/BaseElements";
import { PrimaryHeaderText, TextWrapper } from "./@styled/Text";
import { Page, PageContent } from "./@styled/Page";
import { Flex1 } from "./@styled/Flex";

const MapmyIndia = require("mmi-widget");

interface OwnProps {
  createCompanyCallback: (companyData: {
    name: string;
    regNumber: string;
  }) => void;
}

const PlacePicker = MapmyIndia.default.MapmyIndiaPlacePicker;

const CompanyProfile = (props: OwnProps) => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [showPicker, setPickerVisibility] = useState(false);
  return (
    <Flex1>
      <Page>
        <PageContent>
          <ScrollView>
            <FlexColumn p={6} backgroundColor="white" height="100%">
              <Flex>
                <PrimaryHeaderText
                  color={`${colors.black[2]}`}
                  fontSize={4}
                  fontWeight={700}
                >
                  Company details
                </PrimaryHeaderText>
              </Flex>
              <TextWrapper label="Company name">
                <Input value={name} onChangeText={text => setName(text)} />
              </TextWrapper>
              <TextWrapper label="Registration Number">
                <Input
                  value={regNumber}
                  onChangeText={text => setRegNumber(text)}
                />
              </TextWrapper>
              <TextWrapper label="Locate on map">
                <TouchableOpacity
                  height={200}
                  onPress={() => setPickerVisibility(true)}
                >
                  <MapComp />
                </TouchableOpacity>
              </TextWrapper>
              <Flex mt={10}>
                <StyledButton
                  disabled={!name || !regNumber}
                  title="Save company"
                  fontSize={14}
                  onPress={() => {
                    props.createCompanyCallback({ name, regNumber });
                  }}
                />
              </Flex>
            </FlexColumn>
          </ScrollView>
        </PageContent>
      </Page>
      {showPicker && (
        <Flex1 position="absolute" top="0" bottom="0" right="0" left="0">
          <PlacePicker
            resultCallback={result => {
              console.log(result);
            }}
          />
        </Flex1>
      )}
    </Flex1>
  );
};

export default CompanyProfile;
