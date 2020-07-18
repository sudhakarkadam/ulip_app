import React, { useState } from "react";

type Language = "en" | "hindi";

import * as EnglishStrings from "./en.json";
import * as HindiStrings from "./hindi.json";

type Keys = keyof typeof EnglishStrings;
type T = (id: Keys) => string;
const createI18nContext = (lang: Language = "hindi") => {
  const translations: Record<Language, typeof EnglishStrings> = {
    en: EnglishStrings,
    hindi: HindiStrings
  };

  const t: T = (id: Keys) => {
    return translations[lang][id];
  };
  return {
    lang,
    t,
    changeLanguage: (_: Language) => ""
  };
};
interface InternationalisationProvider {
  lang: Language;
  t: T;
  changeLanguage: (lang: Language) => void;
}

export const I18nContext = React.createContext<InternationalisationProvider>(
  createI18nContext()
);

export const i18n = I18nContext;
export const InternationalisationProvider: React.FC = ({ children }) => {
  const [lang, setLang] = useState(createI18nContext());

  return (
    <I18nContext.Provider
      value={{
        ...lang,
        changeLanguage: (lang: Language) => setLang(createI18nContext(lang))
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};
