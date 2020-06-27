import React from "react";
import styled from "styled-components";
import { Flex } from "./@styled/BaseElements";
import colors from "../theme/colors";
import { PrimaryText } from "./@styled/Text";
import { TripStamp } from "./TripStamp";

const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
  margin-horizontal: 25;
`;

interface OwnProps {
  pickupDate?: string;
  truckType?: string;
  truckWeight?: string;
  truckUnit?: string;
}

const TripDetails = (props: OwnProps) => {
  const { pickupDate, truckType, truckWeight, truckUnit } = props;
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
        <PrimaryText style={{ fontWeight: "bold" }}>
          TR29182917182717
        </PrimaryText>
      </Card>
      <Card>
        <TripStamp
          places={[
            { name: "Bangalore", state: "Karnataka", relativeDistance: 0 },
            {
              name: "Mumbai",
              state: "Maharashtra",
              relativeDistance: 1239,
              address:
                "ICC Chambers, Saki Bihar Rd, Muranjan Wadi, Marol, Andheri East, Mumbai, Maharashtra 40072"
            }
          ]}
        />
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Pickup Date</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          {pickupDate || "30/06/2020"}
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Truck Type</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          {truckType || "Open"}
        </PrimaryText>
      </Card>
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryText>Required Weight</PrimaryText>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          {truckWeight ? `${truckWeight} ${truckUnit}` : "2.5 Ton"}
        </PrimaryText>
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
