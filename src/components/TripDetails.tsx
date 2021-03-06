import React, { useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Box,
  Image,
  FlexRow,
  ScrollView,
  TouchableOpacity
} from "./@styled/BaseElements";
import colors from "../theme/colors";
import { PrimaryLightText, PrimaryText, PrimaryLabel } from "./@styled/Text";
import { TripStamp, Place } from "./TripStamp";
import EWayBillCard from "./EWayBillCard";
import { TruckType } from "../models/CommonModel";
import { Flex1Column, Flex1 } from "./@styled/Flex";
import Tag from "./@styled/Tag";
import { Modal } from "react-native";
import moment from "moment";
import { TranslationText } from "./InternationalisationProvider";
import ContainerTruck from "../images/containerTruck.svg";
import TrailorTruck from "../images/trailorTruck.svg";
import OpenTruck from "../images/openTruck.svg";
import { StackNavigationProp } from "@react-navigation/stack";
import { TripStackList } from "../apps/LSP/components/LSPTripStack";
import PDFThumbnail from "./PDFThumbnail";
import Pdf from "react-native-pdf";

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
  pickupDateString?: string;
  truckType?: string;
  truckWeight?: string;
  truckUnit?: string;
  lspProvider?: string;
  places?: Place[];
  documents: {
    id: string;
    type: string;
    url: string;
  }[];
  goodsSegment?: string;
  ewbStatus?: string;
  ewbNumber?: string;
  tripId?: number;
  navigation?: StackNavigationProp<TripStackList, "EWayBillGenerationPage">;
  showEwb?: boolean;
}

const TripDetails = (props: OwnProps) => {
  const {
    pickupDate,
    truckType,
    truckWeight,
    truckUnit,
    id,
    places,
    lspProvider,
    pickupDateString,
    documents = [],
    ewbStatus,
    ewbNumber,
    tripId,
    navigation,
    showEwb
  } = props;

  const [showModal, setModalState] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const isPdf = (img: string) => img.includes(".pdf");

  const getModalContent = () => {
    let elem = (
      <Image
        source={{
          uri: selectedImage
        }}
        resizeMode="contain"
        style={{ width: "100%", height: "100%" }}
      />
    );

    if (isPdf(selectedImage)) {
      elem = (
        <Pdf source={{ uri: selectedImage, cache: true }} style={{ flex: 1 }} />
      );
    }

    return elem;
  };

  const getDocumentTemplate = (url: string) => {
    let elem = (
      <Image
        source={{ uri: url }}
        resizeMethod="resize"
        style={{ width: 95, height: 95 }}
      />
    );

    if (isPdf(url)) {
      elem = <PDFThumbnail pdfLink={url} />;
    }
    return elem;
  };

  return (
    <ScrollView>
      {id && (
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
          <PrimaryLightText style={{ textTransform: "uppercase" }}>
            <TranslationText id="trip.id"></TranslationText>
          </PrimaryLightText>
          <PrimaryText style={{ fontWeight: "bold" }}>{tripId}</PrimaryText>
        </Card>
      )}
      {showEwb && navigation && (
        <Box p={"16px"}>
          <EWayBillCard
            status={ewbStatus}
            ewbNumber={ewbNumber}
            tripId={tripId}
            navigation={navigation}
          />
        </Box>
      )}
      <Card>{!!places && <TripStamp places={places} />}</Card>
      {!!lspProvider && (
        <Card style={{ paddingVertical: 7 }}>
          <PrimaryLabel>
            <TranslationText id="lsp"></TranslationText>
          </PrimaryLabel>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            <TranslationText
              id="placeholder"
              interpolations={{ value: lspProvider }}
            ></TranslationText>
          </PrimaryText>
        </Card>
      )}
      <Card style={{ paddingVertical: 7 }}>
        <PrimaryLabel>
          <TranslationText id="pick.up.date"></TranslationText>
        </PrimaryLabel>
        <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
          <TranslationText
            id="placeholder"
            interpolations={{
              value:
                pickupDateString ||
                moment(pickupDate, moment.defaultFormatUtc).format("DD/MM/YYYY")
            }}
          ></TranslationText>
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
          <PrimaryLabel>
            <TranslationText id="truck.type"></TranslationText>
          </PrimaryLabel>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            <TranslationText
              id="placeholder"
              interpolations={{
                value: truckType + ""
              }}
            ></TranslationText>
          </PrimaryText>
        </Flex1Column>
        <Box>
          {truckType === TruckType.CONTAINER && <ContainerTruck />}
          {truckType === TruckType.OPEN && <OpenTruck />}
          {truckType === TruckType.TRAILOR && <TrailorTruck />}
          {truckType === TruckType.TROLLEY && <TrailorTruck />}
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
          <PrimaryLabel>
            <TranslationText id="required.weight"></TranslationText>
          </PrimaryLabel>
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            <TranslationText
              id="placeholder"
              interpolations={{
                value: `${truckWeight} ${truckUnit}`
              }}
            ></TranslationText>
          </PrimaryText>
        </Flex1Column>
        {props.goodsSegment && (
          <Box>
            <Tag text={props.goodsSegment}></Tag>
          </Box>
        )}
      </Card>
      <Card style={{ paddingVertical: 7, borderBottomColor: "white" }}>
        <PrimaryLabel>
          <TranslationText id="uploaded.docs" />
        </PrimaryLabel>
        {!documents.length && (
          <PrimaryText style={{ fontWeight: "bold", fontSize: 16 }}>
            ---
          </PrimaryText>
        )}
        {!!documents.length && (
          <FlexRow
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {documents.map(document => (
              <TouchableOpacity
                key={document.id}
                mx="3"
                my="3"
                onPress={() => {
                  setSelectedImage(document.url);
                  setModalState(!showModal);
                }}
              >
                {getDocumentTemplate(document.url)}
              </TouchableOpacity>
            ))}
          </FlexRow>
        )}
      </Card>
      <Modal transparent={true} visible={showModal}>
        <Flex1 bg="white">
          <Flex flexDirection="row-reverse">
            <TouchableOpacity
              p="5"
              onPress={() => {
                setModalState(!showModal);
              }}
            >
              <PrimaryText fontSize="6">X</PrimaryText>
            </TouchableOpacity>
          </Flex>
          <Flex1 width="100%">{getModalContent()}</Flex1>
        </Flex1>
      </Modal>
    </ScrollView>
  );
};

export default TripDetails;
