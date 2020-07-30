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
import Actions from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";

const { saveWarehouse } = Actions;

const connector = connect(null, { saveWarehouse });

const WarehoueseAdd: React.FC<ConnectedProps<typeof connector>> = ({
  saveWarehouse
}) => {
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
            <Input value={name} onChangeText={setName} label="Warehouse name" />
            <Input value={gstin} onChangeText={setGstin} label="GSTIN" />
            <TextWrapper label="Locate on map">
              <Flex height={120}>
                <MapComp />
              </Flex>
            </TextWrapper>

            <Input value={address} onChangeText={setAddress} label="Address" />
            <Input value={city} onChangeText={setCity} label="City" />
            <Input value={state} onChangeText={setState} label="State" />
            <Input
              value={postalCode}
              onChangeText={setPostalCode}
              label="Pin Code"
            />
            <Flex mt={10}>
              <StyledButton
                disabled={!name || !gstin}
                title="Save Warehouse"
                fontSize={14}
                onPress={() => {
                  if (!postalCode) return;

                  saveWarehouse({
                    business_id: "whattttt???",
                    gstin,
                    warehouse_name: name,
                    location: {
                      address,
                      city,
                      country: "India",
                      map_ref: {},
                      name,
                      postal_code: parseInt(postalCode, 10),
                      state
                    }
                  });
                }}
              />
            </Flex>
          </Box>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(WarehoueseAdd);
