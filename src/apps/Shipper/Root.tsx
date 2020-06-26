import React, { Component } from "react";
import { Provider } from "react-redux";
import colors from "../../theme/colors";
import store from "./store";
// import MapComp from "../../components/MapComp";
// import Login from "../../components/LoginComponent";
// import CardComp from "../../components/CardComp";
// import CreateProfile from "../../components/CreateProfile";
import CompanyProfile from "../../components/CompanyProfile";

import { ThemeProvider } from "styled-components/native";
import theme from "../../theme";
import { Box } from "../../components/@styled/BaseElements";
interface Props {
  test: string;
}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Box
            height="100%"
            width="100%"
            backgroundColor={`${colors.grays[2]}`}
          >
            {/* <Login /> */}
            {/* <Box flexDirection="row" height={"30%"} width={"100%"}>
                <MapComp />
              </Box> */}
            <CompanyProfile
              createCompanyCallback={() => console.log("profile created")}
            />
            {/* <CardComp/> */}
          </Box>
        </ThemeProvider>
      </Provider>
    );
  }
}
