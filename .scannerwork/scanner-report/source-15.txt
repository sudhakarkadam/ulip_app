/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const prompts = require('prompts');
const path = require('path');
const exec = require('child_process').exec;
const fs = require('fs');
const fse = require('fs-extra');

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'appName',
      message: "What's the name of your app?",
      validate: value => {
        if (value.trim()) return true;
        return 'Please enter a valid app name.';
      },
    },
    {
      type: 'text',
      name: 'message',
      message: 'Describe the changes for codepush.',
      validate: value => {
        if (value.trim()) return true;
        return 'Please enter a valid description.';
      },
    },
  ]);

  const CONFIG_PATH = path.resolve(__dirname, '..', 'configs');

  const exists = await fse.pathExists(
    `${CONFIG_PATH}/${response.appName}.json`,
  );

  let appContext;

  try {
    appContext = fs.readFileSync('app-context.txt', 'utf8').toString();
  } catch (e) {
    console.error(
      'No app context found. Please run : yarn run bootstrap -- --appName=YOUR_APP_NAME',
    );
    process.exit(1);
  }

  if (appContext !== response.appName) {
    console.error(
      `App context is ${appContext}. You are doing Codepush for ${response.appName}`,
    );
    console.error(
      `Please run : yarn run bootstrap -- --appName=${response.appName}`,
    );
    process.exit(1);
  }

  if (!exists) {
    console.error("App doesn't Exist!");
    process.exit(1);
  }

  fs.readFile(`${CONFIG_PATH}/${response.appName}.json`, (err, data) => {
    if (err) throw err;
    let config = JSON.parse(data);
    if (!config.codepushAppName) {
      console.error("App isn't codepush enabled!");
      process.exit(1);
    }
    const codepush = `code-push release-react EKART-CITY-LOGISTICS/${config.codepushAppName} android -m --description "${response.message}" --entryFile ./src/apps/${config.appName}/index.js --targetBinaryVersion ${config.versionName}`;
    exec(codepush, (e, o, r) => {
      if (!e) 'Code push done.';
      else console.error(e);
    });
  });
})();
