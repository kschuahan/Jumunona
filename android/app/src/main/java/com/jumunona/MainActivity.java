package com.jumunona;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.annotation.TargetApi;
import android.content.Context;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.util.DisplayMetrics;
import android.util.Log;

public class MainActivity extends ReactActivity {


  @TargetApi(Build.VERSION_CODES.N)
  private static final int[] ORDERED_DENSITY_DP_N = {
          DisplayMetrics.DENSITY_LOW,
          DisplayMetrics.DENSITY_MEDIUM,
          DisplayMetrics.DENSITY_TV,
          DisplayMetrics.DENSITY_HIGH,
          DisplayMetrics.DENSITY_280,
          DisplayMetrics.DENSITY_XHIGH,
          DisplayMetrics.DENSITY_360,
          DisplayMetrics.DENSITY_400,
          DisplayMetrics.DENSITY_420,
          DisplayMetrics.DENSITY_XXHIGH,
          DisplayMetrics.DENSITY_560,
          DisplayMetrics.DENSITY_XXXHIGH
  };

  @TargetApi(Build.VERSION_CODES.N_MR1)
  private static final int[] ORDERED_DENSITY_DP_N_MR1 = {
          DisplayMetrics.DENSITY_LOW,
          DisplayMetrics.DENSITY_MEDIUM,
          DisplayMetrics.DENSITY_TV,
          DisplayMetrics.DENSITY_HIGH,
          DisplayMetrics.DENSITY_260,
          DisplayMetrics.DENSITY_280,
          DisplayMetrics.DENSITY_XHIGH,
          DisplayMetrics.DENSITY_340,
          DisplayMetrics.DENSITY_360,
          DisplayMetrics.DENSITY_400,
          DisplayMetrics.DENSITY_420,
          DisplayMetrics.DENSITY_XXHIGH,
          DisplayMetrics.DENSITY_560,
          DisplayMetrics.DENSITY_XXXHIGH
  };

  @TargetApi(Build.VERSION_CODES.P)
  private static final int[] ORDERED_DENSITY_DP_P = {
          DisplayMetrics.DENSITY_LOW,
          DisplayMetrics.DENSITY_MEDIUM,
          DisplayMetrics.DENSITY_TV,
          DisplayMetrics.DENSITY_HIGH,
          DisplayMetrics.DENSITY_260,
          DisplayMetrics.DENSITY_280,
          DisplayMetrics.DENSITY_XHIGH,
          DisplayMetrics.DENSITY_340,
          DisplayMetrics.DENSITY_360,
          DisplayMetrics.DENSITY_400,
          DisplayMetrics.DENSITY_420,
          DisplayMetrics.DENSITY_440,
          DisplayMetrics.DENSITY_XXHIGH,
          DisplayMetrics.DENSITY_560,
          DisplayMetrics.DENSITY_XXXHIGH
  };
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "jumunona";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }


  @Override
  protected void attachBaseContext(final Context baseContext) {

    Context newContext;

    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
      DisplayMetrics displayMetrics = baseContext.getResources().getDisplayMetrics();
      Configuration configuration = baseContext.getResources().getConfiguration();
      if (displayMetrics.densityDpi != DisplayMetrics.DENSITY_DEVICE_STABLE) {
        // Current density is different from Default Density. Override it
        configuration.densityDpi = DisplayMetrics.DENSITY_DEVICE_STABLE;
        configuration.fontScale = 1.0f;
        newContext = baseContext.createConfigurationContext(configuration);
      } else {
        // Same density. Just use same context
        newContext = baseContext;
      }

    } else {
      // Old API. Screen zoom not supported
      newContext = baseContext;
    }

    super.attachBaseContext(newContext);
  }
  @TargetApi(Build.VERSION_CODES.N)
  private static int findDensityDpCanFitScreen(final int densityDp) {
    int[] orderedDensityDp;

    if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
      orderedDensityDp = ORDERED_DENSITY_DP_P;
    } else if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.N_MR1) {
      orderedDensityDp = ORDERED_DENSITY_DP_N_MR1;
    } else {
      orderedDensityDp = ORDERED_DENSITY_DP_N;
    }

    int index = 0;
    while (densityDp >= orderedDensityDp[index]) {
      index++;
    }
    return orderedDensityDp[index];
  }

}
