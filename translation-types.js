const base = require("./i18n/en.json");
const fs = require("fs");
const path = require("path");

const types = [];
const allKeys = Object.keys(base);

types.push(`type Keys = ${allKeys.map(k => `'${k}'`).join(" | ")};`);

Object.keys(base).map(key => {
  const message = base[key];
  const occurrences = message.match(/{{[a-z]+}}/g);
  const count = occurrences ? occurrences.length : 0;
  if (count === 0) {
    types.push(`function t(id: '${key}'): string`);
  } else {
    // remove {{ }}
    const varNames = occurrences
      .map(v => v.slice(2, -2))
      .map(n => `${n}: string`)
      .join(",");

    types.push(`function t(id: '${key}', ${varNames}): string`);
  }
});

const srcPath = path.resolve(
  __dirname,
  "src",
  "components",
  "InternationalisationProvider.tsx"
);
const contents = fs
  .readFileSync(srcPath)
  .toString()
  .replace(
    /\/\/\sauto\-generated\-defs\-start*.auto\-generated\-defs\-end/,
    ""
  );

const src = contents.replace(" // replace this", types.join("\n"));
fs.writeFileSync(srcPath, src);
