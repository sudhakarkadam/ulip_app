const fse = require('fs-extra'); // eslint-disable-line @typescript-eslint/no-var-requires
const path = require('path'); // eslint-disable-line @typescript-eslint/no-var-requires
const exec = require('child_process').exec; // eslint-disable-line @typescript-eslint/no-var-requires

const {
  activity,
  application,
  manifest,
  strings,
  sampleComponent,
  registry,
  sampleConfigJson,
  packageJson,
} = require('./activity-templates'); // eslint-disable-line @typescript-eslint/no-var-requires

const JAVA_SRC_PATH = path.resolve(__dirname, '..', 'android', 'app', 'src');
const RES_PATH = path.resolve(JAVA_SRC_PATH, 'main', 'res');
const JS_SRC_PATH = path.resolve(__dirname, '..', 'src', 'apps');
const CONFIG_PATH = path.resolve(__dirname, '..', 'configs');
const KEYSTORE_PATH = path.resolve(__dirname, '..', 'keystore');
const GRADLE_PROP = path.resolve(
  __dirname,
  '..',
  'android',
  'gradle.properties',
);

const createFileSync = folder => (fileName, data) => {
  fse.outputFileSync(`${folder}/${fileName}`, data);
  return path.resolve(folder, fileName);
};

const copy = async ({ appName }) => {
  // already existing?
  const exists = await fse.pathExists(`${CONFIG_PATH}/${appName}.json`);
  if (exists) {
    console.error('App already EXISTS!'); // eslint-disable-line no-console
    process.exit(1);
  }
  const lowerCaseAppName = appName.toLowerCase();
  // create flavour folder
  const flavourPath = `${JAVA_SRC_PATH}/${lowerCaseAppName}`;
  const srcFilePath = `${flavourPath}/java/com/reactnativemonorepo`;
  const resPath = `${flavourPath}/res`;
  const App = appName.toUpperCase();
  const appNameForJavaFiles = appName.replace('App', '');

  // 1. src folder
  fse.ensureDirSync(srcFilePath);
  // 2. create files
  createFileSync(srcFilePath)(
    `${appNameForJavaFiles}MainActivity.java`,
    activity(appName),
  );
  createFileSync(srcFilePath)(
    `${appNameForJavaFiles}MainApplication.java`,
    application(appName),
  );

  // 3. create res folder
  fse.copySync(RES_PATH, resPath);

  // 4. edit strings.xml for app name
  // fse.writeFileSync(
  //   path.resolve(resPath, 'values', 'strings.xml'),
  //   strings(appName),
  // );

  // 5. write manifest file
  createFileSync(flavourPath)('AndroidManifest.xml', manifest(appName));

  // 6. create js folder and file
  createFileSync(`${JS_SRC_PATH}/${appName}`)(
    'Root.tsx',
    sampleComponent(appName),
  );
  createFileSync(`${JS_SRC_PATH}/${appName}`)('index.js', registry(appName));

  createFileSync(`${JS_SRC_PATH}/${appName}`)('package.json', packageJson(appName));

  // 7. create config file
  createFileSync(CONFIG_PATH)(`${appName}.json`, sampleConfigJson(appName));

  const properties = [
    `${App}_RELEASE_STORE_FILE=../../keystore/${appName}keystore.keystore`,
    `${App}_RELEASE_KEY_ALIAS=${appName}Alias`,
    `${App}_RELEASE_STORE_PASSWORD=${appName}Password`,
    `${App}_RELEASE_KEY_PASSWORD=${appName}Password`,
  ];

  const genKey = `keytool -genkeypair -noprompt -alias ${appName}Alias -keyalg RSA -sigalg SHA1withRSA -keysize 2048 -dname "CN=flipkart, OU=ekart, O=flipkart, L=bangalore, ST=karnataka, C=IN" -keystore ${KEYSTORE_PATH}/${appName}keystore.keystore -storepass ${appName}Password -keypass ${appName}Password -validity 10950`;
  exec(genKey, (e, o, r) => {
    if (!e) fse.appendFile(GRADLE_PROP, ['\n'].concat(properties).join('\n'));
  });
};

module.exports = copy;
