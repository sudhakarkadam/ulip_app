
package com.reactnativemonorepo;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.PackageList;
import java.util.Arrays;
import java.util.List;

public class ShipperMainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            return packages;
            // return Arrays.<ReactPackage>asList(
            //     new MainReactPackage(),
            //     new MapsPackage(),
            //     new RNAndroidLocationEnablerPackage(),
            //     new SvgPackage() 
            // );
        }

        @Override
        protected String getJSMainModuleName() {
            return "./src/apps/Shipper/index";
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
