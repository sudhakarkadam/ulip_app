import React from "react";
import styled from "styled-components";
import { ScrollView, Flex, FlexRow } from "./@styled/BaseElements";
import { PrimaryText } from "./@styled/Text";
import StyledButton from "./@styled/StyledButton/StyledButton";
import colors from "../theme/colors";
import moment from "moment";
import { Page, PageContent } from "./@styled/Page";

const Card = styled(Flex)`
  border-bottom-color: ${colors.grays[1]};
  border-width: 1;
  border-left-color: #ffffff;
  border-top-color: #ffffff;
  border-right-color: #ffffff;
  margin-horizontal: 25;
`;

interface OwnProps {
  ewb: string;
  deliveredDate?: Date;
  deliveredDateString?: string;
  deliveredTime?: string;
  deliveryLandmark: string;
  deliveryAddress: string;
  shipper: { name: string; address: string };
  signature: string;
}

const PODDocument = (props: OwnProps) => {
  const {
    ewb = "1810000120234",
    deliveredDate,
    deliveredDateString = "30/07/2020",
    deliveredTime = "12:30 PM",
    deliveryLandmark = "Nestle Warehouse",
    deliveryAddress = "ICC Chambers, Saki vihar rd, Muranjan wadi, Marol, Andheri East, Mumbai, Maharashtra 400072",
    shipper = {
      name: "Nestle Warehouse",
      address:
        "ICC Chambers, Saki vihar rd, Muranjan wadi, Marol, Andheri East, Mumbai, Maharashtra 400072"
    },
    signature
  } = props;
  return (
    <Page>
      <PageContent>
        <ScrollView backgroundColor="#ffffff" mt={4}>
          {ewb && (
            <Card
              style={{
                paddingVertical: 10,
                paddingHorizontal: 25,
                marginHorizontal: 0,
                borderStyle: "dashed", // dashed border not coming.
                borderRadius: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <FlexRow>
                <PrimaryText>EWB: </PrimaryText>
                <PrimaryText style={{ fontWeight: "bold" }}>{ewb}</PrimaryText>
              </FlexRow>
              {/* TODO: Make this button smaller */}
              <FlexRow>
                <StyledButton
                  variant="outline"
                  height="20px"
                  width="172px"
                  title={"Delivery Receipt"}
                  onPress={() => {}}
                  style={{ paddingBottom: 15 }}
                />
              </FlexRow>
            </Card>
          )}
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Delivered on</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {moment(
                deliveredDateString || deliveredDate,
                moment.defaultFormatUtc
              ).format("DD/MM/YYYY")}
              {", "}
              {deliveredTime}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Delivery Address</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {deliveryLandmark}
            </PrimaryText>
            <PrimaryText style={{ fontSize: 12 }}>
              {deliveryAddress}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Shipper</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {shipper.name}
            </PrimaryText>
            <PrimaryText style={{ fontSize: 12 }}>
              {shipper.address}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Received by</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {"Brijesh Singh"}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7, borderBottomColor: "#ffffff" }}>
            <PrimaryText>Receiver signature</PrimaryText>
          </Card>
        </ScrollView>
        {!signature && (
          <Flex
            mt={3}
            px={7}
            py={5}
            style={{
              backgroundColor: "#ffffff"
            }}
          >
            <StyledButton
              title="Add Signature"
              fontSize={14}
              onPress={() => {}}
            />
          </Flex>
        )}
      </PageContent>
    </Page>
  );
};

export default PODDocument;
