import React, { useState } from "react";
import * as EnglishStrings from "../../i18n/en.json";
import * as HindiStrings from "../../i18n/hindi.json";

type Language = "en" | "hindi";
type InternationalisationProvider = ReturnType<typeof createI18nContext>;

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

function createI18nContext(lang: Language = "hindi") {
  const translations: Record<Language, typeof EnglishStrings> = {
    en: EnglishStrings,
    hindi: HindiStrings
  };

  // auto-generated-defs-start
  function t(id: "hi"): string;
  function t(id: "mobile"): string;
  function t(id: "bye", name: string): string;
  function t(id: Keys, ...keys: string[]) {
    // auto-generated-defs-end
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
    changeLanguage: (_: Language) => {}
  };
}
