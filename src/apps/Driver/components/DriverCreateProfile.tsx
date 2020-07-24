import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { RootStackParamList } from "./Root";
import { Page, PageContent } from "../../../components/@styled/Page";

const personIcon = require("../../../icons/person-icon.png");

type ScreenProps = StackScreenProps<RootStackParamList, "CreateProfile">;

const DriverCreateProfile = (props: ScreenProps) => {
  return (
    <Page>
      <PageContent>
        <CardComp
          cardHeading="STEP 1"
          taskHeading="Profile set up"
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("PersonProfile")}
        ></CardComp>
      </PageContent>
    </Page>
  );
};

export default DriverCreateProfile;
