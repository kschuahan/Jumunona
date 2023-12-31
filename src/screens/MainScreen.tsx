import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import CategoryScreen from "./CategoryScreen";
import MessagesScreen from "./MessagesScreen";
import CartScreen from "./CartScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

const Tab = createMaterialBottomTabNavigator();
const home = require("../../assets/icon-36x36.png");

{
  /* <Image source={home} style={{ width: 25, height: 25 }} /> */
}
{
  /* <Ionicons name="home" color={color} size={26} /> */
}
const MainScreen: React.FC = () => {
  return (
    <Tab.Navigator
      labeled={false}
      barStyle={{
        backgroundColor: "#ffffff", height: 90, elevation: 40, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderColor: 'transparent',
        overflow: 'hidden'
      }}
      initialRouteName="Home"
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
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
