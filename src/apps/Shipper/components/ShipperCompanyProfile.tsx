import React from "react";
import CompanyProfile from "../../../components/CompanyProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { ShipperAppState } from "../reducers";
import { HomeStackParamList } from "./HomeStack";

type Props = StackScreenProps<HomeStackParamList, "CompanyProfile"> &
  ConnectedProps<typeof connector>;

const { saveCompanyProfile } = ActionCreators;
const mapStateToProps = (state: ShipperAppState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { saveCompanyProfile };
const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const ShipperCompanyProfile = (props: Props) => {
  return (
    <CompanyProfile
      createCompanyCallback={async () => {
        try {
          //@ts-ignore
          await props.saveCompanyProfile({});
          props.navigation.navigate("MainTripListing");
        } catch {
          console.log("error");
        }
      }}
    />
  );
};

export default connector(ShipperCompanyProfile);
