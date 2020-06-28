import React, { useState } from "react";
import { Image } from "react-native";
import colors from "../../../theme/colors";
import { Flex, FlexRow, Text } from "../../../components/@styled/BaseElements";
import SelectComponent from "../../../components/SelectComponent";
import CalendarComponent from "../../../components/CalendarComponent";
import Input from "../../../components/InputComponent";
import TripDetails from "../../../components/TripDetails";
import StyledButton from "../../../components/@styled/StyledButton";
import TripProgress from "./TripProgress";

const openTruckImg = require("../../../images/open-truck.png");
const containerTruckImg = require("../../../images/container-truck.png");
const trailerTruckImg = require("../../../images/trailer-truck.png");
const openDarkTruckImg = require("../../../images/open-dark.png");

interface OwnProps {
  createTripCallback: (data: any) => any;
}

type Props = OwnProps;

const TruckTypeComp = (props: {
  weight: string;
  lspProvider: string;
  weightUnit: string;
  truckType: string;
  onChange: (val: string, type?: "lsp" | "unit" | "truckType") => void;
}) => {
  const { weight, onChange, lspProvider, weightUnit, truckType } = props;
  return (
    <Flex m={5}>
      <SelectComponent
        label="Logistics service provider"
        data={[{ label: "XYZ Logistic & Transportation", value: "xyz" }]}
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
          <Image style={{ width: 66, height: 27 }} source={containerTruckImg} />
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
          <Image style={{ width: 70, height: 28 }} source={trailerTruckImg} />
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
  const todayDate = new Date().toISOString().substr(0, 10);
  const [tripStep, setTripStep] = useState(0);
  const [fromValue, setFromValue] = useState("bg");
  const [toValue, setToValue] = useState("mum");
  const [pickupDate, setPickUpDate] = useState(todayDate);
  const [goodsType, setGoodsType] = useState("rice");
  const [truckType, setTruckType] = useState("open");
  const [weight, setWeight] = useState("");
  const [lspProvider, setLspProvider] = useState("xyz");
  const [weightUnit, setWeightUnit] = useState("TONNES");

  const handleNextClick = () => {
    if (tripStep < 4) {
      setTripStep(step => step + 1);
      return;
    }
    const location = {
      address: "Sector 4, Rohini",
      city: "bangalore",
      location_code: "loc_1",
      name: "Delhi",
      postal_code: "560035",
      state: "Delhi"
    };
    const pickLocation = {
      address: "i dont know",
      city: "mumbai",
      location_code: "loc_2",
      name: "bangalore",
      postal_code: "561035",
      state: "Karnataka"
    };
    const data = {
      delivery_location: location,
      good_type: goodsType,
      lsp_id: 5,
      pickup_date: `${pickupDate}T09:18:34.000+0000`,
      pickup_location: pickLocation,
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
    <Flex
      backgroundColor={tripStep === 4 ? "white" : ""}
      position="relative"
      height="100%"
    >
      {tripStep !== 4 && <TripProgress currentStep={tripStep} />}
      {tripStep === 0 ? (
        <Flex m={5}>
          <SelectComponent
            label="From"
            getSelectedValue={val => setFromValue(val)}
            data={[
              { label: "Bangalore", value: "bg" },
              { label: "Delhi", value: "del" },
              { label: "Kolkata", value: "kol" },
              { label: "Mumbai", value: "mum" }
            ]}
            defaultValue={fromValue}
          />
          <Flex mt={3}>
            <SelectComponent
              getSelectedValue={val => setToValue(val)}
              label="To"
              data={[
                { label: "Bangalore", value: "bg" },
                { label: "Delhi", value: "del" },
                { label: "Kolkata", value: "kol" },
                { label: "Mumbai", value: "mum" }
              ]}
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
          lspProvider={lspProvider}
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
      {tripStep === 4 ? (
        <TripDetails
          pickupDate={pickupDate}
          truckType={truckType}
          truckWeight={weight}
          truckUnit={weightUnit}
        />
      ) : null}
      <Flex width="92%" position="absolute" bottom={5} m={5}>
        <StyledButton
          height="40"
          title={
            tripStep === 3
              ? "preview"
              : tripStep === 4
              ? "Send Request"
              : "next"
          }
          onPress={handleNextClick}
        />
      </Flex>
    </Flex>
  );
};

export default CreateTrip;
