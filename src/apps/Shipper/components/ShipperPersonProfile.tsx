import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import { ToastAndroid } from "react-native";
import PersonProfile from "../../../components/PersonProfile";
import ActionCreators from "../../../actions/ActionCreators";
import { CommonState } from "../../../reducers";
import { HomeStackParamList } from "./HomeStack";

type Props = StackScreenProps<HomeStackParamList, "PersonProfile"> &
  ConnectedProps<typeof connector>;

const { savePersonalProfile } = ActionCreators;
const mapStateToProps = (state: CommonState) => {
  return {
    userInfo: state.user.data
  };
};
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

const ShipperPersonProfile = (props: Props) => {
  const { userInfo } = props;
  const phone = userInfo.phone_number || "";
  const loginId = userInfo.login_id || "";
  return (
    <PersonProfile
      userInfo={props.userInfo}
      createProfileCallback={async ({ name }) => {
        try {
          await props.savePersonalProfile({
            name,
            phone,
            loginId,
            persona: userInfo.userPersona || ""
          });
          props.navigation.navigate("CreateProfile");
          ToastAndroid.show("Profile Created successfully", ToastAndroid.SHORT);
        } catch {
          ToastAndroid.show("Error while creating profile", ToastAndroid.SHORT);
        }
      }}
    />
  );
};

export default connector(ShipperPersonProfile);
