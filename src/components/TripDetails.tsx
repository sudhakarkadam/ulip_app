import React from "react";
import styled from "styled-components";
import { Flex, Box, Image } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { PrimaryText } from "./@styled/Text";
import { TripStamp, Place } from "./TripStamp";
import { TruckType } from "../models/CommonModel";
import { Flex1Column } from "./@styled/Flex";
import Tag from "./@styled/Tag";

const trailerTruck = require("../images/trailerTruckColored.png");
const containerTruck = require("../images/containerTruckColored.png");
const openTruck = require("../images/openTruckColored.png");

const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
  margin-horizontal: 25;
`;

interface OwnProps {
  id?: string;
  pickupDate?: Date;
  truckType?: string;
  truckWeight?: string;
  truckUnit?: string;
  lspProvider?: string;
  places?: Place[];
}

const TripDetails = (props: OwnProps) => {
  const {
    pickupDate,
    truckType,
    truckWeight,
    truckUnit,
    id,
    places,
    lspProvider
  } = props;
  return (
    <>
      <Card
        style={{
          paddingVertical: 10,
          paddingHorizontal: 25,
          marginHorizontal: 0,
          borderStyle: "dashed", // dashed border not coming.
          borderRadius: 1,
          flexDirection: "row"
        }}
      >
        <PrimaryText style={{ textTransform: "uppercase" }}>
          trip id:{" "}
        </PrimaryText>
        <PrimaryText style={{ fontWeight: "bold" }}>{id || "NA"}</PrimaryText>
      </Card>
      <Card>{!!places && <TripStamp places={places} />}</Card>
      {lspProvider && (
        <Card style={{ paddingVertical: 7 }}>
          <PrimaryText>Logistics service provider</PrimaryText>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            {lspProvider}
          </PrimaryText>
        </Card>
      )}
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Pickup Date</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          {pickupDate?.toLocaleDateString()}
        </PrimaryText>
      </Card>
      <Card
        style={{
          paddingVertical: 7,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Flex1Column>
          <PrimaryText>Truck Type</PrimaryText>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            {truckType}
          </PrimaryText>
        </Flex1Column>
        <Box>
          <Image
            source={
              truckType === TruckType.TRAILOR
                ? trailerTruck
                : truckType === TruckType.CONTAINER
                ? containerTruck
                : openTruck
            }
            height={20}
            width={44}
            resizeMode="contain"
          />
        </Box>
      </Card>
      <Card
        style={{
          paddingVertical: 7,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Flex1Column>
          <PrimaryText>Required Weight</PrimaryText>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            {`${truckWeight} ${truckUnit}`}
          </PrimaryText>
        </Flex1Column>
        <Box>
          <Tag text={"RICE/GRAIN/WHEAT"}></Tag>
        </Box>
      </Card>
      <Card style={{ paddingVertical: 7, borderBottomColor: "white" }}>
        <PrimaryText>Uploaded Documents</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          ---
        </PrimaryText>
      </Card>
    </>
  );
};

export default TripDetails;
