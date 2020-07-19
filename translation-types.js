const base = require("./i18n/en.json");
const fs = require("fs");
const path = require("path");

const types = [];
const allKeys = Object.keys(base);

types.push(`export type Keys = ${allKeys.map(k => `'${k}'`).join(" | ")};`);

types.push(`export type GetTranslationTextType<T> = `);
Object.keys(base).map(key => {
  const message = base[key];
  const occurrences = message.match(/{{[a-z]+}}/g);
  const count = occurrences ? occurrences.length : 0;
  if (count === 0) {
    types.push(`T extends "${key}" ? (id: Keys) => string :`);
  } else {
    // remove {{ }}
    const varNames = occurrences
      .map(v => v.slice(2, -2))
      .map(n => `${n}: string`)
      .join(",");

    types.push(`T extends "${key}" ? (id: Keys, ${varNames}) => string :`);
  }
});
types.push(`never;`);

const srcPath = path.resolve(
  __dirname,
  "src",
  "components",
  "InternationalisationProvider.tsx"
);

let contents = fs.readFileSync(srcPath).toString();
let removeLine = false;
contents = contents.split("\n").filter(line => {
  if (removeLine && !line.includes("auto-generated-defs-end")) return false;
  if (line.includes("auto-generated-defs-end")) {
    removeLine = false;
    return true;
  }
  if (line.includes("auto-generated-defs-start")) {
    removeLine = true;
    return true;
  }
  if (!removeLine) return true;
});
// console.log(contents);
const insertIndex = contents.findIndex(s =>
  s.includes("auto-generated-defs-start")
);
contents.splice(insertIndex + 1, 0, "// replace this");
console.log(types, contents);
const src = contents.join("\n").replace("// replace this", types.join("\n"));
fs.writeFileSync(srcPath, src);
