import React, { useContext } from "react";
import { View } from "react-native";
import AccountsProfileCard from "./AccountsProfileCard";
import { ALL_LANGUAGES, I18nContext } from "./InternationalisationProvider";

export const SelectLanguage: React.FC = () => {
  const { lang, changeLanguage } = useContext(I18nContext);
  return (
    <View>
      {ALL_LANGUAGES.map(l => {
        return <View>{l.value}</View>;
      })}
    </View>
  );
};
