const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const createSymLink = require('@lerna/create-symlink');

if (!process.argv.slice(2)[0]) {
  console.error(
    'Please run the script as: npm run bootstrap -- --appName=OnboadingApp',
  );
  process.exit(1);
}

const appName = process.argv.slice(2)[0].split('=')[1];
console.log('app name is: ', appName);

const CONFIG_PATH = path.resolve(__dirname, '..', 'configs');

const exists = fs.existsSync(`${CONFIG_PATH}/${appName}.json`);
if (!exists) {
  console.error("App doesn't Exist!");
  process.exit(1);
}

//Step 1 get the dependencies specific to app

try {
  let dependencies = [];
  const readAppSpecificPackageFile = fs.readFileSync(
    `src/apps/${appName}/package.json`,
  );
  const dependenciesObj = JSON.parse(readAppSpecificPackageFile).dependencies;
  dependencies = Object.keys(dependenciesObj);
  console.log('app specific dependencies: ', dependencies);

  //Step 2 : Remove those dependencies from global node_modules if it exists

  dependencies.forEach(dependency => {
    execSync(`rm -rf node_modules/${dependency}`);
    createSymLink(
      `src/apps/${appName}/node_modules/${dependency}/`,
      `node_modules/${dependency}`,
      'exec',
    );
  });
} catch (err) {
  console.error(err);
  process.exit(1);
}

fs.writeFile('app-context.txt', appName, err => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Context File created Successfully');
});
