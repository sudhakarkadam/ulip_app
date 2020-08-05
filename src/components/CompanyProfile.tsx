import React, { useState } from "react";
import { ScrollView } from "react-native";
import Input from "../components/InputComponent";
import StyledButton from "../components/@styled/StyledButton";
import colors from "../theme/colors";
import { Flex1 } from "../components/@styled/Flex";
import {
  FlexColumn,
  Flex,
  TouchableOpacity,
  Box
} from "./@styled/BaseElements";
import { PrimaryHeaderText, TextWrapper } from "./@styled/Text";
import { Page, PageContent } from "./@styled/Page";
import { useIsFocused } from "@react-navigation/native";
const MapmyIndia = require("mmi-widget");

interface OwnProps {
  createCompanyCallback: (companyData: {
    name: string;
    regNumber: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    lat: number;
    lng: number;
  }) => void;
}

const PlacePicker = MapmyIndia.default.MapmyIndiaPlacePicker;

const CompanyProfile = (props: OwnProps) => {
  const [name, setName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showPicker, setPickerVisibility] = useState(false);
  const isFocused = useIsFocused();
  const locationProps = lat ? { center: [lat, lng] } : {};
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
                <Flex height={200}>
                  <Box height={100}>
                    <Flex1 pointerEvents="none">
                      {isFocused && (
                        <PlacePicker showJustMap={true} {...locationProps} />
                      )}
                    </Flex1>
                    <TouchableOpacity
                      onPress={() => setPickerVisibility(true)}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        backgroundColor: "transparent"
                      }}
                    ></TouchableOpacity>
                  </Box>
                </Flex>
              </TextWrapper>

              <Flex mt={10}>
                <StyledButton
                  disabled={!name || !regNumber || !address || !lat || !lng}
                  title="Save company"
                  fontSize={14}
                  onPress={() => {
                    props.createCompanyCallback({
                      name,
                      regNumber,
                      address,
                      city,
                      state,
                      postalCode,
                      lat,
                      lng
                    });
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
            resultCallback={(result: any) => {
              setAddress(result.formatted_address);
              setCity(result.city);
              setPostalCode(result.pincode);
              setState(result.state);
              setLat(result.lat);
              setLng(result.lng);
              setPickerVisibility(false);
            }}
          />
        </Flex1>
      )}
    </Flex1>
  );
};

export default CompanyProfile;
