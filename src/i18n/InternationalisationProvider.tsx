import React, { useContext, useState } from "react";
import { View, Text } from "react-native";
type Language = "en" | "hindi";

import * as EnglishStrings from "./en.json";
import * as HindiStrings from "./hindi.json";

const createI18nContext = (lang: Language = "hindi") => {
  const translations: Record<Language, Record<string, string>> = {
    en: EnglishStrings,
    hindi: HindiStrings
  };

  const t = (id: string) => {
    return translations[lang][id];
  };
  return {
    lang,
    t
  };
};
interface InternationalisationProvider {
  lang: Language;
  t: (id: string) => string;
}

export const I18nContext = React.createContext<InternationalisationProvider>(
  createI18nContext()
);

export const i18n = I18nContext;
export const InternationalisationProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState(createI18nContext());
  return <I18nContext.Provider value={lang}>{children}</I18nContext.Provider>;
};

const SampleComponent = () => {
  const { t } = useContext(i18n);

  return (
    <View>
      <Text>{t("a")}</Text>
    </View>
  );
};
