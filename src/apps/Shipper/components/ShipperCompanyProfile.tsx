import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import { ToastAndroid } from "react-native";
import CompanyProfile from "../../../components/CompanyProfile";
import ActionCreators from "../../../actions/ActionCreators";
import { CommonState } from "../../../reducers";
import { HomeStackParamList } from "./HomeStack";

type Props = StackScreenProps<HomeStackParamList, "CompanyProfile"> &
  ConnectedProps<typeof connector>;

const { saveCompanyProfile } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data
});
const mapDispatchToProps = { saveCompanyProfile };
const connector = connect(mapStateToProps, mapDispatchToProps);

const ShipperCompanyProfile = (props: Props) => {
  const userId = props.userInfo.user_details.find(
    role => role.profile.persona === props.userInfo.userPersona
  );
  return (
    <CompanyProfile
      createCompanyCallback={async ({
        name,
        regNumber,
        address,
        city,
        state,
        postalCode,
        lat,
        lng
      }) => {
        try {
          await props.saveCompanyProfile({
            name,
            location: {
              address,
              city,
              country: "India",
              map_ref: {},
              latitude: lat,
              longitude: lng,
              name,
              postal_code: parseInt(postalCode, 10),
              state
            },
            userId: userId ? userId.profile.user_id : "",
            business_type: "SHIPPER",
            gst_in: regNumber
          });
          props.navigation.navigate("MainTripListing");
          ToastAndroid.show("Company profile Created", ToastAndroid.SHORT);
        } catch {
          ToastAndroid.show("Error while creating profile", ToastAndroid.SHORT);
        }
      }}
    />
  );
};

export default connector(ShipperCompanyProfile);
