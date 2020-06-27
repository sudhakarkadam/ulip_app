import React from "react";
import PersonProfile from "../../../components/PersonProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./AuthenticatedFlow";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";

type Props = StackScreenProps<RootStackParamList, "PersonProfile"> &
  ConnectedProps<typeof connector>;

const { savePersonalProfile } = ShipperActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { savePersonalProfile };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ShipperPersonProfile = (props: Props) => {
  return (
    <PersonProfile
      createProfileCallback={async () => {
        try {
          await props.savePersonalProfile({});
          props.navigation.navigate("CreateTrip");
        } catch {
          console.log("error");
        }
      }}
    />
  );
};

export default connector(ShipperPersonProfile);
