import React, { useState } from "react";
import { PrimaryHeaderText } from "../../../components/@styled/Text";
import { PageContent, Page } from "../../../components/@styled/Page";
import { TranslationText } from "../../../components/InternationalisationProvider";
import {
  Box,
  TextWrapper,
  Flex,
  ScrollView
} from "../../../components/@styled/BaseElements";
import Input from "../../../components/InputComponent";
import MapComp from "../../../components/MapComp";
import StyledButton from "../../../components/@styled/StyledButton";
const WarehoueseAdd = () => {
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <Page>
      <PageContent>
        <ScrollView>
          <PrimaryHeaderText p={6}>
            <TranslationText id="warehouse.details"></TranslationText>
          </PrimaryHeaderText>
          <Box p={6}>
            <Input
              value={name}
              onChangeText={text => setName(text)}
              label="Warehouse name"
            />
            <Input
              value={gstin}
              onChangeText={text => setGstin(text)}
              label="GSTIN"
            />
            <TextWrapper label="Locate on map">
              <Flex height={120}>
                <MapComp />
              </Flex>
            </TextWrapper>

            <Input
              value={address}
              onChangeText={text => setAddress(text)}
              label="Address"
            />
            <Input
              value={city}
              onChangeText={text => setCity(text)}
              label="City"
            />
            <Input
              value={state}
              onChangeText={text => setState(text)}
              label="State"
            />
            <Input
              value={postalCode}
              onChangeText={text => setPostalCode(text)}
              label="Pin Code"
            />
            <Flex mt={10}>
              <StyledButton
                disabled={!name || !gstin}
                title="Save Warehouse"
                fontSize={14}
                onPress={() => {}}
              />
            </Flex>
          </Box>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default WarehoueseAdd;
