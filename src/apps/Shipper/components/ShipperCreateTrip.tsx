import React, { useEffect } from "react";
import { ToastAndroid, ActivityIndicator } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { connect, ConnectedProps } from "react-redux";
import ActionCreators from "../../../actions/ActionCreators";
import { CommonState } from "../../../reducers";
import CreateTrip from "../../../components/CreateTrip";
import { HomeStackParamList } from "./HomeStack";
import { Text } from "../../../components/@styled/BaseElements";
import { Flex1 } from "../../../components/@styled/Flex";
import { isLoading } from "../../../utils/actionCreator";
import { CreateTripRequestModel } from "src/models/ShipperApiModels";

const { createTrip, getLspList, getBusinessSites } = ActionCreators;
const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  lspList: state.lspList,
  commonConfig: state.appConfig.data,
  businessSites: state.businessSites
});
const mapDispatchToProps = { createTrip, getLspList, getBusinessSites };
const connector = connect(mapStateToProps, mapDispatchToProps);

type CreateTripProps = StackScreenProps<HomeStackParamList, "CreateTrip"> &
  ConnectedProps<typeof connector>;

const ShipperCreateTrip = (props: CreateTripProps) => {
  const userPersonaDetails = props.userInfo.user_details.find(
    role => role.profile.persona === "SHIPPER"
  );
  useEffect(() => {
    props.getLspList({ type: "LSP" });
    const businessID = userPersonaDetails?.business_details?.business_id || "";
    props.getBusinessSites(businessID);
  }, []);
  const lspList = props.lspList?.data?.lsp_list;
  const goodTypesList = props.commonConfig?.good_types.map(type => ({
    label: type,
    value: type
  }));
  const weightTypesList = props.commonConfig?.weight_types.map(type => ({
    label: type,
    value: type
  }));
  const truckTypesList = props.commonConfig?.truck_types.map(type => ({
    label: type,
    value: type
  }));
  const businessSites = props.businessSites?.data?.business_sites || [];
  if (isLoading(props.lspList) || isLoading(props.businessSites)) {
    return (
      <Flex1 justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Flex1>
    );
  }
  return (
    <>
      {Array.isArray(lspList) &&
      lspList.length &&
      goodTypesList?.length &&
      weightTypesList?.length &&
      truckTypesList?.length &&
      userPersonaDetails ? (
        <CreateTrip
          goodsList={goodTypesList}
          weightTypeList={weightTypesList}
          truckTypeList={truckTypesList}
          lspList={lspList}
          userPersonaDetails={userPersonaDetails}
          businessSites={businessSites}
          createTripCallback={async (data: CreateTripRequestModel) => {
            await props.createTrip(data);
            props.navigation.navigate("MainTripListing");
            ToastAndroid.show("Trip Successfully Created", ToastAndroid.SHORT);
            return;
          }}
        />
      ) : (
        <Flex1 justifyContent="center" alignItems="center">
          <Text>No results found</Text>
        </Flex1>
      )}
    </>
  );
};

export default connector(ShipperCreateTrip);
