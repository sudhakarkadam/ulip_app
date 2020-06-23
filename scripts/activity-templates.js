const activity = appName =>
  `
package com.reactnativemonorepo;

import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class ${appName.replace(
    'App',
    '',
  )}MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "${appName}";
    }
}
`;

const application = mainMoudleName =>
  `
package com.reactnativemonorepo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class ${mainMoudleName.replace(
    'App',
    '',
  )}MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                new MainReactPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "./src/apps/${mainMoudleName}/index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
    }
}
`;

const strings = appName =>
  `
<resources>
    <string name="app_name">${appName}</string>
</resources>
`;

const manifest = appName =>
  `<?xml version="1.0" encoding="utf-8"?>
  <manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.reactnativemonorepo">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:name=".${appName.replace('App', '')}MainApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="\${appName}\${typeLabel}\${environmentLabel}"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true"
        tools:replace="android:label">
        <activity
            android:name=".${appName.replace('App', '')}MainActivity"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:exported="true"
            android:label="\${appName}\${typeLabel}\${environmentLabel}"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
`;

const sampleComponent = appName =>
  `
  import React from 'react'
  import { Component } from 'react';
  import {
    Platform,
    StyleSheet,
    Text,
    View
  } from 'react-native';
  
  const instructions = Platform.select({
    ios: 'Press Cmd+R to reload. Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload. Shake or press menu button for dev menu',
  });
  
  
  type Props = {};
  export default class App extends Component<Props> {
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome, I am ${appName} app!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit App.js
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
`;

const registry = appName => `
import {AppRegistry} from 'react-native';
import App from './Root';

AppRegistry.registerComponent("${appName}", () => App);
`;

const sampleConfigJson = appName => `
{
  "appName": "${appName}",
  "versionName": "1.0.0",
  "applicationId": "",
  "codepushAppName": "",
  "apkName": "${appName}",
  "plugins": [],
  "dependencies": {
    "implementation": [],
    "implementationProject": []
  },
  "applyGradle": [],
  "vectorIcons": [],
  "environment": [
    {
      "name": "preprod",
      "buildConfigField": [
        {
          "type": "String",
          "fieldName": "APP_BASE_URL",
          "value": ""
        },
        {
          "type": "String",
          "fieldName": "CODEPUSH_DEPLOYMENT_KEY",
          "value": ""
        }
      ],
      "manifestConstants": {
        "cleverTapAccountId": "",
        "cleverTapToken": "",
        "environmentLabel": "[STAGE]"
      },
      "applicationIdSuffix": ".preprod"
    },
    {
      "name": "prod",
      "buildConfigField": [
        {
          "type": "String",
          "fieldName": "APP_BASE_URL",
          "value": ""
        },
        {
          "type": "String",
          "fieldName": "CODEPUSH_DEPLOYMENT_KEY",
          "value": ""
        }
      ],
      "manifestConstants": {
        "cleverTapAccountId": "",
        "cleverTapToken": "",
        "environmentLabel": ""
      }
    }
  ],
  "buildTypes": [
    {
      "type": "debug",
      "applicationIdSuffix": ".debug",
      "debuggable": true,
      "versionNameSuffix": "-DEBUG",
      "minifyEnabled": false,
      "useProguard": false,
      "setProguard": false,
      "shrinkResources": false,
      "typeLabel": "[DEBUG]"
    }
  ]
}
`;

const packageJson = appName => `{
  "name": "${appName}",
  "version": "1.0.0",
  "private": true,
  "dependencies": {}
}
`;

module.exports = {
  activity,
  application,
  strings,
  manifest,
  sampleComponent,
  registry,
  sampleConfigJson,
  packageJson,
};
