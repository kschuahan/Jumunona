import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../../utils/AppStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import {colors} from '../../utils/AppColors';
import {AppString} from '../../utils/AppStrings';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect} from 'react';
import {RouteNames} from '../../utils/RouteNames';
import {fontFamily} from '../../utils/Fonts';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';

export const ViewMobileNumberScreen = ({navigation, route}) => {
  const isMobile = route.params.isMobile;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: isMobile ? RouteNames.viewPhoneNumber : AppString.mail,

      headerRight: () => (
        <TouchableOpacity style={{alignItems: 'center'}}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{alignItems: 'center'}}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {backgroundColor: colors.white}]}>
        <Text
          style={[
            styles.textStyle,
            {fontSize: 17, alignSelf: 'center', marginTop: 68},
          ]}>
          {isMobile ? AppString.current_phone_number : AppString.current_mail}
        </Text>

        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 24,
              fontWeight: 'bold',
              alignSelf: 'center',
              marginTop: 21,
            },
          ]}>
          {isMobile ? '150******50' : 'Valijon@gmail.com'}
        </Text>

        <TouchableOpacity
          onPress={() => {
            isMobile
              ? navigation.navigate(RouteNames.changePhone)
              : navigation.navigate(RouteNames.changeEmail);
          }}
          style={[styles.loginButton, {marginTop: 59.05}]}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={[colors.startOrange, colors.endOrange]}
            style={styles.buttonGradient}>
            <Text
              style={{
                fontSize: 19,
                color: colors.white,
                fontFamily: fontFamily.regular,
              }}>
              {AppString.change}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[styles.loginButton, styles.greyButton]}>
          <Text
            style={{
              fontSize: 19,
              color: colors.black,
              fontFamily: fontFamily.regular,
              alignSelf: 'center',
            }}>
            {AppString.back}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
