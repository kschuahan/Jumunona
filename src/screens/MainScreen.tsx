import { StyleSheet, Text, View,SafeAreaView } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileSection/ProfileScreen";
import CategoryScreen from "./CategoryScreen";
import MessagesScreen from "./MessagesScreen";
import CartScreen from "./CartScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import { colors } from "../utils/AppColors";

const Tab = createMaterialBottomTabNavigator();
const home = require("../../assets/icon-36x36.png");

const MainScreen: React.FC = () => {
  return (
    <SafeAreaView style={{flex:1, backgroundColor: colors.white}}>
    <Tab.Navigator
      labeled={false}
      barStyle={{
        backgroundColor: "#ffffff", height: 70, elevation: 40, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderColor: 'transparent',
        overflow: 'hidden'
      }}
      initialRouteName="Cart"
      inactiveColor="#ff7600"
      activeColor="#ff7600"

      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "home" : 'home-outline'} color={color} size={26} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Categories"
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "grid" : 'grid-outline'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "chatbubble-ellipses" : 'chatbubble-ellipses-outline'}
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "cart" : 'cart-outline'} color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? "person" : 'person-outline'} color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>

  );
};

export default MainScreen;

const styles = StyleSheet.create({});
