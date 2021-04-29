import React, { useEffect, useContext } from "react";
import { Flex, ScrollView } from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import withModal, {
  IWithModalInjectedProps
} from "../../../components/@styled/Modal";
import TripDetails from "../../../components/TripDetails";
import AcceptTripModal from "./AcceptTripModal";
import RejectTripModal from "./RejectTripModal";
import { CommonState } from "../../../reducers";
import { connect, ConnectedProps } from "react-redux";
import CommonActionCreators from "../../../actions/ActionCreators";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Page, PageContent } from "../../../components/@styled/Page";
import { LSPAuthenticatedStackParamList } from "./LSPLanding";
import { HomeStackParamList } from "./LSPHomeStack";
import { I18nContext } from "../../../components/InternationalisationProvider";

const { getVehiclesList, acceptTrip, rejectTrip } = CommonActionCreators;

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "TripAcceptPage">,
  StackNavigationProp<LSPAuthenticatedStackParamList>
>;

type TripAcceptRouteProps = RouteProp<HomeStackParamList, "TripAcceptPage">;

interface OwnProps {
  navigation: NavigationProps;
  route: TripAcceptRouteProps;
}

const mapStateToProps = (state: CommonState) => ({
  userInfo: state.user.data,
  vehiclesList: state.vehiclesList.data,
  commonConfig: state.appConfig.data
});
const mapDispatchToProps = { getVehiclesList, acceptTrip, rejectTrip };
const connector = connect(mapStateToProps, mapDispatchToProps);

const TripAcceptPage = (
  props: OwnProps & IWithModalInjectedProps & ConnectedProps<typeof connector>
) => {
  const trip = props.route.params.tripDetails;
  if (!trip) return null;

  useEffect(() => {
    const userPersonaDetails = props.userInfo.user_details.find(
      role => role.profile.persona === "LSP"
    );

    props.getVehiclesList(
      userPersonaDetails?.business_details?.business_id || ""
    );
  }, []);

  const returnToList = () => props.navigation.navigate("TripRequests", {});
  const { translate } = useContext(I18nContext);

  return (
    <Page>
      <PageContent>
        <ScrollView mt={3} backgroundColor="white" flex={1}>
          <TripDetails
            id={trip.tsr_id.toString()}
            pickupDate={new Date(trip.pickup_request_time)}
            truckType={trip.truck_type_preference}
            truckWeight={trip.weight.toString()}
            truckUnit={trip.weight_unit}
            places={[
              trip.source_location_details,
              trip.destination_location_details
            ]}
            goodsSegment={trip.goods_segment}
            documents={trip.trip_details?.documents || []}
          />
          <Flex style={{ flexDirection: "row", marginHorizontal: 25 }}>
            <StyledButton
              title={translate("reject")}
              variant="outline"
              style={{ flex: 1 }}
              onPress={() => {
                props.showModal(
                  <RejectTripModal
                    onReject={props.rejectTrip}
                    onClose={props.hideModal}
                    returningScreen={returnToList}
                    id={trip.tsr_id}
                    rejectReasons={props.commonConfig?.reject_reasons || []}
                  />
                );
              }}
            />
            <StyledButton
              title={translate("accept")}
              style={{ flex: 1 }}
              onPress={() => {
                props.showModal(
                  <AcceptTripModal
                    onAccept={props.acceptTrip}
                    onClose={props.hideModal}
                    returningScreen={returnToList}
                    id={trip.tsr_id}
                    vehiclesList={props.vehiclesList?.vehicles || []}
                  />
                );
              }}
            />
          </Flex>
        </ScrollView>
      </PageContent>
    </Page>
  );
};

export default connector(withModal(TripAcceptPage));
