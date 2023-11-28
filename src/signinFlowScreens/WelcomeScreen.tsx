import { StyleSheet, Image, View, Text } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import RootStackParamList from "../utils/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteNames } from "../utils/RoutesNames";
// import { RouteProp } from "@react-navigation/native-stack";
type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Welcome"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface WelcomeScreenProps {
  navigation: WelcomeScreenNavigationProp;
}

const logo = require("../../assets/icon-512x512.png");
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace(RouteNames.login);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={styles.text}>Jumunona</Text>
      <Text
        style={{
          textAlign: "center",
          color: "#BBBBBB",
          marginBottom: 64,
          fontFamily: "SegoeUI",
          position: "absolute",
          bottom: 0,
        }}
      >
        Jumunona e-Commerce Co. Ltd.
      </Text>
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
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "yellow",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 13,
  },
  logo: { width: 103, height: 103, borderRadius: 24 },

  text: {
    width: 160,
    height: 41,
    fontSize: 31,
    color: "#FF7600",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    fontFamily: "SegoeUIBold",
  },
});
