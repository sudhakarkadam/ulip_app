import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import MapComp from "../../components/MapComp";
import Login from "./components/Login";

interface Props {
  test: string;
}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Login />
        </View>
        <View style={styles.mapContainer}>
          <MapComp />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: "#F5FCFF"
  },
  mapContainer: {
    width: "100%",
    height: "30%"
  }
});
