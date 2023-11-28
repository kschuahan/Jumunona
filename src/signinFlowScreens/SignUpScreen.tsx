import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../utils/navigation";
import { dimensions } from "../utils/sizes";

const logo = require("../../assets/icon-512x512.png");
type SignupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Signup"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface SignUpScreenProps {
  navigation: SignupScreenNavigationProp;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [referralCode, setRefferalCode] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.registerText}>Регистрация</Text>
        <Image
          style={{ width: 82, height: 82, marginTop: 40, borderRadius: 24 }}
          source={logo}
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
            style={{ flexDirection: "row", width: "100%", paddingBottom: 12 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}
            >
              <Text style={styles._992}>+992</Text>
            </LinearGradient>

            <TextInput
              placeholder="Enter Mobile No."
              style={styles.mobileTextInput}
              onChangeText={(text) => {
                setMobile(text);
              }}
              value={mobile}
            ></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", paddingBottom: 12 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}
            >
              <Text style={styles.otpText}>OTP</Text>
            </LinearGradient>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                placeholder="Enter SMS Code..."
                style={styles.codeTextInput}
                onChangeText={(text) => {
                  setConfirmationCode(text);
                }}
                value={confirmationCode}
              />
              <TouchableOpacity style={styles.sendOTPButton}>
                <LinearGradient
                  colors={["#ff7600", "#ffc500"]}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.leftSideGradient,
                    {
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: 10,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      paddingLeft: 12,
                      fontFamily: "SegoeUI",
                      fontSize: 14,
                    }}
                  >
                    Send
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", paddingBottom: 12 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}
            >
              <Text style={styles.passwordText}>Password</Text>
            </LinearGradient>

            <TextInput
              placeholder="Create Password"
              style={styles.passwordTextInput}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            ></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", paddingBottom: 12 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}
            >
              <Text style={styles.passwordText}>Password</Text>
            </LinearGradient>

            <TextInput
              placeholder="Repeat Password"
              style={styles.passwordTextInput}
              onChangeText={(text) => {
                setRePassword(text);
              }}
              value={rePassword}
            ></TextInput>
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}
            >
              <Text style={styles.referralCodeText}>Code</Text>
            </LinearGradient>

            <TextInput
              placeholder="Have a referral code?"
              style={styles.referralCodeTextInput}
              onChangeText={(text) => {
                setRefferalCode(text);
              }}
              value={referralCode}
            ></TextInput>
          </View>
        </View>
      </View>
      <Text style={styles.termsText}>
        I agree to the “Terms of Use” and “Privacy Policy” by clicking Register
      </Text>
      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={() => {}}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#FE8C00", "#ff7600"]}
            style={[styles.loginButtonGradient, { marginBottom: 12 }]}
          >
            <Text style={styles.signuploginText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#FDCA30", "#FDCA30"]}
            style={styles.loginButtonGradient}
          >
            <Text style={styles.signuploginText}>Log In</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "center",
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 23.5,
    paddingBottom: 48,
    alignSelf: "center",
  },
  registerText: {
    fontSize: 21,
    fontFamily: "SegoeUIBold",
    width: 160,
    textAlign: "center",
  },
  middle: {
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    height: 248,
    width: 359,
    alignSelf: "center",
  },
  bottom: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingTop: 32,
    marginHorizontal: 32,
    alignSelf: "center",
  },
  _992: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 12,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  leftSideGradient: {
    width: "40%",
    height: 34,
    borderRadius: 24,
  },
  mobileTextInput: {
    width: "82%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  otpText: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 12,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  codeTextInput: {
    width: "116%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  sendOTPButton: {
    width: "100%",
    height: 34,
    borderRadius: 24,
    marginLeft: -85,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 10,
    textAlign: "center",
  },
  passwordText: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 12,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  passwordTextInput: {
    width: "82%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  referralCodeText: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 12,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  referralCodeTextInput: {
    width: "82%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  termsText: {
    color: "#999",
    paddingBottom: 14,
    paddingLeft: 28,
    paddingRight: 20,
    paddingTop: 14,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  buttonsView: {
    width: "100%",
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  signuploginText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    fontFamily: "SegoeUIBold",
    textAlign: "center",
  },
  loginButtonGradient: {
    elevation: 4,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    marginHorizontal: 24,
  },
});
