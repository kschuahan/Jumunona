import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from '../../utils/AppStyles';
import {imagesUrl} from '../../utils/AppIcons';
import {colors} from '../../utils/AppColors';
import {AppString} from '../../utils/AppStrings';
import {RouteNames} from '../../utils/RouteNames';
import {fontFamily} from '../../utils/Fonts';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';

const ProfileDetailScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: RouteNames.setting,
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
          <ChevronBackOutline width={15} height={15}/>
        </TouchableOpacity>
      ),
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <UserAvatar onClick={() => {}} />
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 3,
            marginTop: 10,
            borderRadius: 13,
            paddingTop: 5,
            paddingBottom: 1.16,
          }}>
          <TextWithIcon
            title={AppString.name}
            value={'Valijon'}
            onClick={() => {}}
          />
          <View style={{height: 1, backgroundColor: colors.darkWhite}} />

          <TextWithIcon
            title={AppString.gender}
            value={'Мужской'}
            onClick={() => {}}
          />
          <View style={{height: 1, backgroundColor: colors.darkWhite}} />

          <TextWithIcon
            title={AppString.age}
            value={'1992'}
            onClick={() => {}}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            paddingVertical: 10,
            paddingHorizontal: 3,
            marginTop: 10,
            borderRadius: 13,
            paddingBottom: 1.16,
          }}>
          <TextWithIcon
            title={AppString.number}
            value={'150******50'}
            onClick={() => {
              navigation.navigate(RouteNames.viewPhoneNumber, {isMobile: true});
            }}
          />
          <View style={{height: 1, backgroundColor: colors.darkWhite}} />
          <TextWithIcon
            title={AppString.mail}
            value={'Valijon@gmail.com'}
            onClick={() => {
              navigation.navigate(RouteNames.viewPhoneNumber, {
                isMobile: false,
              });
            }}
          />
          <View style={{height: 1, backgroundColor: colors.darkWhite}} />
          <TextWithIcon
            title={AppString.change_password}
            onClick={() => {
              navigation.navigate(RouteNames.changePassword);
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            paddingTop: 15.5,
            paddingBottom: 11.5,
            marginTop: 10,
            borderRadius: 13,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(RouteNames.deleteAccount);
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
                {fontSize: 16, fontFamily: undefined, fontWeight: '500'},
              ]}>
              {AppString.delete_account}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const UserAvatar = ({onClick}) => {
  return (
    <View style={{borderRadius: 13, backgroundColor: colors.white}}>
      <View style={[style.userAvatar]}>
        <Image
          source={{uri: imagesUrl.profile}}
          style={{height: 111, width: 111, borderRadius: 56}}
        />
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 15,
              fontFamily: fontFamily.regular,
              paddingTop: 10,
              paddingBottom: 14,
              color: colors.lightOrange,
            },
          ]}>
          Изменить
        </Text>
      </View>
    </View>
  );
};

const TextWithIcon = ({title = AppString.address, value = '', onClick}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: undefined,
          alignItems: 'center',
          paddingStart: 17,
          paddingEnd: 16.96,
          paddingBottom: 10.84,
          paddingTop: 15,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {fontSize: 14, fontWeight: '500', color: colors.black121212},
        ]}>
        {title}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 14,
              fontWeight: '500',
              color: colors.grey888888,
              paddingEnd: 4,
            },
          ]}>
          {value}
        </Text>
        <ChevronFwdOutlineIcon
          color={colors.greyCCCCCC}
          width={12}
          height={12}
        />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  userAvatar: {
    flexDirection: 'column',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileDetailScreen;
