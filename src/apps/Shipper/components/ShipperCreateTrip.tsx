import React, { useEffect } from "react";
import { ToastAndroid } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { CommonState } from "../../../reducers";
import CreateTrip from "../../../components/CreateTrip";
import { HomeStackParamList } from "./HomeStack";
import { Text } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";

const { createTrip, getLspList } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  lspList: state.lspList.data,
  commonConfig: state.appConfig.data
});
const mapDispatchToProps = { createTrip, getLspList };
const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip"> &
  ConnectedProps<typeof connector>;

const ShipperCreateTrip = (props: CreateTripProps) => {
  useEffect(() => {
    props.getLspList({ type: "LSP" });
  }, []);
  const lspList = props.lspList?.lsp_list;
  const goodTypesList = props.commonConfig?.good_types.map(type=>({label:type,value:type}));
  const weightTypesList = props.commonConfig?.weight_types.map(type=>({label:type,value:type}));
  const truckTypesList = props.commonConfig?.truck_types.map(type=>({label:type,value:type}));
  return (
    Array.isArray(lspList) && lspList.length && goodTypesList && weightTypesList && truckTypesList? 
    <CreateTrip
      goodsList={goodTypesList}
      weightTypeList={weightTypesList}
      truckTypeList={truckTypesList}
      lspList={lspList}
      createTripCallback={async data => {
        //@ts-ignore
        await props.createTrip({ data });
        props.navigation.navigate("MainTripListing");
        ToastAndroid.show("Trip Successfully Created", ToastAndroid.SHORT);
        return;
      }}
    />
    :<Flex1 justifyContent="center" alignItems="center">
      <Text>
        LSP Fetching Failed
      </Text>
    </Flex1>
  );
};

export default connector(ShipperCreateTrip);
