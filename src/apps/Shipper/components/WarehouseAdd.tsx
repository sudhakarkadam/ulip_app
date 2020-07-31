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
import { CommonState } from "../../../reducers";

const { saveWarehouse } = Actions;

const connector = connect(
  (state: CommonState) => ({
    business: state.user.data.user_details.filter(
      d => d.profile.persona === "SHIPPER"
    )[0]
  }),
  { saveWarehouse }
);

const WarehoueseAdd: React.FC<ConnectedProps<typeof connector>> = ({
  saveWarehouse,
  business
}) => {
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const id = business && business.business_details?.business_id;
  if (!id)
    return (
      <PrimaryHeaderText p={6}>
        <TranslationText id="no.business.id"></TranslationText>
      </PrimaryHeaderText>
    );
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
                    business_id: id,
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
