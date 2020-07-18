import React from "react";
import { Flex, Box, Text } from "./@styled/BaseElements";
import Logo from "../images/group.svg";
import { PrimaryLabel } from "./@styled/Text";
import colors from "../theme/colors";
import { personaMapping } from "../components/AccountsPage";
import AccountsProfileCard from "./AccountsProfileCard";

interface OwnProps {
  selectedUser: (user: string) => void;
}

const ChoosePersona = (props: OwnProps) => {
  return (
    <Flex flex={1}>
      <Box position="absolute" mx={6} mt={80}>
        <Logo width={300} height={66} />
      </Box>
      <Flex mx={6} flex={1} justifyContent="center">
        <Flex>
          <PrimaryLabel>Tell us about yourself...</PrimaryLabel>
          <Text style={{ color: colors.primary }}>
            This helps us to personalize your experience
          </Text>
        </Flex>
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
