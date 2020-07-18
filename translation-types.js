const base = require("./i18n/en.json");
const fs = require("fs");
const path = require("path");

const types = [
  "// this file is auto generated",
  "// please don't edit manually"
];
const allKeys = Object.keys(base);

types.push(
  `export type AllTranslationKeys = ${allKeys.map(k => `'${k}'`).join(" | ")};`
);

types.push(`export type GetTranslationTextType<T> = `);
Object.keys(base).map(key => {
  const message = base[key];
  const occurrences = message.match(/{{[a-z]+}}/g);
  const count = occurrences ? occurrences.length : 0;
  if (count === 0) {
    types.push(`T extends "${key}" ? (id: AllTranslationKeys) => string :`);
  } else {
    // remove {{ }}
    const varNames = occurrences
      .map(v => v.slice(2, -2))
      .map(n => `${n}: string`)
      .join(",");

    types.push(
      `T extends "${key}" ? (id: AllTranslationKeys, ${varNames}) => string :`
    );
  }
});
types.push(`never;`);

fs.writeFileSync(
  path.resolve(__dirname, "src", "typings", "translation.ts"),
  types.join("\n")
);
