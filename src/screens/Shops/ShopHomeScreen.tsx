/* eslint-disable react/no-unstable-nested-components */
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { colors } from '../../utils/AppColors';
import HomeScreen from './../HomeScreen';
import CategoryScreen from './../CategoryScreen';
import CartScreen from './../Cart/CartScreen';
import ProfileScreen from '../../screens/ProfileSection/ProfileScreen';
import { RouteNames } from '../../utils/RouteNames';
import CartIcon from '../../../assets/Icons/cart.svg';
import CategoryIcon from '../../../assets/Icons/category.svg';
import ProfileIcon from '../../../assets/Icons/myAccount.svg';
import HomeIcon from '../../../assets/Icons/home.svg';
import MessageIcon from '../../../assets/Icons/messageIcon.svg';
// import HomeFocusedIcon from '../../assets/Icons/home-focused.svg';
import HomeFocusedIcon1 from '../../../assets/Icons/SelectHome.svg';
import CategoryFocusedIcon from '../../../assets/Icons/category-focused.svg';
import MessageFocusedIcon from '../../../assets/Icons/messageIcon-filled.svg';
import CartFocusedIcon from '../../../assets/Icons/cart-filled.svg';
import MyAccountFocusedIcon from '../../../assets/Icons/myAccount-filled.svg';
import MessagesScreen from '../Chat/MessagesScreen';
import { ShopsScreen } from './Shoes';
import { AllCategoriesScreen } from '../categories/AllCategoryScreen';
import ChatScreen from '../Chat/ChatScreen';
import { ShopCategoriesScreen } from './ShopCategories';

const Tab = createMaterialBottomTabNavigator();

const ShopHomeScreen: React.FC = ({route }) => {

// console.warn(route.params.productId)
  return (
    <Tab.Navigator
      initialRouteName={RouteNames.home}
      labeled={false}
      shifting={true}
      activeColor={colors.lightOrange}
      inactiveColor={colors.lightOrange}
      barStyle={{
        backgroundColor: colors.white,
        height: 78,
        elevation: 40,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        borderColor: 'transparent',
        overflow: 'hidden'
      }}


    >

      <Tab.Screen

        name={RouteNames.shophome}
        component={ShopsScreen}
        initialParams={{productId: route.params && route.params.productId ? route.params.productId : '65b8c1a8b03f0c815947e1e7'}}
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
        name={RouteNames.shopcategoriesHome}
        component={ShopCategoriesScreen}
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
        name={RouteNames.shopchatScreenUsersList}
        component={ChatScreen}
        initialParams={{ isShop: true }}
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
export default ShopHomeScreen;
