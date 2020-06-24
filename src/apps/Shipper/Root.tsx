import React from "react";
import { Component } from "react";
import MapComp from "../components/MapComp";
import { StyleSheet, View } from "react-native";

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
