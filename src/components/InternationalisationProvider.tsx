import React, { useContext, useState } from "react";
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
type Keys = 'hi' | 'mobile' | 'bye';
type GetTranslationTextType<T> =
T extends "hi" ? (id: AllTranslationKeys) => string :
T extends "mobile" ? (id: AllTranslationKeys) => string :
T extends "bye" ? (id: AllTranslationKeys, name: string) => string :
never;
  // auto-generated-defs-end
  function t(id: Keys, ...keys: string[]) {
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

interface Props<T> {
	id: T,
	interpolations:
}
function TranslationText() {
  const { t } = useContext(I18nContext);
}
