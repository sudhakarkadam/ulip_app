// this file is auto generated
// please don't edit manually
export type AllTranslationKeys = "hi" | "mobile" | "bye";
export type GetTranslationTextType<T> = T extends "hi"
  ? (id: AllTranslationKeys) => string
  : T extends "mobile"
  ? (id: AllTranslationKeys) => string
  : T extends "bye"
  ? (id: AllTranslationKeys, name: string) => string
  : never;
