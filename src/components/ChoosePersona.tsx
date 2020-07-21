import React from "react";
import { Flex, Box } from "./@styled/BaseElements";
import { PrimaryHeaderText, PrimaryText } from "./@styled/Text";
import colors from "../theme/colors";
import { personaMapping } from "../components/AccountsPage";
import AccountsProfileCard from "./AccountsProfileCard";

interface OwnProps {
  selectedUser: (user: string) => void;
}

const ChoosePersona = (props: OwnProps) => {
  return (
    <Flex flex={1} px={6} bg={colors.bg} justifyContent={"space-between"}>
      <Box my={7} mt={70} justifyContent="center">
        <PrimaryHeaderText mb={3}>Tell us about yourself...</PrimaryHeaderText>
        <PrimaryText>This helps us to personalize your experience</PrimaryText>
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
