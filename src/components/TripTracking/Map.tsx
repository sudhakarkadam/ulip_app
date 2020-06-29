import React, { useRef } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { View, StyleSheet, Dimensions, Text } from "react-native";

import { Icon } from "../@styled/BaseElements";
// @ts-ignore
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
  source: RouteLatLong;
  destination: RouteLatLong;
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

  // @ts-ignore
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
        zoomEnabled
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
          <Marker coordinate={currentLocation} title="Truck Current Location">
            <Icon source={trackTruck} style={{ height: 22, width: 22 }} />
          </Marker>
        )}

        {source && (
          <Marker coordinate={source} title={source.name} pinColor="#000" />
        )}

        {destination && (
          <Marker
            coordinate={destination}
            title={destination.name}
            pinColor="#000"
          />
        )}

        {hops.map(route => (
          <Marker
            key={route.name}
            // @ts-ignore
            coordinate={route}
            anchor={{ x: 0, y: 0 }}
          >
            <Text>{route.name}</Text>
          </Marker>
        ))}
        <MapViewDirections
          origin={source}
          destination={destination}
          apikey="AIzaSyD4xiKN6XL_h_bbreIaH5Q-Qcwb7NUrjt8"
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
                bottom: 220,
                left: screen.width / 20,
                top: 240
              }
            });
          }}
          onError={e => console.log(e)}
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
