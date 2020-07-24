import React, { useContext } from "react";
import { View } from "react-native";
import { PrimaryText } from "./@styled/Text";
import AccountsProfileCard from "./AccountsProfileCard";
import { ALL_LANGUAGES, I18nContext } from "./InternationalisationProvider";

export const SelectLanguage: React.FC = () => {
  const { lang, changeLanguage } = useContext(I18nContext);
  return (
    <View>
      {ALL_LANGUAGES.map(l => {
        return (
          <AccountsProfileCard
            text={l.value}
            isBigCard={true}
          ></AccountsProfileCard>
        );
      })}
    </View>
  );
};
