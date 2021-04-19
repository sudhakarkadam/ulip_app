import React from "react";
import { FlatList, View } from "react-native";
import {
  Box,
  Text,
  Flex,
  FlexSpaceBetween,
  FlexVerticallyCenter
} from "./@styled/BaseElements";
import Tag from "./@styled/Tag";
import DestinationIcon from "../images/location.svg";
import TrailerIcon from "../images/trailer.svg";
import CheckIcon from "../images/tick.svg";
import { Location } from "../models/DriverTrips";
import { TranslationText } from "./InternationalisationProvider";

export interface Place {
  name: string;
  state?: string;
  description?: string;
  relativeDistance?: number;
  address?: string;
  tag?: string;
}

export interface CrossedPlace extends Place {
  crossed: boolean;
}

type Props =
  | {
      track?: false;
      places: Place[];
    }
  | {
      track: true;
      places: CrossedPlace[];
    };

const Dot: React.FC = ({ children }) => (
  <Box
    justifyContent="center"
    alignItems="center"
    position="absolute"
    background="#fff"
  >
    {children}
  </Box>
);
const TopLine = () => (
  <Box
    width={0}
    borderWidth={1}
    borderColor="#7A869A"
    borderStyle="dotted"
    borderRadius={0.0000001}
    position="absolute"
    top={0}
    left="8px"
    bottom="50%"
  ></Box>
);

const BottomLine = () => (
  <Box
    width={0}
    borderWidth={1}
    borderColor="#7A869A"
    borderStyle="dotted"
    borderRadius={0.0000001}
    position="absolute"
    bottom={0}
    top="50%"
    left="8px"
    zIndex={-1}
  ></Box>
);

const Label: React.FC = ({ children }) => (
  <Text fontSize={12} color="#6B778C">
    {children}
  </Text>
);

const Name: React.FC<{ fontSize?: number; fontWeight?: string }> = ({
  children,
  fontSize = 20,
  fontWeight = "normal"
}) => (
  <Text fontSize={fontSize} color="#172B4D" fontWeight={fontWeight}>
    {children}
  </Text>
);

const LightSubText: React.FC<{ fontSize?: number }> = ({
  children,
  fontSize = 14
}) => (
  <Text fontSize={fontSize} color="#7A869A">
    {children}
  </Text>
);

const getLabel = (index: number, item: Place | CrossedPlace) => {
<<<<<<< Updated upstream
  const label =
    index === 0 ? (
      <Label>
        <TranslationText id="from"></TranslationText>
      </Label>
    ) : (
      <Label>
        <TranslationText id="to"></TranslationText>
      </Label>
    );
=======
  const label = index === 0 ? <Label>{<TranslationText id="from"/>}</Label> : <Label>{<TranslationText id="to"/>}</Label>;
>>>>>>> Stashed changes
  return item.tag ? (
    <>
      <FlexVerticallyCenter flexDirection="row" justifyContent="space-around">
        {label}
        <Tag text={item.tag.toUpperCase()}></Tag>
      </FlexVerticallyCenter>
    </>
  ) : (
    label
  );
};

const getPosition = (places: CrossedPlace[]) => {
  const index = places.findIndex(p => !p.crossed) - 1;
  if (index < 0 && places[places.length - 1].crossed) return places.length - 1;
  return index;
};
export const TripStamp: React.FC<Props> = ({ places, track }) => {
  const placesLastIndex = places.length - 1;
  const trailerPosition = track && getPosition(places as CrossedPlace[]);
  return (
    <Box>
      <FlatList
        data={places}
        renderItem={({ item, index }) => {
          return (
            <>
              <Box background="" position="relative" justifyContent="center">
                {!!index && <TopLine></TopLine>}
                <Dot>
                  {trailerPosition === index ? (
                    <View style={{ position: "relative", top: -2, left: 3 }}>
                      <TrailerIcon />
                    </View>
                  ) : (
                    <DestinationIcon />
                  )}
                </Dot>
                {placesLastIndex !== index && <BottomLine></BottomLine>}
                <Box p={5} ml={4}>
                  <FlexSpaceBetween flexDirection="row">
                    <Flex>
                      {getLabel(index, item)}
                      <Name fontWeight="bold">{item.name}</Name>
                      {!!item.state && <Name fontSize={10}>{item.state}</Name>}
                    </Flex>
                    {(item as CrossedPlace).crossed ? (
                      <CheckIcon />
                    ) : (
                      <LightSubText>
                        {item.relativeDistance === undefined
                          ? null
                          : `${item.relativeDistance} KM`}
                      </LightSubText>
                    )}
                  </FlexSpaceBetween>
                  {!!item.address && (
                    <LightSubText fontSize={12}>{item.address}</LightSubText>
                  )}
                </Box>
              </Box>
            </>
          );
        }}
      ></FlatList>
    </Box>
  );
};

export const convert = (loc: Location): Place => {
  console.log("------------->", loc);
  return {
    name: loc.city,
    address: loc.address,
    state: loc.state
  };
};
