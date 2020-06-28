import React, { useState } from "react";
import { Image, ScrollView } from "react-native";
import colors from "../../../theme/colors";
import { Flex, FlexRow, Text } from "../../../components/@styled/BaseElements";
import SelectComponent from "../../../components/SelectComponent";
import CalendarComponent from "../../../components/CalendarComponent";
import Input from "../../../components/InputComponent";
import TripDetails from "../../../components/TripDetails";
import StyledButton from "../../../components/@styled/StyledButton";
import TripProgress from "./TripProgress";
import { LspDetailsObj } from "../models/ShipperApiModels";

const openTruckImg = require("../../../images/open-truck.png");
const containerTruckImg = require("../../../images/container-truck.png");
const containerLightImg = require("../../../images/container-light.png");
const trailerTruckImg = require("../../../images/trailer-truck.png");
const trailerLightImg = require("../../../images/trailer-light.png");
const openDarkTruckImg = require("../../../images/open-dark.png");

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
          onTouchEnd={() => onChange("trailer", "truckType")}
          backgroundColor={`${
            truckType === "trailer" ? colors.black[1] : null
          }`}
          flex={1}
          p={5}
        >
          <Flex mb={3} ml={3}>
            <Text
              color={truckType === "trailer" ? "white" : `${colors.black[1]}`}
            >
              Trailer
            </Text>
          </Flex>
          <Image
            style={{ width: 70, height: 28 }}
            source={truckType === "trailer" ? trailerLightImg : trailerTruckImg}
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
    label: lsp.lsp_name,
    value: lsp.lsp_id.toString()
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
  const [weightUnit, setWeightUnit] = useState("TONNES");

  const handleNextClick = () => {
    if (tripStep < 4) {
      setTripStep(step => step + 1);
      return;
    }
    const data = {
      delivery_location: LocationsList.filter(loc => loc.value === toValue)[0],
      good_type: goodsType,
      lsp_id: Number(lspProvider),
      pickup_date: `${pickupDate}`,
      pickup_location: LocationsList.filter(loc => loc.value === fromValue)[0],
      truck_type:
        truckType.toUpperCase() === "TRAILER"
          ? "TRAILOR"
          : truckType.toUpperCase(),
      weight: Number(weight),
      weight_unit: weightUnit
    };

    props.createTripCallback(data);
    return;
  };
  return (
    <>
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
                data={[{ label: "Rice/Grain/Wheat", value: "rice" }]}
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
              height="40"
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
              pickupDate={pickupDate}
              truckType={truckType}
              truckWeight={weight}
              truckUnit={weightUnit}
              lspProvider={
                lspList.filter(lsp => lsp.value === lspProvider)[0].label
              }
            />
            <FlexRow m={5}>
              <StyledButton
                title="Modify Request"
                color={`${colors.black[0]}`}
                style={{ flex: 1, backgroundColor: "white", borderColor: "" }}
                onPress={() => setTripStep(0)}
              />
              <StyledButton
                title="Send Request"
                style={{ flex: 1 }}
                onPress={handleNextClick}
              />
            </FlexRow>
          </Flex>
        </ScrollView>
      )}
    </>
  );
};

export default CreateTrip;
