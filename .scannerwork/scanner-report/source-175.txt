import React, { useContext } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import CardComp from "../../../components/CardComp";
import { RootStackParamList } from "./Root";
import { Page, PageContent } from "../../../components/@styled/Page";
import { I18nContext } from "../../../components/InternationalisationProvider";
const personIcon = require("../../../images/person-icon.png");

type ScreenProps = StackScreenProps<RootStackParamList, "CreateProfile">;

const DriverCreateProfile = (props: ScreenProps) => {
  const { translate } = useContext(I18nContext);
  return (
    <Page>
      <PageContent>
        <CardComp
          cardHeading={translate("step.one")}
          taskHeading={translate("profile.setup")}
          clickLabel={translate("profile.start")}
          imgSrc={personIcon}
          taskClickCallback={() => props.navigation.navigate("PersonProfile")}
        ></CardComp>
      </PageContent>
    </Page>
  );
};

export default DriverCreateProfile;
