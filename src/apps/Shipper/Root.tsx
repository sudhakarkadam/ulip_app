import React from "react";
import { Component } from "react";
import MapComp from "../components/MapComp";
import { Platform, StyleSheet, Text, View } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload. Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload. Shake or press menu button for dev menu"
});

interface Props {
  test: string;
}
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <MapComp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
