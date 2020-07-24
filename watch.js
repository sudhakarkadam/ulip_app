var watch = require("node-watch");
const fs = require("fs");
const execFile = require("child_process").execFile;
const spawn = require("child_process").spawn;
const path = require("path");
watch("./i18n/en.json", { recursive: false }, () => {
  execFile("node", [path.resolve(__dirname, "translation-types.js")]);

  spawn("./node_modules/.bin/prettier --write 'src/typings/translation.ts'", {
    shell: true
  });
});
