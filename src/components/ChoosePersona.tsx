import React from "react";
import { Flex, Box } from "./@styled/BaseElements";
import Logo from "../images/group.svg";
import { PrimaryLabel, SecondaryText } from "./@styled/Text";
import colors from "../theme/colors";
import { personaMapping } from "../components/AccountsPage";
import AccountsProfileCard from "./AccountsProfileCard";

interface OwnProps {
  selectedUser: (user: string) => void;
}

const ChoosePersona = (props: OwnProps) => {
  return (
    <Flex flex={1} px={6} bg={colors.white} justifyContent={"space-between"}>
      <Box mt={80}>
        <Logo width={300} height={66} />
      </Box>
      <Box my={7} mt={60} justifyContent="center">
        <PrimaryLabel mb={2}>Tell us about yourself...</PrimaryLabel>
        <SecondaryText>
          This helps us to personalize your experience
        </SecondaryText>
      </Box>
      <Flex flex={1} my={4}>
        {Object.keys(personaMapping).map(persona => {
          return (
            <AccountsProfileCard
              onPress={() => props.selectedUser(persona)}
              isBigCard
              key={persona}
              text={personaMapping[persona].text}
              icon={personaMapping[persona].icon}
            />
          );
        })}
      </Flex>
    </Flex>
  );
};

export default ChoosePersona;
