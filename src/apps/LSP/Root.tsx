import React from "react";
import { Component } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Text } from "../../components/@styled/BaseElements";

import Header from "../components/Header";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload. Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload. Shake or press menu button for dev menu"
});

export default class App extends Component {
  render() {
    return (
      <>
        <Header title="HOME" />
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome, I am LSP app!</Text>
          <Text style={styles.instructions}>To get started, edit App.js</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </>
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
