import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../utils/navigation";
const logo = require("../../assets/icon-512x512.png");

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            paddingBottom: 24,
            fontFamily: "SegoeUIBold",
          }}
        >
          Вход
        </Text>
        <Image
          source={logo}
          style={{ width: 82, height: 82, marginTop: 16, borderRadius: 24 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: "SegoeUIBold",
            color: "#FF7600",
            paddingTop: 8,
          }}
        >
          Jumunona
        </Text>
      </View>
      <View style={styles.middle}>
        <View style={{ marginHorizontal: 12 }}>
          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "45%",
                height: 34,
                borderRadius: 24,
                paddingLeft: 8,
              }}
            >
              <Text style={styles._992}>+992</Text>

              {/* <TextInput placeholder="+91" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> */}
            </LinearGradient>

            <TextInput
              placeholder="Enter Mobile No."
              style={styles.mobileTextInput}
            ></TextInput>
          </View>
          <View>
            <TextInput
              placeholder="Please Enter Password"
              style={styles.passwordTextInput}
            ></TextInput>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.replace("Main");
        }}
        style={styles.loginButton}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={["#ffc500", "#ff7600"]}
          style={styles.buttonGradient}
        >
          <Text
            style={{ fontSize: 18, color: "#fff", fontFamily: "SegoeUIBold" }}
          >
            Log in
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text
          onPress={() => {
            navigation.replace("ForgotPassword");
          }}
          style={{ fontWeight: "600", fontFamily: "SegoeUI" }}
        >
          Forgot Password?
        </Text>
        <Text
          onPress={() => {
            navigation.replace("Signup");
          }}
          style={{ fontWeight: "600", fontFamily: "SegoeUI" }}
        >
          Sign Up Now
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 23.5,
    paddingBottom: 48,
  },
  middle: {
    paddingHorizontal: 10,
    paddingTop: 11,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "hsl(0, 0%, 98%)",
    borderRadius: 20,
    width: 359,
    height: 107,
    alignSelf: "center",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginHorizontal: 32,
  },
  _992: {
    color: "#fff",
    paddingTop: 9,
    paddingLeft: 8,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  mobileTextInput: {
    width: "82%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  passwordTextInput: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    paddingLeft: 16,
    marginBottom: 24,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  loginButton: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    fontFamily: "SegoeUIBold",
  },
  buttonGradient: {
    elevation: 4,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
});
