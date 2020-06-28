import React, { useRef, useCallback } from "react";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { Icon } from "../@styled/BaseElements";
import trackTruck from "../../icons/truck-black.png";

import MapStyle from "./MapStyle";
import {
  RouteLatLong,
  CurrentLocation,
  CompletedHop
} from "./TripTracking.model";

const LATITUDE = 28.364063;
const LONGITUDE = 78.6677428;
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0902;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export interface MapProps {
  source: string | RouteLatLong;
  destination: string | RouteLatLong;
  hops: CompletedHop[];
  currentLocation: CurrentLocation;
}

const Map: React.FC<MapProps> = ({
  source,
  destination,
  hops,
  currentLocation
}) => {
  const IndiaLatlongs = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  };

  const mapView = useRef<MapView>({});

  // const fitToScreen = useCallback(() => {
  //   mapRef.current.fitToCoordinates(routeCoordinates);
  // }, [mapRef.current]);

  const { latitude, longitude, latitudeDelta, longitudeDelta } = IndiaLatlongs;

  return (
    <View style={styles.container}>
      <MapView
        ref={ref => {
          //@ts-ignore
          mapView.current = ref;
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
        mapType="standard"
        zoomEnabled={false}
        pitchEnabled={false}
        showsUserLocation={false}
        followsUserLocation={false}
        showsTraffic={false}
        showsMyLocationButton
        showsIndoors
        customMapStyle={MapStyle}
        showsPointsOfInterest
        //onLayout={fitToScreen}
      >
        {currentLocation && (
          <Marker coordinate={currentLocation} title="Current Truck Location">
            <Icon source={trackTruck} />
          </Marker>
        )}
        {/* {hops.map((route) => (
          <Marker
            key={route.name}
            anchor={{ x: 0, y: 0 }}
            title={route.name || "NA"}
            coordinate={route}
          >
            <Text>{route.name}</Text>
          </Marker>
        ))} */}
        <MapViewDirections
          origin={source}
          destination={destination}
          apikey="AIzaSyBtjKCqEzWbUt9yazSchzJ9G9TjZEp_igE"
          strokeWidth={3}
          optimizeWaypoints
          onStart={params =>
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`
            )
          }
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);

            mapView.current.fitToCoordinates(result.coordinates, {
              edgePadding: {
                right: screen.width / 20,
                bottom: screen.height / 20,
                left: screen.width / 20,
                top: screen.height / 20
              }
            });
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: "white" },
  map: { width: "100%", height: "100%" }
});
export default Map;
