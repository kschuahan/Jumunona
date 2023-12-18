import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { styles } from '../../../utils/AppStyles';
import { imagesUrl } from '../../../utils/AppIcons';
import { colors } from '../../../utils/AppColors';
import { AppString } from '../../../utils/AppStrings';
import { useEffect } from 'react';
import { RouteNames } from '../../../utils/RouteNames';
import { fontFamily } from '../../../utils/Fonts';
import EllipsisHorizontal from '../../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutline from '../../../../assets/Icons/chevronForwardOutline.svg';

export const SettingScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: RouteNames.setting,

      headerRight: () => (
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ alignItems: 'center' }}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Profile
          onClick={() => {
            navigation.navigate(RouteNames.profileDetail);
          }}
        />
        <View
          style={{
            backgroundColor: colors.white,
            paddingStart: 12.5,
            paddingEnd: 16.96,
            paddingTop: 2.5,
            marginTop: 9,
            borderRadius: 13,
            paddingBottom: 3,
          }}>
          <TextWithIcon
            padding={13}
            title={AppString.notifications}
            onClick={() => {
              navigation.navigate(RouteNames.notificationSetting);
            }}
          />
          <TextWithIcon
            padding={13}
            title={AppString.city}
            onClick={() => {
              navigation.navigate(RouteNames.selectCity);
            }}
          />
          <TextWithIcon
            padding={13}
            title={AppString.feedback_and_help}
            onClick={() => { }}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 12.5,
            marginTop: 9,
            borderRadius: 13,
            paddingBottom: 3,
            paddingEnd: 16.96,
            paddingTop: 1.5,
          }}>
          <TextWithIcon
            padding={14.25}
            title={AppString.trem_and_privacy}
            onClick={() => {
              navigation.navigate(RouteNames.conditions);
            }}
          />
          <TextWithIcon
            padding={13.75}
            title={AppString.about_us}
            onClick={() => {
              navigation.navigate(RouteNames.aboutUs);
            }}
          />
          <TextWithIcon
            padding={14}
            title={AppString.clear_catch}
            onClick={() => { }}
          />
          <TextWithIcon
            padding={11}
            title={AppString.catch_for_update}
            onClick={() => { }}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            paddingTop: 15.5,
            paddingBottom: 11.5,
            marginTop: 9,
            borderRadius: 13,
          }}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: RouteNames.login }],
                      });
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
            style={[
              styles.profile,
              {
                marginTop: undefined,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
              },
            ]}>
            <Text
              style={[
                styles.textStyle,
                { fontSize: 16, fontWeight: '500', fontFamily: undefined },
              ]}>
              {AppString.go_out}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const Profile = ({ onClick }) => {
  return (
    <View
      style={{ backgroundColor: colors.white, borderRadius: 13, marginTop: 9 }}>
      <View>
        <TouchableOpacity onPress={onClick}>
          <View
            style={[
              styles.profile,
              { alignItems: 'center', marginTop: undefined, padding: 10 },
            ]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5,
                marginStart: 4,
                marginEnd: 6.96,
              }}>
              <Image
                source={{ uri: imagesUrl.profile }}
                style={{ height: 60, width: 60, borderRadius: 35 }}
              />
              <View style={{ paddingHorizontal: 10, gap: 9.5 }}>
                <Text
                  style={[
                    styles.textStyle,
                    { fontSize: 16, fontWeight: 'bold', color: colors.balc111111 },
                  ]}>
                  User name
                </Text>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color: colors.grey,
                      fontSize: 12,
                      fontWeight: '500',
                      fontFamily: fontFamily.regular,
                    },
                  ]}>
                  nickname123
                </Text>
              </View>
            </View>

            <ChevronFwdOutline
              color={colors.extraGrey}
              width={12}
              height={12}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 1,
            backgroundColor: colors.darkWhite,
            marginTop: 4.92,
          }}
        />
        <View style={{ paddingHorizontal: 13, paddingBottom: 6 }}>
          <TextWithIcon
            title={AppString.my_addresses}
            padding={10}
            onClick={() => { }}
          />
        </View>
      </View>
    </View>
  );
};

const TextWithIcon = ({ title = AppString.address, padding = 10, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        { marginTop: undefined, alignItems: 'center', paddingVertical: padding },
      ]}>
      <Text
        style={[
          styles.textStyle,
          { fontSize: 16, fontWeight: '400', fontFamily: fontFamily.regular },
        ]}>
        {title}
      </Text>
      <ChevronFwdOutline width={12} height={12} />
    </TouchableOpacity>
  );
};
