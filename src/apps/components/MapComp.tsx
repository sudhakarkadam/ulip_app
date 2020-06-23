import React, { Component } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, StyleSheet, Dimensions, Text } from "react-native";
// import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
const LATITUDE = 28.364063;
const LONGITUDE = 797.225969;
const screen = Dimensions.get("window");

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
class MapTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.mapRef = null;
  }

  //   componentWillMount = async () => {
  //     try {
  //       RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
  //         .then((data) => {
  //           navigator.geolocation.getCurrentPosition(
  //             (position) => {
  //               const { latitude, longitude } = position.coords;
  //               this.setState({
  //                 latitude: latitude,
  //                 longitude: longitude
  //               });
  //             },
  //             (error) => {
  //               console.log(error);
  //             },
  //             {
  //               enableHighAccuracy: true,
  //               timeout: 20000,
  //               maximumAge: 10000
  //             }
  //           );
  //         })
  //         .catch((err) => {});
  //     } catch (err) {
  //       console.warn('requestAndroidLocationPermission', err);
  //     }
  //   };

  handleRegionChange = region => {
    const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
    this.setState({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.mapRef = ref;
          }}
          provider={PROVIDER_GOOGLE}
          onRegionChangeComplete={this.handleRegionChange}
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta
          }}
          mapType="standard"
          zoomEnabled={true}
          pitchEnabled={true}
          showsUserLocation
          followsUserLocation={true}
          showsCompass={true}
          showsBuildings={true}
          showsTraffic={true}
          showsMyLocationButton
          showsIndoors={true}
        >
          <Marker
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: this.state.latitudeDelta,
              longitudeDelta: this.state.longitudeDelta
            }}
          />
        </MapView>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            width: "100%",
            flexGrow: 1,
            margin: 10
          }}
        >
          <View style={{ width: "50%" }}>
            <Text>Latitude: {this.state.latitude}</Text>
          </View>

          <Text>Longitude: {this.state.longitude}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingBottom: 10
  },
  container: { ...StyleSheet.absoluteFillObject, backgroundColor: "white" },
  map: { width: "100%", height: "70%" }
});
export default MapTest;
