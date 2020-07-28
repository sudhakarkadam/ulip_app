import React, { useState, useRef } from "react";
import { ConnectedProps, connect } from "react-redux";
import { StyleSheet, View, CheckBox } from "react-native";
import Input from "../../../components/InputComponent";
import {
  Text,
  Flex,
  FlexRow,
  TextWrapper,
  FlexColumn
} from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton";
import { StickyBottom } from "../../../components/StickyBottom";
import SignatureCapture, {
  SaveEventParams
} from "react-native-signature-capture";
import { DriverActionCreators } from "../actions/DriverActionCreators";
import { Page, PageContent } from "../../../components/@styled/Page";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { CommonState } from "../../../reducers";

const { upload } = DriverActionCreators;
const mapDispatchToProps = { upload };
const mapStateToProps = (state: CommonState) => ({
  trips: state.trips
});
const connector = connect(mapStateToProps, mapDispatchToProps);

const ProofOfDelivery: React.FC<ConnectedProps<typeof connector>> = props => {
  const tripId = props.trips.data?.transport_service_requests[0].tsr_id;
  const signRef = useRef(null);
  const [name, setName] = useState("");
  const [checked, setCheckbox] = useState(false);
  const saveSign = () => {
    //@ts-ignore
    signRef?.current?.saveImage();
  };
  const onSaveEvent = (result: SaveEventParams) => {
    const fd = new FormData();
    fd.append("file", {
      // @ts-ignore
      uri: result.pathName,
      type: "image/png",
      name: "Sample.png"
    });
    fd.append("document_format", "JPEG");
    fd.append("document_type", "POD");
    fd.append("document_id", name);
    props.upload({
      file: fd,
      id: tripId || 1
    });
    alert("Signature Captured Successfully");
  };
  return (
    <Page>
      <PageContent>
        <Flex m={20} p={16} backgroundColor={"white"} height={"80%"}>
          <TextWrapper label="Receiver's name">
            <Input value={name} onChangeText={text => setName(text)} />
          </TextWrapper>
          <TextWrapper label="Signature" />
          <View style={styles.body}>
            <SignatureCapture
              ref={signRef}
              style={{ flex: 1 }}
              onSaveEvent={onSaveEvent}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"}
            />
          </View>
        </Flex>
        <StickyBottom>
          <FlexRow>
            <FlexColumn flex={0.2}>
              <CheckBox
                value={checked}
                onValueChange={() => setCheckbox(!checked)}
              />
            </FlexColumn>
            <FlexColumn flex={1.8}>
              <Text>
                <TranslationText id="proof.of.delivery.tnc.received"></TranslationText>
              </Text>
            </FlexColumn>
          </FlexRow>
          <FlexRow>
            <StyledButton
              disabled={!checked}
              height="50px"
              width="100%"
              title="Submit"
              onPress={saveSign}
            />
          </FlexRow>
        </StickyBottom>
      </PageContent>
    </Page>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eff0f2"
  }
});

export default connector(ProofOfDelivery);
