import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../utils/navigation";
import sendSMS from "../utils/sendSMS";

const logo = require("../../assets/logo.png");
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
        <Text style={{ fontSize: 28, fontWeight: "bold", paddingBottom: 24 }}>
          Register
        </Text>
        <Image source={logo} />
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
                backgroundColor: "red",
                height: 40,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  paddingTop: 12,
                  paddingLeft: 12,
                }}
              >
                +992
              </Text>
            </LinearGradient>

            <TextInput
              placeholder="Enter Mobile No."
              style={{
                width: "72%",
                backgroundColor: "#f5f5f5",
                height: 40,
                borderRadius: 24,
                marginLeft: -40,
                paddingLeft: 16,
              }}
              onChangeText={(text) => {
                setMobile(text);
              }}
              value={mobile}
            ></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "45%",
                height: 40,
                borderRadius: 24,
                paddingLeft: 0,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  paddingTop: 10,
                  paddingLeft: 12,
                }}
              >
                OTP
              </Text>
            </LinearGradient>

            <View style={{ flex: 1, flexDirection: "row" }}>
              <TextInput
                placeholder="Enter SMS Code..."
                style={{
                  width: "110%",
                  backgroundColor: "#f5f5f5",
                  height: 40,
                  borderRadius: 24,
                  marginLeft: -40,
                  paddingLeft: 16,
                }}
                onChangeText={(text) => {
                  setConfirmationCode(text);
                }}
                value={confirmationCode}
              />
              <Pressable
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 24,
                  marginLeft: -80,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingRight: 10,
                }}
              >
                <LinearGradient
                  colors={["#ff7600", "#ffc500"]}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: "45%",
                    height: 40,
                    borderRadius: 24,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingRight: 10,
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      color: "#fff",
                      paddingTop: 10,
                      paddingLeft: 12,
                    }}
                  >
                    Send
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "45%",
                backgroundColor: "red",
                height: 40,
                borderRadius: 24,
                paddingLeft: 0,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  paddingTop: 10,
                  paddingLeft: 12,
                }}
              >
                Password
              </Text>
            </LinearGradient>

            <TextInput
              placeholder="Create Password"
              style={{
                width: "72%",
                backgroundColor: "#f5f5f5",
                height: 40,
                borderRadius: 24,
                marginLeft: -40,
                paddingLeft: 16,
              }}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            ></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "45%",
                backgroundColor: "red",
                height: 40,
                borderRadius: 24,
                paddingLeft: 0,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  paddingTop: 10,
                  paddingLeft: 12,
                }}
              >
                Password
              </Text>
            </LinearGradient>

            <TextInput
              placeholder="Repeat Password"
              style={{
                width: "72%",
                backgroundColor: "#f5f5f5",
                height: 40,
                borderRadius: 24,
                marginLeft: -40,
                paddingLeft: 16,
              }}
              onChangeText={(text) => {
                setRePassword(text);
              }}
              value={rePassword}
            ></TextInput>
          </View>

          <View
            style={{ flexDirection: "row", width: "100%", marginBottom: 18 }}
          >
            <LinearGradient
              colors={["#ff7600", "#ffc500"]}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: "45%",
                backgroundColor: "red",
                height: 40,
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                  paddingTop: 10,
                  paddingLeft: 12,
                }}
              >
                Code
              </Text>
            </LinearGradient>

            <TextInput
              placeholder="Have a referral code?"
              style={{
                width: "72%",
                backgroundColor: "#f5f5f5",
                height: 40,
                borderRadius: 24,
                marginLeft: -40,
                paddingLeft: 16,
              }}
              onChangeText={(text) => {
                setRefferalCode(text);
              }}
              value={referralCode}
            ></TextInput>
          </View>
        </View>
      </View>
      <Text
        style={{
          color: "#999",
          paddingBottom: 14,
          paddingLeft: 28,
          paddingRight: 20,
          paddingTop: 14,
        }}
      >
        I agree to the “Terms of Use” and “Privacy Policy” by clicking Register
      </Text>
      <View
        style={{
          flex: 1,
          width: "100%",
          paddingTop: 0,
          paddingBottom: 20,
          paddingLeft: 24,
          paddingRight: 24,
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={() => {
            sendSMS("917733070117", "3456");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#ffc500", "#ff7600"]}
            style={{
              elevation: 4,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
              marginBottom: 12,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "600" }}>
              Sign Up
            </Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.replace("Login");
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#ffc500", "#ffc500"]}
            style={{
              elevation: 4,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 24,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff", fontWeight: "600" }}>
              Log In
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 3 / 10,
    alignItems: "center",
    paddingVertical: 64,
  },
  middle: {
    flex: 3 / 10,
    paddingHorizontal: 4,
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "hsl(0, 0%, 98%)",
    borderRadius: 20,
    marginHorizontal: 24,
  },
  bottom: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingTop: 32,
    marginHorizontal: 32,
  },
  linearGradient: {
    elevation: 4,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    marginBottom: 12,
  },
});
