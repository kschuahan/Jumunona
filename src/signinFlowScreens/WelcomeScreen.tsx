import { StyleSheet, Image, View } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import RootStackParamList from "../utils/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { RouteProp } from "@react-navigation/native-stack";
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const logo = require("../../assets/logo.png");
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Signup");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
});
