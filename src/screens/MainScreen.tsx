/* eslint-disable react/no-unstable-nested-components */
import { Platform, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { colors } from '../utils/AppColors';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import CartScreen from './Cart/CartScreen';
import ProfileScreen from '../screens/ProfileSection/ProfileScreen';
import { RouteNames } from '../utils/RouteNames';
import CartIcon from '../../assets/Icons/cart.svg';
import CategoryIcon from '../../assets/Icons/category.svg';
import ProfileIcon from '../../assets/Icons/myAccount.svg';
import HomeIcon from '../../assets/Icons/home.svg';
import MessageIcon from '../../assets/Icons/messageIcon.svg';
// import HomeFocusedIcon from '../../assets/Icons/home-focused.svg';
import HomeFocusedIcon1 from '../../assets/Icons/SelectHome.svg';
import CategoryFocusedIcon from '../../assets/Icons/category-focused.svg';
import MessageFocusedIcon from '../../assets/Icons/messageIcon-filled.svg';
import CartFocusedIcon from '../../assets/Icons/cart-filled.svg';
import MyAccountFocusedIcon from '../../assets/Icons/myAccount-filled.svg';
import MessagesScreen from './Chat/MessagesScreen';

const Tab = createMaterialBottomTabNavigator();

const MainScreen: React.FC = ({ }) => {
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.home}
      labeled={false}
      shifting={true}
      activeColor={colors.lightOrange}
      inactiveColor={colors.lightOrange}
      barStyle={{
        backgroundColor: colors.white,
        height: Platform.OS == 'ios' ? 60 : 78,
        elevation: 40,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderColor: 'transparent',
        overflow: 'hidden',
      }}>
      <Tab.Screen
        name={RouteNames.home}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <HomeFocusedIcon1 color={color} style={{ marginTop: -15 }} />
            ) : (
              <HomeIcon color={color} style={{ marginTop: -15 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.categoriesHome}
        component={CategoryScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <CategoryFocusedIcon color={color} style={{ marginTop: -15 }} />
            ) : (
              <CategoryIcon color={color} style={{ marginTop: -15 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.chatScreenUsersList}
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <MessageFocusedIcon color={color} style={{ marginTop: -15 }} />
            ) : (
              <MessageIcon color={color} style={{ marginTop: -15 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.cartScreen}
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <CartFocusedIcon color={color} style={{ marginTop: -15 }} />
            ) : (
              <CartIcon color={color} style={{ marginTop: -15 }} />
            );
          },
        }}
      />
      <Tab.Screen
        name={RouteNames.profileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return focused ? (
              <MyAccountFocusedIcon color={color} style={{ marginTop: -18 }} />
            ) : (
              <ProfileIcon color={color} style={{ marginTop: -18 }} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  bottomTabBarStyle: {
    backgroundColor: '#ffffff',
    height: 70,
    elevation: 40,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  navigator: {
    backgroundColor: colors.black,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderColor: 'transparent',
    overflow: 'hidden',
    height: 78,
  },
});
export default MainScreen;
