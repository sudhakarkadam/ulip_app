import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import colors from "../theme/colors";
import { Flex, FlexRow, Text, Box } from "./@styled/BaseElements";
import SelectComponent from "./SelectComponent";
import CalendarComponent from "./CalendarComponent";
import Input from "./InputComponent";
import TripDetails from "./TripDetails";
import StyledButton from "./@styled/StyledButton";
import TripProgress from "./TripProgress";
import { LspDetailsObj } from "../models/ShipperApiModels";
import { PageContent, Page } from "./@styled/Page";

const openTruckImg = require("../images/open-truck.png");
const containerTruckImg = require("../images/container-truck.png");
const containerLightImg = require("../images/container-light.png");
const trailerTruckImg = require("../images/trailer-truck.png");
const trailerLightImg = require("../images/trailer-light.png");
const openDarkTruckImg = require("../images/open-dark.png");

interface OwnProps {
  createTripCallback: (data: any) => any;
  lspList: LspDetailsObj[];
}

type Props = OwnProps;

const LocationsList = [
  {
    address: "Sector 4, Rohini",
    city: "Delhi",
    name: "Delhi",
    state: "Delhi",
    label: "Delhi",
    value: "del"
  },
  {
    label: "Bangalore",
    value: "bg",
    city: "Bangalore",
    state: "Karnataka",
    name: "Bangalore",
    address: "Devrabessanhalli, Bangalore"
  },
  {
    label: "Kolkata",
    value: "kol",
    city: "Kolkata",
    state: "West Bengal",
    name: "Kolkata",
    address: "Jibantala, Kolkata"
  },
  {
    label: "Mumbai",
    value: "mum",
    city: "Mumbai",
    state: "Maharashtra",
    name: "Mumbai",
    address: "Powai, Mumbai"
  }
];

const TruckTypeComp = (props: {
  lspList: { label: string; value: string }[];
  weight: string;
  lspProvider: string;
  weightUnit: string;
  truckType: string;
  onChange: (val: string, type?: "lsp" | "unit" | "truckType") => void;
}) => {
  const {
    weight,
    onChange,
    lspProvider,
    weightUnit,
    truckType,
    lspList
  } = props;
  return (
    <Flex m={5}>
      <SelectComponent
        label="Logistics service provider"
        data={lspList}
        defaultValue={lspProvider}
        getSelectedValue={val => onChange(val, "lsp")}
      />
      <Flex mt={3}>
        <Text color={`${colors.grays[5]}`} fontSize={1}>
          Preference
        </Text>
      </Flex>
      <FlexRow height="90" backgroundColor="white" mt={3}>
        <Flex
          onTouchEnd={() => onChange("open", "truckType")}
          backgroundColor={`${truckType === "open" ? colors.black[1] : null}`}
          flex={1}
          p={5}
          pl={10}
        >
          <Flex mb={3} ml={2}>
            <Text color={truckType === "open" ? "white" : `${colors.black[1]}`}>
              Open
            </Text>
          </Flex>
          <Image
            style={{ width: 49, height: 27 }}
            source={truckType === "open" ? openTruckImg : openDarkTruckImg}
          />
        </Flex>
        <Flex
          onTouchEnd={() => onChange("container", "truckType")}
          backgroundColor={`${
            truckType === "container" ? colors.black[1] : null
          }`}
          flex={1}
          p={5}
          borderLeftWidth="1px"
          borderRightWidth="1px"
          borderColor={`${colors.grays[2]}`}
        >
          <Flex mb={3} ml={1}>
            <Text
              color={truckType === "container" ? "white" : `${colors.black[1]}`}
            >
              Container
            </Text>
          </Flex>
          <Image
            style={{ width: 66, height: 27 }}
            source={
              truckType === "container" ? containerLightImg : containerTruckImg
            }
          />
        </Flex>
        <Flex
          onTouchEnd={() => onChange("trailor", "truckType")}
          backgroundColor={`${
            truckType === "trailor" ? colors.black[1] : null
          }`}
          flex={1}
          p={5}
        >
          <Flex mb={3} ml={3}>
            <Text
              color={truckType === "trailor" ? "white" : `${colors.black[1]}`}
            >
              Trailer
            </Text>
          </Flex>
          <Image
            style={{ width: 70, height: 28 }}
            source={truckType === "trailor" ? trailerLightImg : trailerTruckImg}
          />
        </Flex>
      </FlexRow>
      <Flex mt={3}>
        <Text color={`${colors.grays[5]}`} fontSize={1}>
          Required weight
        </Text>
      </Flex>
      <FlexRow justifyContent="space-between" mt={3}>
        <Flex flex={1} mr={3}>
          <Input
            style={{
              backgroundColor: "white",
              height: 40,
              borderColor: "white"
            }}
            value={weight}
            onChangeText={text => onChange(text)}
          />
        </Flex>
        <Flex flex={2}>
          <SelectComponent
            getSelectedValue={val => onChange(val, "unit")}
            data={[{ label: "Tonnes", value: "TONNES" }]}
            defaultValue={weightUnit}
          />
        </Flex>
      </FlexRow>
    </Flex>
  );
};

