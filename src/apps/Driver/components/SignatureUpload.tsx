import React, { useState, useRef } from "react";
import { ConnectedProps, connect } from "react-redux";
import { StyleSheet, View, CheckBox } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { DriverHomeStackParamList } from "./AuthenticatedFlow";
import Input from "../../../components/InputComponent";
import {
  Text,
  Flex,
  FlexRow,
  FlexColumn
} from "../../../components/@styled/BaseElements";
import { TextWrapper } from "../../../components/@styled/Text";
import StyledButton from "../../../components/@styled/StyledButton";
import { StickyBottom } from "../../../components/StickyBottom";
import SignatureCapture, {
  SaveEventParams
} from "react-native-signature-capture";
import ActionCreators from "../../../actions/ActionCreators";
import { Page, PageContent } from "../../../components/@styled/Page";
import { TranslationText } from "../../../components/InternationalisationProvider";
import { CommonState } from "../../../reducers";
import { ToastAndroid } from "react-native";

const { upload, specialUpload, getTripById } = ActionCreators;
const mapDispatchToProps = { upload, specialUpload, getTripById };
const mapStateToProps = (state: CommonState) => ({
  trip: state.driverTrip.data
});
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
  navigation: StackNavigationProp<DriverHomeStackParamList, "SignatureUpload">;
} & StackScreenProps<DriverHomeStackParamList, "SignatureUpload">;

const SignatureUpload: React.FC<Props> = props => {
  const tripId = props.trip?.trip_id;
  const signRef = useRef(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [signed, setSignstate] = useState(false);
  const [checked, setCheckbox] = useState(false);
  const saveSign = () => {
    //@ts-ignore
    signRef?.current?.saveImage();
  };
  const SubmitText = !loading ? (
    <Text>{<TranslationText id="submit" />}</Text>
  ) : (
    <Text>{<TranslationText id="loading" />}...</Text>
  );

  const onDragEvent = () => {
    setSignstate(true);
  };

  const onSaveEvent = (result: SaveEventParams) => {
    setLoading(true);
    props
      .specialUpload({
        fileData: result.encoded,
        document_type: "POD",
        document_id: name,
        id: tripId
      })
      .then(res => {
        setLoading(false);
        if (res.type === "SPECIAL_UPLOAD_SUCCESS") {
          props.getTripById(tripId);
          props.navigation.navigate("PODDetailsPage");
        } else {
          ToastAndroid.show(
            "Something went wrong. Please try again.",
            ToastAndroid.SHORT
          );
        }
      })
      .catch(() => {
        setLoading(false);
        ToastAndroid.show(
          "Something went wrong. Please try again.",
          ToastAndroid.SHORT
        );
      });
  };
  return (
    <Page>
      <PageContent>
        <Flex m={20} p={16} backgroundColor={"white"} height={"80%"}>
          <TextWrapper label={<TranslationText id="receivers.name" />}>
            <Input value={name} onChangeText={text => setName(text)} />
          </TextWrapper>
          <Text>
            <TranslationText id="signature"></TranslationText>
          </Text>
          <View style={styles.body}>
            <SignatureCapture
              ref={signRef}
              style={{ flex: 1 }}
              onSaveEvent={onSaveEvent}
              onDragEvent={onDragEvent}
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
              disabled={!(checked && name.length > 0 && signed)}
              height="50px"
              width="100%"
              title={SubmitText}
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

export default connector(SignatureUpload);
