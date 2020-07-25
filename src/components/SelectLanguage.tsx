import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  ALL_LANGUAGES,
  I18nContext,
  TranslationText
} from "./InternationalisationProvider";
import actions from "../actions/ActionCreators";
import { connect, ConnectedProps } from "react-redux";
import { Page } from "./@styled/Page";
import { PrimaryHeaderText } from "./@styled/Text";
import { Flex, Text, FlexRow } from "./@styled/BaseElements";
import StyledButton from "../components/@styled/StyledButton";

import Tick from "../images/tick.svg";
import colors from "../theme/colors";

const { setUserLanguage } = actions;
const connector = connect(null, { setUserLanguage });
const SelectLanguage: React.FC<ConnectedProps<typeof connector>> = ({
  setUserLanguage
}) => {
  const { lang, changeLanguage } = useContext(I18nContext);
  return (
    <Page>
      <Flex flex={1}>
        <Text color={colors.primary} m={10} fontSize={28} fontWeight={500}>
          <TranslationText id="choose.language" />
        </Text>
        {ALL_LANGUAGES.map((l, i) => {
          const highlight = l.key === lang;
          return (
            <TouchableOpacity
              onPress={() => changeLanguage(l.key)}
              key={l.key + i}
            >
              <FlexRow
                p={16}
                bg={highlight ? colors.new_blues[3] : colors.white}
                marginLeft={10}
                marginRight={10}
                mt={8}
                justifyContent="space-between"
              >
                <PrimaryHeaderText color={colors.white}>
                  {l.value}
                </PrimaryHeaderText>
                {highlight && (
                  <View style={{ zIndex: 30 }}>
                    <Tick />
                  </View>
                )}
              </FlexRow>
            </TouchableOpacity>
          );
        })}
        <Flex flex={1} />
        <Flex style={{ justifyContent: "flex-end" }}>
          <Flex style={{ paddingBottom: 10 }} mx={6}>
            <StyledButton
              title={<TranslationText id="continue" />}
              onPress={async () => {
                setUserLanguage({ language: lang });
              }}
              style={{
                textAlign: "center",
                color: `${colors.white}`,
                textTransform: "uppercase",
                fontSize: 16
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Page>
  );
};

export default connector(SelectLanguage);
