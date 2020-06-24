# react-native-monorepo ![CI](https://github.com/samvet/ULIP-APP/workflows/CI/badge.svg)
A boilerplate for setting up mono repo architecture for react-native apps

### Command to add a new app

```yarn create-app```

This will ask for new app name and it will create all the necessary folder structure for it.


### Bootstrapping every app

After creation of a new and before switching between apps, execute the following command

```yarn bootstrap -- --appName=<app name>```

This will take care of installing the necessary node modules and linking your dependencies.
