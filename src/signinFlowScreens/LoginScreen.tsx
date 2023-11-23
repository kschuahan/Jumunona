import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import RootStackParamList from "../utils/navigation";
const logo = require("../../assets/logo.png");

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
        <Text style={{ fontSize: 28, fontWeight: "bold", paddingBottom: 24 }}>
          Login
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
                paddingLeft: 8,
              }}
            >
              {/* <Picker
                selectedValue={selectedAreaCode}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedAreaCode(itemValue)
                }
                style={{ color: "white" }}
              >
                <Picker.Item label="+91" value="+91" />
                <Picker.Item label="+7" value="+7" />
                <Picker.Item label="+121" value="+121" />
                <Picker.Item label="+52" value="+52" />
                <Picker.Item label="+66" value="+66" />
                <Picker.Item label="+223" value="+223" />
              </Picker> */}
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

              {/* <TextInput placeholder="+91" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> */}
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
            ></TextInput>
          </View>
          <View>
            <TextInput
              placeholder="Please Enter Password"
              style={{
                width: "100%",
                backgroundColor: "#f5f5f5",
                height: 40,
                borderRadius: 24,
                paddingLeft: 16,
                marginBottom: 24,
              }}
            ></TextInput>
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => {
          navigation.replace("Main");
        }}
        style={{
          flex: 1,
          width: "100%",
          paddingTop: 20,
          paddingBottom: 12,
          paddingLeft: 24,
          paddingRight: 24,
          justifyContent: "space-between",
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
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "600" }}>
            Log in
          </Text>
        </LinearGradient>
      </Pressable>
      <View style={styles.bottom}>
        <Text
          onPress={() => {
            navigation.replace("ForgotPassword");
          }}
          style={{ fontWeight: "600" }}
        >
          Forgot Password?
        </Text>
        <Text
          onPress={() => {
            navigation.replace("Signup");
          }}
          style={{ fontWeight: "600" }}
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
    marginHorizontal: 32,
  },
});
