import React, { useContext, useState } from "react";
import { Text } from "react-native";
import { GetTranslationTextType, Keys } from "src/typings/translation";
import * as EnglishStrings from "../../i18n/en.json";
import * as HindiStrings from "../../i18n/hindi.json";
import * as TamilStrings from "../../i18n/tamil.json";

export type Languages = "en" | "hindi" | "tamil";
export const ALL_LANGUAGES: { key: Languages; value: string }[] = [
  { key: "en", value: "English" },
  { key: "hindi", value: "Hindi" },
  { key: "tamil", value: "Tamil" }
];
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
        changeLanguage: (lang: Languages) => setLang(createI18nContext(lang))
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

function createI18nContext(lang: Languages = "en") {
  const translations: Record<Languages, Record<Keys, string>> = {
    en: EnglishStrings,
    //@ts-ignore
    hindi: HindiStrings,
    //@ts-ignore
    tamil: TamilStrings
  };

  function translate<T extends Keys>(
    id: T
  ): GetTranslationTextType<T> extends never
    ? string
    : (attrs: GetTranslationTextType<T>) => string {
    let message: string = translations[lang][id];
    const interpolations = message && message.match(/{{[a-z]+}}/g);
    if (interpolations) {
      // @ts-ignore
      return (attrs: GetTranslationTextType<T>) => {
        interpolations.forEach(interpolation => {
          const varName = interpolation.slice(2, -2);
          // @ts-ignore
          message = message.replace(interpolation, attrs[varName]);
        });
        return message;
      };
    }
    // @ts-ignore
    return message;
  }

  function __t(id: Keys, keys: Record<string, string>) {
    let message = translations[lang][id];
    const interpolations = message && message.match(/{{[a-z]+}}/g);
    if (interpolations) {
      interpolations.forEach(interpolation => {
        const varName = interpolation.slice(2, -2);

        message = message.replace(interpolation, keys[varName]);
      });
    }
    return message;
  }
  return {
    lang,
    translate,
    __t: __t,
    changeLanguage: (_: Languages) => {}
  };
}
interface Props<T extends Keys> {
  id: T;
}

export function TranslationText<T extends Keys>({
  id,
  interpolations
}: GetTranslationTextType<T> extends never
  ? Props<T> & { interpolations?: never }
  : Props<T> & { interpolations: GetTranslationTextType<T> }) {
  const { __t: t } = useContext(I18nContext);
  if (interpolations) {
    return <Text>{t(id, interpolations)}</Text>;
  }
  return <Text>{t(id, {})}</Text>;
}