const CreateTrip = (props: Props) => {
  const lspList = props.lspList.map(lsp => ({
    label: lsp.legal_name,
    value: lsp.business_id.toString()
  }));
  const todayDate = new Date().toISOString().substr(0, 10);
  const [tripStep, setTripStep] = useState(0);
  const [fromValue, setFromValue] = useState(LocationsList[0].value);
  const [toValue, setToValue] = useState(LocationsList[1].value);
  const [pickupDate, setPickUpDate] = useState(todayDate);
  const [goodsType, setGoodsType] = useState("rice");
  const [truckType, setTruckType] = useState("open");
  const [weight, setWeight] = useState("");
  const [lspProvider, setLspProvider] = useState(lspList[0].value);
  const [weightUnit, setWeightUnit] = useState("KG");

  const handleNextClick = () => {
    if (tripStep < 4) {
      setTripStep(step => step + 1);
      return;
    }
    const data = {
      destination_location_details: LocationsList.filter(loc => loc.value === toValue)[0],
      good_segment: goodsType,
      lsp_business_id:lspProvider,
      pickup_request_time: `${pickupDate}`,
      source_location_details: LocationsList.filter(loc => loc.value === fromValue)[0],
      truck_type_preference: truckType.toUpperCase(),
      weight: Number(weight),
      weight_unit: weightUnit
    };

    props.createTripCallback(data);
    return;
  };

  const allPlaces = [
    ...LocationsList.filter(loc => loc.value === fromValue).map(loc => ({
      name: loc.name,
      state: loc.state,
      address: loc.address
    })),
    ...LocationsList.filter(loc => loc.value === toValue).map(loc => ({
      name: loc.name,
      state: loc.state,
      address: loc.address
    }))
  ];
  return (
    <Page>
      <PageContent>
        {tripStep !== 4 && (
          <Flex
            backgroundColor={tripStep === 4 ? "white" : ""}
            position="relative"
            height="100%"
          >
            <TripProgress currentStep={tripStep} />
            {tripStep === 0 ? (
              <Flex m={5}>
                <SelectComponent
                  label="From"
                  getSelectedValue={val => setFromValue(val)}
                  data={LocationsList}
                  defaultValue={fromValue}
                />
                <Flex mt={3}>
                  <SelectComponent
                    getSelectedValue={val => setToValue(val)}
                    label="To"
                    data={LocationsList}
                    defaultValue={toValue}
                  />
                </Flex>
              </Flex>
            ) : null}
            {tripStep === 1 ? (
              <Flex m={5}>
                <CalendarComponent
                  defaultDate={pickupDate}
                  getSelectedDate={val => setPickUpDate(val)}
                  label="Pickup date"
                />
              </Flex>
            ) : null}
            {tripStep === 2 ? (
              <Flex m={5}>
                <SelectComponent
                  getSelectedValue={val => setGoodsType(val)}
                  label="Select goods type"
                  data={[
                    { label: "Rice/Grain/Wheat", value: "rice" },
                    { label: "Auto Parts", value: "auto" },
                    { label: "Chemicals", value: "chem" },
                    { label: "Coal", value: "coal" },
                    { label: "Metals - Iron/ Copper/ Zinc", value: "metals" },
                    { label: "FMCG", value: "fmcg" }
                  ]}
                  defaultValue={goodsType}
                />
              </Flex>
            ) : null}
            {tripStep === 3 ? (
              <TruckTypeComp
                lspList={lspList}
                lspProvider={lspProvider.toString()}
                weightUnit={weightUnit}
                weight={weight}
                truckType={truckType}
                onChange={(val, type) => {
                  if (!type) {
                    setWeight(val);
                    return;
                  }
                  if (type === "lsp") {
                    setLspProvider(val);
                    return;
                  }
                  if (type === "truckType") {
                    setTruckType(val);
                    return;
                  }
                  return setWeightUnit(val);
                }}
              />
            ) : null}

            <Flex width="98%" position="absolute" bottom={1} m={2}>
              <StyledButton
                disabled={tripStep === 3 && !weight}
                title={tripStep === 3 ? "preview" : "next"}
                onPress={handleNextClick}
              />
            </Flex>
          </Flex>
        )}
        {tripStep === 4 && (
          <ScrollView>
            <Flex height="100%" backgroundColor={tripStep === 4 ? "white" : ""}>
              <TripDetails
                pickupDate={new Date(pickupDate)}
                truckType={truckType.toUpperCase()}
                truckWeight={weight}
                truckUnit={weightUnit}
                lspProvider={
                  lspList.filter(lsp => lsp.value === lspProvider)[0].label
                }
                places={allPlaces}
              />
              <FlexRow m={5}>
                <StyledButton
                  title="Modify Request"
                  variant="outline"
                  onPress={() => setTripStep(0)}
                  style={{ flex: 1 }}
                />
                <Box width={10}></Box>
                <StyledButton
                  title="Send Request"
                  style={{ flex: 1 }}
                  onPress={handleNextClick}
                />
              </FlexRow>
            </Flex>
          </ScrollView>
        )}
      </PageContent>
    </Page>
  );
};

export default CreateTrip;
