import React, {useEffect} from 'react';
import {Dimensions, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RouteNames} from './src/utils/RouteNames';
import {fontFamily} from './src/utils/Fonts';
import WelcomeScreen from './src/screens/WelcomeScreen';
import {colors} from './src/utils/AppColors';
import LoginScreen from './src/screens/signInFlowScreens/LoginScreen';
import SignUpScreen from './src/screens/signInFlowScreens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/signInFlowScreens/ForgotPasswordScreen';
import MainScreen from './src/screens/MainScreen';
import {SettingScreen} from './src/screens/ProfileSection/Settings/Setting';
import ProfileDetailScreen from './src/screens/ProfileSection/ProfileDetailScreen';
import {ViewMobileNumberScreen} from './src/screens/ProfileSection/ViewMobileNumber';
import DeleteAccount from './src/screens/ProfileSection/DeleteAccountScreen';
import ConfirmDeleteAccount from './src/screens/ProfileSection/ConfirmDeleteAccount';
import ChangePhoneScreen from './src/screens/ProfileSection/ChangePhoneScreen';
import ChangeEmailScreen from './src/screens/ProfileSection/ChangeEmailScreen';
import ChangePassswordScreen from './src/screens/ProfileSection/ChangePasswordScree';
import {SucessfulChangePasswordScreen} from './src/screens/ProfileSection/SucessfulChangePassword';
import MyReviewsScreen from './src/screens/Reviews/MyReviewsScreen';
import NotificationSettingScreen from './src/screens/Notification/NotificationSettingScreen';
import TermOfUseScreen from './src/screens/ProfileSection/Settings/TermOfUseScreen';
import {SelectCity} from './src/screens/ProfileSection/SelectCity';
import PrivacyPolicyScreen from './src/screens/ProfileSection/Settings/PrivacyPolicyScreen';
import PersonalInfoPolicy from './src/screens/ProfileSection/Settings/PersonalInfoPolicy';
import {ConditionsScreen} from './src/screens/ProfileSection/Conditions';
import SystemPermissionsScreen from './src/screens/ProfileSection/SystemPermisions';
import AboutUsScreen from './src/screens/ProfileSection/Settings/AboutUsScreen';
import CopyrightScreen from './src/screens/ProfileSection/Settings/CopyrightScreen';
import LicenseAgreementScreen from './src/screens/ProfileSection/Settings/LicenseAgreementScreen';
import {FavoriteScreen} from './src/screens/ProfileSection/FavoriteScreen';
import ProductDetailScreen from './src/screens/Product/ProductDetailScreen';
import {ProudctReviewsScreen} from './src/screens/Product/ProudctReviewsScreen';
import ChatScreen from './src/screens/Chat/ChatScreen';
import {ProductSearchResultScreen} from './src/screens/Product/ProductSearchResultScreen';
import {AllCategoriesScreen} from './src/screens/categories/AllCategoryScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ChatSettings from './src/screens/Chat/ChatSetting';
import ShopSettings from './src/screens/Chat/ShopSetting';
import {dimensions, recalculateDimensions} from './src/utils/sizes';
import {MyAddressesScreen} from './src/screens/address/MyAddressesScreen';
import {LogoTitle} from './src/components/Header';
import {EditAndAddAddressScreen} from './src/screens/address/EditAndAddAddress';
import {CartConfirmOrderScreen} from './src/screens/Cart/CartConfirmOrderScreen';
import ShopHomeScreen from './src/screens/Shops/ShopHomeScreen';
import {MyOrderScreen} from './src/screens/orders/MyOrders';
import {OrderDetailsScreen} from './src/screens/orders/OrderDetail';
import {ReturnSucessfullyScreen} from './src/screens/orders/ReturnSucessfully';
import {LogisticsScreen} from './src/screens/orders/Logistics';
import {ProductReviewScreen} from './src/screens/orders/ProductReview';
import {ChangeAddressScreen} from './src/screens/address/ChangeAddress';
import {SelectReturnReason} from './src/screens/orders/SelectReturnReson';
import {RefundScreen} from './src/screens/orders/Refund';
import {ReturnAndExchangeScreen} from './src/screens/orders/ReturnAndExchange';
import {ExchangeDetailScreen} from './src/screens/orders/ExchangeDetailScreen';
import {SubscribersScreen} from './src/screens/ProfileSection/Subscribers/SubscribersScreen';
import {WalletScreen} from './src/screens/ProfileSection/WalletScreen';
import {HistoryScreen} from './src/screens/ProfileSection/History';
import {BodyDataScreen} from './src/screens/ProfileSection/BodyDataScreen';
import {EditBodyDataScreen} from './src/screens/ProfileSection/EditBodyDataScreen';
import {HelpAndFeedbackScreen} from './src/screens/ProfileSection/HelpAndFeedback';
import { EditProfileDetailScreen } from './src/screens/ProfileSection/EditProfileDetailScreen';

