import React from "react";
import {
  FlexRow,
  FlexColumn,
  Text,
  Flex
} from "../../../components/@styled/BaseElements";
import TripDetails from "../../../components/TripDetails";

const TripDetailsPage = () => {
  return (
    <Flex backgroundColor="white">
      <TripDetails />
    </Flex>
  );
};

export default TripDetailsPage;
