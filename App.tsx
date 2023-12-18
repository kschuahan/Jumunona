import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RouteNames } from './src/utils/RouteNames';
import { fontFamily } from './src/utils/Fonts';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { colors } from './src/utils/AppColors';
import LoginScreen from './src/screens/signInFlowScreens/LoginScreen';
import SignUpScreen from './src/screens/signInFlowScreens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/signInFlowScreens/ForgotPasswordScreen';
import MainScreen from './src/screens/MainScreen';
import { SettingScreen } from './src/screens/ProfileSection/Settings/Setting';
import ProfileDetailScreen from './src/screens/ProfileSection/ProfileDetailScreen';
import { ViewMobileNumberScreen } from './src/screens/ProfileSection/ViewMobileNumber';
import DeleteAccount from './src/screens/ProfileSection/DeleteAccountScreen';
import ConfirmDeleteAccount from './src/screens/ProfileSection/ConfirmDeleteAccount';
import ChangePhoneScreen from './src/screens/ProfileSection/ChangePhoneScreen';
import ChangeEmailScreen from './src/screens/ProfileSection/ChangeEmailScreen';
import ChangePassswordScreen from './src/screens/ProfileSection/ChangePasswordScree';
import { SucessfulChangePasswordScreen } from './src/screens/ProfileSection/SucessfulChangePassword';
import MyReviewsScreen from './src/screens/Reviews/MyReviewsScreen';
import NotificationSettingScreen from './src/screens/Notification/NotificationSettingScreen';
import TermOfUseScreen from './src/screens/ProfileSection/Settings/TermOfUseScreen';
import { SelectCity } from './src/screens/ProfileSection/SelectCity';
import PrivacyPolicyScreen from './src/screens/ProfileSection/Settings/PrivacyPolicyScreen';
import PersonalInfoPolicy from './src/screens/ProfileSection/Settings/PersonalInfoPolicy';
import { ConditionsScreen } from './src/screens/ProfileSection/Conditions';
import SystemPermissionsScreen from './src/screens/ProfileSection/SystemPermisions';
import AboutUsScreen from './src/screens/ProfileSection/Settings/AboutUsScreen';
import CopyrightScreen from './src/screens/ProfileSection/Settings/CopyrightScreen';
import LicenseAgreementScreen from './src/screens/ProfileSection/Settings/LicenseAgreementScreen';
import { FavoriteScreen } from './src/screens/ProfileSection/FavoriteScreen';
import ProductDetailScreen from './src/screens/Product/ProductDetailScreen';
import { ProudctReviewsScreen } from './src/screens/Product/ProudctReviewsScreen';
import ChatScreen from './src/screens/Chat/ChatScreen';
import { ProductSearchResultScreen } from './src/screens/Product/ProductSearchResultScreen';
import { AllCategoriesScreen } from './src/screens/categories/AllCategoryScreen';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
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
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerShadowVisible: true,
          }}>
          <Stack.Screen
            name={RouteNames.welcome}
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.login}
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.signup}
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.main}
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.forgotPassword}
            component={ForgotPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name={RouteNames.setting} component={SettingScreen} />
          <Stack.Screen
            name={RouteNames.profileDetail}
            component={ProfileDetailScreen}
          />
          <Stack.Screen
            name={RouteNames.viewPhoneNumber}
            component={ViewMobileNumberScreen}
          />
          <Stack.Screen
            name={RouteNames.deleteAccount}
            component={DeleteAccount}
          />
          <Stack.Screen
            name={RouteNames.confirmDeleteAccount}
            component={ConfirmDeleteAccount}
          />
          <Stack.Screen
            name={RouteNames.changePhone}
            component={ChangePhoneScreen}
          />
          <Stack.Screen
            name={RouteNames.changeEmail}
            component={ChangeEmailScreen}
          />
          <Stack.Screen
            name={RouteNames.changePassword}
            component={ChangePassswordScreen}
          />
          <Stack.Screen
            name={RouteNames.sucessfulChangePassword}
            component={SucessfulChangePasswordScreen}
          />
          <Stack.Screen
            name={RouteNames.myReviews}
            component={MyReviewsScreen}
          />
          <Stack.Screen
            name={RouteNames.notificationSetting}
            component={NotificationSettingScreen}
          />
          <Stack.Screen name={RouteNames.selectCity} component={SelectCity} />
          <Stack.Screen
            name={RouteNames.term_of_use}
            component={TermOfUseScreen}
          />
          <Stack.Screen
            name={RouteNames.privacy_policy}
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name={RouteNames.personal_info}
            component={PersonalInfoPolicy}
          />

          <Stack.Screen
            name={RouteNames.conditions}
            component={ConditionsScreen}
          />

          <Stack.Screen
            name={RouteNames.system_permission}
            component={SystemPermissionsScreen}
          />
          <Stack.Screen name={RouteNames.aboutUs} component={AboutUsScreen} />
          <Stack.Screen
            name={RouteNames.copyright}
            component={CopyrightScreen}
          />
          <Stack.Screen
            name={RouteNames.licenseAgreement}
            component={LicenseAgreementScreen}
          />
          <Stack.Screen
            name={RouteNames.favorite}
            component={FavoriteScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={RouteNames.product_detail}
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name={RouteNames.product_review_screen}
            component={ProudctReviewsScreen}
          />

          <Stack.Screen name={RouteNames.chat_screen} component={ChatScreen} />
          <Stack.Screen
            name={RouteNames.product_search_screen}
            component={ProductSearchResultScreen}
          />

          <Stack.Screen
            name={RouteNames.categories}
            component={AllCategoriesScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default App;
