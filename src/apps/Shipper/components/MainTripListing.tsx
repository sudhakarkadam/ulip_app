import React from "react";
import { Text, Box, Flex } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";
import FloatingButton from "../../../components/@styled/FloatingButton";
import CreateTripCard from "./CreateTripCard";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamList } from "./HomeStack";

type Props = StackScreenProps<HomeStackParamList, "MainTripListing">;

const MainTripListing = (props: Props) => {
  const availableTrips = 0;
  return (
    <>
      {!availableTrips && (
        <>
          <Flex mt="3" />
          <CreateTripCard
            createTripCallback={() => props.navigation.push("CreateTrip")}
          />
        </>
      )}

      {!!availableTrips && (
        <Flex1 bg="white">
          <Box position="absolute" bottom="15" right="20">
            <FloatingButton
              size="large"
              onPress={() => props.navigation.push("CreateTrip")}
            >
              <Text color="white" fontSize="7">
                +
              </Text>
            </FloatingButton>
          </Box>
        </Flex1>
      )}
    </>
  );
};

export default MainTripListing;
