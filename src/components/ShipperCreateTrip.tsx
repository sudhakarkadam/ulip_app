import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../actions/ActionCreators";
import { CommonState } from "../reducers";
import CreateTrip from "./CreateTrip";
import { HomeStackParamList } from "./HomeStack";

const { createTrip, getLspList } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  lspList: state.lspList.data
});
const mapDispatchToProps = { createTrip, getLspList };
const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip"> &
  ConnectedProps<typeof connector>;

const ShipperCreateTrip = (props: CreateTripProps) => {
  useEffect(() => {
    props.getLspList({ type: "LSP" });
  }, []);
  const { userInfo } = props;
  const businessId = userInfo?.business_details?.business_id;
  return (
    <CreateTrip
      lspList={props.lspList?.lsp_list || [{ lsp_id: 5, lsp_name: "Dummy" }]}
      createTripCallback={async data => {
        //@ts-ignore
        await props.createTrip({ business_id: businessId, ...data });
        props.navigation.navigate("MainTripListing");
        ToastAndroid.show("Trip Successfully Created", ToastAndroid.SHORT);
        return;
      }}
    />
  );
};

export default connector(ShipperCreateTrip);
