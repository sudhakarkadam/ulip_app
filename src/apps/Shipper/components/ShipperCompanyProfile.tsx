import React from "react";
import CompanyProfile from "../../../components/CompanyProfile";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./AuthenticatedFlow";
import { connect, ConnectedProps } from "react-redux";
import ShipperActionCreators from "../actions/ShipperActionCreators";
import { ShipperAppState } from "../reducers";

type Props = StackScreenProps<RootStackParamList, "CompanyProfile"> &
  ConnectedProps<typeof connector>;

const { saveCompanyProfile } = ShipperActionCreators;
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
          await props.saveCompanyProfile({});
          props.navigation.navigate("ShipperHome");
        } catch {
          console.log("error");
        }
      }}
    />
  );
};

export default connector(ShipperCompanyProfile);
