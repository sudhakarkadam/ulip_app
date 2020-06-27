import React from "react";
import PersonProfile from "../../../components/PersonProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";
import { HomeStackParamList } from "./HomeStack";

type Props = StackScreenProps<HomeStackParamList, "PersonProfile"> &
  ConnectedProps<typeof connector>;

const { savePersonalProfile } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => {
  return {
    userInfo: state.user.data
  };
};
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ShipperPersonProfile = (props: Props) => {
  return (
    <PersonProfile
      userInfo={props.userInfo}
      createProfileCallback={async () => {
        try {
          await props.savePersonalProfile({});
          props.navigation.navigate("CreateProfile");
        } catch {
          console.log("error");
        }
      }}
    />
  );
};

export default connector(ShipperPersonProfile);
