import React, { useState } from "react";
import {
  AllTranslationKeys,
  GetTranslationTextType
} from "src/typings/translation";

type Language = "en" | "hindi";

import * as EnglishStrings from "../../i18n/en.json";
import * as HindiStrings from "../../i18n/hindi.json";

type Keys = keyof typeof EnglishStrings;
type Translation<
  T extends AllTranslationKeys = AllTranslationKeys
> = GetTranslationTextType<T>;
const createI18nContext = (lang: Language = "hindi") => {
  const translations: Record<Language, typeof EnglishStrings> = {
    en: EnglishStrings,
    hindi: HindiStrings
  };

  function t(id: Keys, ...keys) {
    let message = translations[lang][id];
    const interpolations = message && message.match(/{{[a-z]+}}/g);
    if (interpolations) {
      interpolations.forEach((interpolation, index) => {
        message = message.replace(interpolation, keys[index]);
      });
    }
    return message;
  }
  return {
    lang,
    t,
    changeLanguage: (_: Language) => ""
  };
};
interface InternationalisationProvider {
  lang: Language;
  t: Translation;
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
