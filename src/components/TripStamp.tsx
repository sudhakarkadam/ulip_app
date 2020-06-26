import React from "react";
import { FlatList, View } from "react-native";
import { Box, Text, Flex, FlexSpaceBetween } from "./@styled/BaseElements";
import DestinationIcon from "../images/location.svg";
import { fontSize } from "styled-system";

interface Place {
  name: string;
  state?: string;
  description?: string;
  relativeDistance: number;
  address?: string;
}
interface Props {
  places: Place[];
}

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

const getLabel = (index: number) =>
  index === 0 ? <Label>From</Label> : <Label>To</Label>;

export const TripStamp: React.FC<Props> = ({ places }) => {
  const placesLastIndex = places.length - 1;
  return (
    <Box m={20} p={10}>
      <FlatList
        data={places}
        renderItem={({ item, index }) => {
          return (
            <>
              <Box background="" position="relative" justifyContent="center">
                {!!index && <TopLine></TopLine>}
                <Dot>
                  <DestinationIcon />
                </Dot>
                {placesLastIndex !== index && <BottomLine></BottomLine>}
                <Box p={10} ml={4} position="relative">
                  <FlexSpaceBetween flexDirection="row">
                    <Flex>
                      {getLabel(index)}
                      <Name fontWeight="bold">{item.name}</Name>
                      {!!item.state && <Name fontSize={10}>{item.state}</Name>}
                    </Flex>
                    <LightSubText>{item.relativeDistance || 0} KM</LightSubText>
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