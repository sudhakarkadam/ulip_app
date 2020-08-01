import React from "react";
import styled from "styled-components";
import { ScrollView, Flex, FlexRow, Box } from "./@styled/BaseElements";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "../apps/Driver/components/AuthenticatedFlow";
import { PrimaryText } from "./@styled/Text";
import StyledButton from "./@styled/StyledButton/StyledButton";
import colors from "../theme/colors";
import moment from "moment";
import { Page, PageContent } from "./@styled/Page";
import { Image, View } from "react-native";
import { CommonState } from "../reducers";
import { connect, ConnectedProps } from "react-redux";
import { Document } from "src/models/DriverTrips";
const Received = require("../images/received-stamp.png");

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

const mapStateToProps = (state: CommonState) => ({
  trip: state.driverTrip.data
});

const connector = connect(mapStateToProps);

type Props = OwnProps &
  ConnectedProps<typeof connector> & {
    navigation: StackNavigationProp<DriverHomeStackParamList, "PODDetailsPage">;
  } & StackScreenProps<DriverHomeStackParamList, "PODDetailsPage">;

const PODDetails = (props: Props) => {
  const {
    ewb = "1810000120234",
    deliveredDate,
    deliveredDateString = "30/07/2020",
    deliveredTime = "12:30 PM",
    shipper = {
      name: "Nestle Warehouse",
      address:
        "ICC Chambers, Saki vihar rd, Muranjan wadi, Marol, Andheri East, Mumbai, Maharashtra 400072"
    },
    signature
  } = props;

  const destination = props.trip?.destination_location_details;
  const pod = props.trip?.documents?.find((document: Document) => {
    return document?.type === "POD";
  });

  return (
    <Page>
      <PageContent>
        <ScrollView backgroundColor="#ffffff" mt={4}>
          {props.trip?.trip_status === "COMPLETED" && (
            <Box position="absolute" ml={150} mt={60}>
              <Image source={Received} style={{ width: 200, height: 115 }} />
            </Box>
          )}
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
                moment?.defaultFormatUtc
              ).format("DD/MM/YYYY")}
              {", "}
              {deliveredTime}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Delivery Address</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {destination?.name}
            </PrimaryText>
            <PrimaryText style={{ fontSize: 12 }}>
              {destination?.address}, {destination?.city},{" "}
              {destination?.postal_code}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Shipper</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {shipper?.name}
            </PrimaryText>
            <PrimaryText style={{ fontSize: 12 }}>
              {shipper?.address}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7 }}>
            <PrimaryText>Received by</PrimaryText>
            <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
              {pod && pod.id}
            </PrimaryText>
          </Card>
          <Card style={{ paddingVertical: 7, borderBottomColor: "#ffffff" }}>
            <PrimaryText>Receiver signature</PrimaryText>
            {pod && (
              <View style={{ paddingTop: 50 }}>
                <Image
                  source={{ uri: pod?.url }}
                  style={{ resizeMode: "stretch", height: 200, width: 100 }}
                />
              </View>
            )}
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
              onPress={() => {
                props.navigation.navigate("SignatureUpload");
              }}
            />
          </Flex>
        )}
      </PageContent>
    </Page>
  );
};

export default connector(PODDetails);