const Stack = createNativeStackNavigator();


const App: React.FC = () => {
  
  useEffect(() => {
    recalculateDimensions();
   
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView   style={styles.container}>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={RouteNames.welcome}
          screenOptions={{
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 21,
            },
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerShadowVisible: true,
          }}>
          <Stack.Screen
            name={RouteNames.welcome}
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.login}
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.signup}
            component={SignUpScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.main}
            component={MainScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.forgotPassword}
            component={ForgotPasswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.setting}
            component={SettingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.profileDetail}
            component={ProfileDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.viewPhoneNumber}
            component={ViewMobileNumberScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.deleteAccount}
            component={DeleteAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.confirmDeleteAccount}
            component={ConfirmDeleteAccount}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.changePhone}
            component={ChangePhoneScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.changeEmail}
            component={ChangeEmailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.changePassword}
            component={ChangePassswordScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.sucessfulChangePassword}
            component={SucessfulChangePasswordScreen}
          />
          <Stack.Screen
            name={RouteNames.myReviews}
            component={MyReviewsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.notificationSetting}
            component={NotificationSettingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.selectCity}
            component={SelectCity}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.term_of_use}
            component={TermOfUseScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.privacy_policy}
            component={PrivacyPolicyScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.personal_info}
            component={PersonalInfoPolicy}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.conditions}
            component={ConditionsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.system_permission}
            component={SystemPermissionsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.aboutUs}
            component={AboutUsScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.copyright}
            component={CopyrightScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.licenseAgreement}
            component={LicenseAgreementScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.favorite}
            component={FavoriteScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.product_detail}
            component={ProductDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.product_review_screen}
            component={ProudctReviewsScreen}
          />

          <Stack.Screen
            name={RouteNames.chat_screen}
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.product_search_screen}
            component={ProductSearchResultScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.categories}
            component={AllCategoriesScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.chatSetting}
            component={ChatSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.shopSettings}
            component={ShopSettings}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.myAddress}
            component={MyAddressesScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.addAndEditpassword}
            component={EditAndAddAddressScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.cartConfirmOrder}
            component={CartConfirmOrderScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.shopHomeScreen}
            component={ShopHomeScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.myOrder}
            component={MyOrderScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.orderDetails}
            component={OrderDetailsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.refund_details}
            component={ReturnSucessfullyScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.logistic_screen}
            component={LogisticsScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.review}
            component={ProductReviewScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.changeAddress}
            component={ChangeAddressScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.select_return_region}
            component={SelectReturnReason}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.refund}
            component={RefundScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.return_exchange}
            component={ReturnAndExchangeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.exchangeDetail}
            component={ExchangeDetailScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.subscribers_screen}
            component={SubscribersScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.walletScreen}
            component={WalletScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.historyScreen}
            component={HistoryScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.bodyData}
            component={BodyDataScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name={RouteNames.editBodyData}
            component={EditBodyDataScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={RouteNames.help_and_feedback}
            component={HelpAndFeedbackScreen}
            options={{headerShown: false}}
          />
           <Stack.Screen
            name={RouteNames.editProfileDetailScreen}
            component={EditProfileDetailScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
