import React, { useEffect } from "react";
import { Flex, ScrollView } from "../../../components/@styled/BaseElements";
import StyledButton from "../../../components/@styled/StyledButton/StyledButton";
import withModal, {
  IWithModalInjectedProps
} from "../../../components/@styled/Modal";
import TripDetails from "../../../components/TripDetails";
import AcceptTripModal from "./AcceptTripModal";
import RejectTripModal from "./RejectTripModal";
import { LSPAppState } from "../reducers";
import { CommonState } from "../../../reducers";
import { connect, ConnectedProps } from "react-redux";
import LSPActionCreators from "../actions/LSPActionCreators";
import CommonActionCreators from "../../../actions/ActionCreators";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Page, PageContent } from "../../../components/@styled/Page";
import { LSPAuthenticatedStackParamList } from "./LSPLanding";
import { HomeStackParamList } from "./LSPHomeStack";
const { acceptTrip, rejectTrip } = LSPActionCreators;
const { getVehiclesList } = CommonActionCreators;

type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, "TripAcceptPage">,
  StackNavigationProp<LSPAuthenticatedStackParamList>
>;

type TripAcceptRouteProps = RouteProp<HomeStackParamList, "TripAcceptPage">;

interface OwnProps {
  navigation: NavigationProps;
  route: TripAcceptRouteProps;
}

const mapStateToProps = (state: LSPAppState & CommonState) => ({
  acceptedTripStatus: state.acceptedTripStatus,
  userInfo: state.user.data,
  rejectedTripStatus: state.rejectedTripStatus,
  vehiclesList: state.vehiclesList.data
});
const mapDispatchToProps = { acceptTrip, rejectTrip, getVehiclesList };
const connector = connect(mapStateToProps, mapDispatchToProps);

const TripAcceptPage = (
  props: OwnProps & IWithModalInjectedProps & ConnectedProps<typeof connector>
) => {
  const trip = props.route.params?.tripDetails;
  if (!trip) return null;
  const places = [
    {
      name: trip.source_location_details.city,
      state: trip.source_location_details.state,
      address: trip.source_location_details.address
    },
    {
      name: trip.destination_location_details.city,
      state: trip.destination_location_details.state,
      address: trip.destination_location_details.address
    }
  ];
  useEffect(() => {
    const userPersonaDetails = props.userInfo.user_details.find(
      role => role.profile.persona === "LSP"
    );
    if (!props.vehiclesList) {
      props.getVehiclesList(
        userPersonaDetails?.business_details?.business_id || ""
      );
    }
  }, []);
  const returnToList = () => props.navigation.navigate("TripRequests", {});
  // const openTruckSelect = () => props.navigation.push("TruckSelect");
  return (
    <Page>
      <PageContent>
        <ScrollView mt={3} backgroundColor="white" flex={1}>
          <TripDetails
            id={trip.tsr_id.toString()}
            pickupDate={new Date(trip.pickup_date)}
            truckType={trip.truck_type_preference}
            truckWeight={trip.weight.toString()}
            truckUnit={trip.weight_unit}
            lspProvider={trip.legal_name}
            places={places}
            documents={trip.trip_details?.documents}
          />
          <Flex style={{ flexDirection: "row", marginHorizontal: 25 }}>
            <StyledButton
              title="Reject"
              variant="outline"
              style={{ flex: 1 }}
              onPress={() => {
                props.showModal(
                  <RejectTripModal
                    onReject={props.rejectTrip}
                    onClose={props.hideModal}
                    returningScreen={returnToList}
                    id={trip.tsr_id}
                  />
                );
              }}
            />
            <StyledButton
              title="Accept"
              style={{ flex: 1 }}
              onPress={() => {
                //return openTruckSelect();
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
