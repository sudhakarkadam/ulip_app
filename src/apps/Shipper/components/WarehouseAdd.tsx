import React, { useState } from "react";
import { PrimaryHeaderText } from "../../../components/@styled/Text";
import { PageContent, Page } from "../../../components/@styled/Page";
import { TranslationText } from "../../../components/InternationalisationProvider";
import {
  Box,
  Flex,
  ScrollView,
  Text,
  TouchableOpacity
} from "../../../components/@styled/BaseElements";
import { TextWrapper } from "../../../components/@styled/Text";
import Input from "../../../components/InputComponent";
import { Flex1 } from "../../../components/@styled/Flex";
import StyledButton from "../../../components/@styled/StyledButton";
import { StackScreenProps } from "@react-navigation/stack";
import Actions from "../../../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { CommonState } from "../../../reducers";
import { ToastAndroid } from "react-native";
import { HomeStackParamList } from "./HomeStack";

const gstinPattern = new RegExp(
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9][A-Z][0-9]$/
);

const MapmyIndia = require("mmi-widget");

const { saveWarehouse } = Actions;

const connector = connect(
  (state: CommonState) => ({
    business: state.user.data.user_details.filter(
      d => d.profile.persona === "SHIPPER"
    )[0]
  }),
  { saveWarehouse }
);

const PlacePicker = MapmyIndia.default.MapmyIndiaPlacePicker;

const WarehouseAdd: React.FC<ConnectedProps<typeof connector> &
  StackScreenProps<HomeStackParamList, "WarehouseAdd">> = ({
  saveWarehouse,
  business,
  navigation
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [gstin, setGstin] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [showPicker, setPickerVisibility] = useState(false);
  const id = business && business.business_details?.business_id;
  const locationProps = lat ? { center: [lng, lat] } : {};
  if (!id)
    return (
      <PrimaryHeaderText p={6}>
        <TranslationText id="no.business.id"></TranslationText>
      </PrimaryHeaderText>
    );
  return (
    <Flex1>
      <Page>
        <PageContent>
          <ScrollView>
            <PrimaryHeaderText p={6}>
              <TranslationText id="warehouse.details"></TranslationText>
            </PrimaryHeaderText>
            <Box p={6}>
              <Input
                value={name}
                onChangeText={setName}
                label="Warehouse name*"
              />
              <Input value={gstin} onChangeText={setGstin} label="GSTIN*" />
              <Box mb={5}>
                <TextWrapper label="Locate on map">
                  <Box height={100}>
                    <Flex1 pointerEvents="none">
                      {!showPicker && (
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
                </TextWrapper>
              </Box>

              <Input
                value={address}
                onChangeText={setAddress}
                label="Address"
                numberOfLines={3}
                multiline={true}
              />
              <Input value={city} onChangeText={setCity} label="City" />
              <Input value={state} onChangeText={setState} label="State" />
              <Input
                value={postalCode}
                onChangeText={setPostalCode}
                label="Pin Code*"
              />
              <Flex mt={10}>
                <StyledButton
                  disabled={
                    !name || !gstinPattern.test(gstin) || !postalCode || loading
                  }
                  title={loading ? <Text>Saving...</Text> : "Save Warehouse"}
                  fontSize={14}
                  onPress={async () => {
                    setLoading(true);
                    try {
                      await saveWarehouse({
                        business_id: id,
                        gstin,
                        warehouse_name: name,
                        location: {
                          address,
                          city,
                          country: "India",
                          map_ref: {},
                          latitude: lat,
                          longitude: lng,
                          name,
                          postal_code: parseInt(postalCode, 10),
                          state
                        }
                      });
                      ToastAndroid.show("Saved warehouse", ToastAndroid.SHORT);
                      navigation.goBack();
                    } catch {
                      ToastAndroid.show(
                        "Failed to save warehouse",
                        ToastAndroid.SHORT
                      );
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
              </Flex>
            </Box>
          </ScrollView>
        </PageContent>
      </Page>
      {showPicker && (
        <Flex1 position="absolute" top="0" bottom="0" right="0" left="0">
          <PlacePicker
            {...locationProps}
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

export default connector(WarehouseAdd);
