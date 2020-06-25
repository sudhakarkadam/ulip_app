import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
// import MapComp from "../../components/MapComp";
import Login from "../../components/LoginComponent";

import { ThemeProvider } from "styled-components/native";
import theme from "../../theme";
// import { Flex, Box } from "../../components/@styled/BaseElements";
interface Props {
  test: string;
}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {/* <Flex> */}
          <Login />
          {/* <Box flexDirection="row" height={"30%"} width={"100%"}>
              <MapComp />
            </Box> */}
          {/* </Flex> */}
        </ThemeProvider>
      </Provider>
    );
  }
}
