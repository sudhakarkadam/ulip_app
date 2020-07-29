import React, { useState } from "react";
import { ConnectedProps } from "react-redux";
import { View, ScrollView } from "react-native";
import Input from "./InputComponent";
import { Text, Flex, Box } from "./@styled/BaseElements";
import { TextWrapper } from "./@styled/Text";
import StyledButton from "./@styled/StyledButton";
import { Page, PageContent } from "./@styled/Page";
import { TranslationText } from "./InternationalisationProvider";

const EWayBillGenerationPage: React.FC<ConnectedProps<
  typeof connector
>> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [supplierGst, setSupplierGst] = useState("");
  const [recipientGst, setRecipientGst] = useState("");
  const [pincode, setPincode] = useState("");
  const [invoiceNum, setInvoiceNum] = useState("");
  const [date, setDate] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [vehicleNum, setVehicleNum] = useState("");
  return (
    <Page>
      <PageContent>
        <ScrollView>
          <Flex m={20} p={"16px"} backgroundColor={"white"} height={"80%"}>
            <Text
              fontSize={"24px"}
              fontWeight={"bold"}
              color={"#000066"}
              pb={"16px"}
            >
              <TranslationText id="details"></TranslationText>
            </Text>
            <Text fontSize={"14px"} color={"#000066"}>
              <TranslationText id="must.have.ewb"></TranslationText>
            </Text>
            <TextWrapper label="E-Waybill Username">
              <Input
                value={username}
                onChangeText={text => setUsername(text)}
              />
            </TextWrapper>
            <TextWrapper label="E-Waybill Password">
              <Input
                value={password}
                onChangeText={text => setPassword(text)}
                textContentType={"password"}
                secureTextEntry={true}
              />
            </TextWrapper>
            <View
              style={{
                borderBottomColor: "#EFF0F2",
                borderBottomWidth: 1
              }}
            />
            <Box p={1} />
            <View
              style={{
                borderBottomColor: "#EFF0F2",
                borderBottomWidth: 1
              }}
            />

            <TextWrapper label="Transaction type">
              <Input
                value={transactionType}
                onChangeText={text => setTransactionType(text)}
              />
            </TextWrapper>
            <TextWrapper label="Supplier’s GSTIN">
              <Input
                value={supplierGst}
                onChangeText={text => setSupplierGst(text)}
              />
            </TextWrapper>
            <TextWrapper label="Recipient’s GSTIN">
              <Input
                value={recipientGst}
                onChangeText={text => setRecipientGst(text)}
              />
            </TextWrapper>
            <TextWrapper label="Delivery Pincode">
              <Input value={pincode} onChangeText={text => setPincode(text)} />
            </TextWrapper>
            <TextWrapper label="Invoice number">
              <Input
                value={invoiceNum}
                onChangeText={text => setInvoiceNum(text)}
              />
            </TextWrapper>
            <TextWrapper label="Invoice date">
              <Input value={date} onChangeText={text => setDate(text)} />
            </TextWrapper>
            <TextWrapper label="Total Value">
              <Input
                value={totalValue}
                onChangeText={text => setTotalValue(text)}
              />
            </TextWrapper>
            <TextWrapper label="HSN Code">
              <Input value={hsnCode} onChangeText={text => setHsnCode(text)} />
            </TextWrapper>
            <TextWrapper label="Vehicle number">
              <Input
                value={vehicleNum}
                onChangeText={text => setVehicleNum(text)}
              />
            </TextWrapper>

            <StyledButton
              width={"100%"}
              title={
                <Text>
                  <TranslationText id="continue" />{" "}
                  <Text fontSize={5}>&#8594;</Text>
                </Text>
              }
              onPress={() => {}}
            />
          </Flex>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default EWayBillGenerationPage;
