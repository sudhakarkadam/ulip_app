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
import CheckIcon from "../images/check-circle-1.svg";

interface Place {
  name: string;
  state?: string;
  description?: string;
  relativeDistance: number;
  address?: string;
  tag?: string;
}

interface CrossedPlace extends Place {
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
  const label = index === 0 ? <Label>From</Label> : <Label>To</Label>;
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

export const TripStamp: React.FC<Props> = ({ places, track }) => {
  const placesLastIndex = places.length - 1;
  const trailerPosition =
    track && (places as CrossedPlace[]).findIndex(p => !p.crossed) - 1;
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
                <Box p={5} ml={4} position="relative">
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
                        {item.relativeDistance || 0} KM
                      </LightSubText>
                    )}
                  </FlexSpaceBetween>
                  {item.address && (
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
