import React, { useContext } from "react";
import { Flex, Box } from "./@styled/BaseElements";
import Logo from "../images/group.svg";
import { PrimaryLabel, SecondaryText } from "./@styled/Text";
import colors from "../theme/colors";
import { personaMapping } from "../components/AccountsPage";
import AccountsProfileCard from "./AccountsProfileCard";
import { TranslationText, I18nContext } from "./InternationalisationProvider";
interface OwnProps {
  selectedUser: (user: string) => void;
}

const ChoosePersona = (props: OwnProps) => {
  const { translate } = useContext(I18nContext);
  return (
    <Flex flex={1} px={6} bg={colors.white} justifyContent={"space-between"}>
      <Box mt={80}>
        <Logo width={300} height={66} />
      </Box>
      <Box my={7} mt={60} justifyContent="center">
        <PrimaryLabel mb={2}>
          <TranslationText id="tell.us.about" />
          ...
        </PrimaryLabel>
        <SecondaryText>
          <TranslationText id="this.helps.to.personalize" />
        </SecondaryText>
      </Box>
      <Flex flex={1} my={4}>
        {Object.keys(personaMapping).map(persona => {
          return (
            <AccountsProfileCard
              onPress={() => props.selectedUser(persona)}
              isBigCard
              key={persona}
              text={translate(personaMapping[persona].text)}
              icon={personaMapping[persona].icon}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ChoosePersona;
