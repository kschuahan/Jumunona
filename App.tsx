import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MainScreen from "./src/screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/signinFlowScreens/WelcomeScreen";
import LoginScreen from "./src/signinFlowScreens/LoginScreen";
import SignUpScreen from "./src/signinFlowScreens/SignUpScreen";
import "react-native-gesture-handler";
import ForgotPasswordScreen from "./src/signinFlowScreens/ForgotPasswordScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { RouteNames } from "./src/utils/RoutesNames";
import { SettingScreen } from "./src/screens/Setting";

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  SplashScreen.preventAutoHideAsync();

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          SegoeUI: require("./assets/fonts/SegoeUI.ttf"),
          SegoeUIBold: require("./assets/fonts/SegoeUIBold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);
  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <NavigationContainer >
          <Stack.Navigator initialRouteName={RouteNames.welcome} screenOptions={{  headerTitleAlign: 'center' }}>
            <Stack.Screen
              name={RouteNames.welcome}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name={RouteNames.login}
              component={LoginScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name={RouteNames.signup}
              component={SignUpScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name={RouteNames.main}
              component={MainScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name={RouteNames.forgotPassword}
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name={RouteNames.setting}
              component={SettingScreen}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default App;
