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

const location = {
  address: "Sector 4, Rohini",
  city: "Delhi",
  location_code: "loc_1",
  map_ref: "ref",
  name: "Delhi",
  postal_code: "560035",
  state: "Delhi"
};

const ShipperCompanyProfile = (props: Props) => {
  const userId = props.userInfo ? props.userInfo.user_details.user_id : 0;
  return (
    <CompanyProfile
      createCompanyCallback={async ({ name, regNumber }) => {
        try {
          await props.saveCompanyProfile({
            name,
            regNumber,
            role: "SHIPPER",
            location,
            userId
          });
          props.navigation.navigate("MainTripListing");
        } catch {
          console.log("error");
        }
      }}
    />
  );
};

export default connector(ShipperCompanyProfile);
