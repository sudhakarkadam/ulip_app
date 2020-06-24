import React, { useState, useRef, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Text } from "react-native";
//@ts-ignore
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
const LATITUDE = 28.364063;
const LONGITUDE = 797.225969;
const screen = Dimensions.get("window");
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0902;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapTest = () => {
  const [latLongs, setLatLongs] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });
  const mapRef = useRef({});

  useEffect(() => {
    try {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000
      })
        .then(() => {
          navigator.geolocation.getCurrentPosition(
            position => {
              const { latitude, longitude } = position.coords;
              setLatLongs(oldState => ({
                ...oldState,
                latitude: latitude,
                longitude: longitude
              }));
            },
            error => {
              console.log(error);
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 10000
            }
          );
        })
        .catch(() => {});
    } catch (err) {
      //Do something
    }
  }, []);

  const handleRegionChange = (region: any) => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    setLatLongs({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    });
  };

  const { latitude, longitude, latitudeDelta, longitudeDelta } = latLongs;

  return (
    <View style={styles.container}>
      <MapView
        ref={ref => {
          //@ts-ignore
          mapRef.current = ref;
        }}
        provider={PROVIDER_GOOGLE}
        onRegionChangeComplete={handleRegionChange}
        style={styles.map}
        region={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta
        }}
        mapType="standard"
        zoomEnabled={false}
        pitchEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        showsCompass={true}
        showsTraffic={true}
        showsMyLocationButton={true}
        showsIndoors={true}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
            latitudeDelta: latitudeDelta as any,
            longitudeDelta: longitudeDelta as any
          }}
        />
      </MapView>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text>Lat: {latitude}</Text>
        </View>
        <View>
          <Text>Long: {longitude}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: "white" },
  map: { width: "100%", height: "100%" }
});
export default MapTest;
