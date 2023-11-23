import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MainScreen from "./src/screens/MainScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./src/signinFlowScreens/WelcomeScreen";
import LoginScreen from "./src/signinFlowScreens/LoginScreen";
import SignUpScreen from "./src/signinFlowScreens/SignUpScreen";
import ForgotPasswordScreen from "./src/signinFlowScreens/ForgotPasswordScreen";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
              options={{ headerShown: false }}
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
