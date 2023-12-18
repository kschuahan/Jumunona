/* eslint-disable react/no-unstable-nested-components */
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {colors} from '../utils/AppColors';
import HomeScreen from './HomeScreen';
import CategoryScreen from './CategoryScreen';
import CartScreen from './CartScreen';
import ProfileScreen from '../screens/ProfileSection/ProfileScreen';
import {RouteNames} from '../utils/RouteNames';
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
import ChatScreen from './Chat/ChatScreen';
import MessagesScreen from './Chat/MessagesScreen';

const Tab = createMaterialBottomTabNavigator();

const MainScreen: React.FC = ({}) => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={RouteNames.home}
        labeled={false}
        activeColor={colors.lightOrange}
        inactiveColor={colors.lightOrange}
        barStyle={styles.navigator}>
        <Tab.Screen
          name={RouteNames.home}
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused, color}) => {
              return focused ? (
                <HomeFocusedIcon1 width={26} height={26} color={color} />
              ) : (
                <HomeIcon width={26} height={26} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name={RouteNames.categoriesHome}
          component={CategoryScreen}
          options={{
            tabBarIcon: ({focused, color}) => {
              return focused ? (
                <CategoryFocusedIcon width={25} height={25} color={color} />
              ) : (
                <CategoryIcon width={25} height={25} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name={RouteNames.chat_screen}
          component={MessagesScreen}
          options={{
            tabBarIcon: ({focused, color}) => {
              return focused ? (
                <MessageFocusedIcon width={25} height={25} color={color} />
              ) : (
                <MessageIcon width={25} height={25} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name={RouteNames.cartScreen}
          component={CartScreen}
          options={{
            tabBarIcon: ({focused, color}) => {
              return focused ? (
                <CartFocusedIcon width={25} height={25} color={color} />
              ) : (
                <CartIcon width={25} height={25} color={color} />
              );
            },
          }}
        />
        <Tab.Screen
          name={RouteNames.profileScreen}
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused, color}) => {
              return focused ? (
                <MyAccountFocusedIcon width={25} height={25} color={color} />
              ) : (
                <ProfileIcon width={25} height={25} color={color} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  bottomTabBarStyle: {
    backgroundColor: '#ffffff',
    height: 70,
    elevation: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  navigator: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: 'transparent',
    overflow: 'hidden',
    height: 78,
  },
});
export default MainScreen;
