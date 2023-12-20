import React, { useEffect } from 'react';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { AppString } from '../../../utils/AppStrings';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../utils/AppStyles';
import { colors } from '../../../utils/AppColors';
import { appIcons } from '../../../utils/AppIcons';
import { fontFamily } from '../../../utils/Fonts';
import { ScrollView } from 'react-native-virtualized-view';

import EllipsisHorizontal from '../../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../../assets/Icons/chevronBackOutline.svg';
import HomeFocusedIcon from '../../../../assets/Icons/home-focused.svg';
import ChevronFwdOutline from '../../../../assets/Icons/chevronForwardOutline.svg';
import { CustomHeader } from '../../../components/Header';
import AboutUs from '../../../../assets/Icons/AboutUs.svg';

export const AboutUsScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.about_us,

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
    <View style={[styles.container, {
      padding: 0, backgroundColor: colors.white,
    }]}>
      <CustomHeader navigation={navigation} title={AppString.about_us} />

      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            marginTop: 3,
            paddingTop: 6
          },
        ]}>
        <AppDetailView />
        <EstimateView onClick={() => { }} />
        <DescriptionView />
      </View>
    </View>
  );
};

const AppDetailView = ({ }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
      }}>
      <AboutUs style={{ marginTop: 50 }} />
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: colors.black,
          fontFamily: fontFamily.bold,
          marginTop: 12,
        }}>
        {AppString.AppName}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fontFamily.regular,
          paddingTop: 0,
          paddingBottom: 6,
          color: '#090909',
        }}>
        Version 1.0.1
      </Text>
    </View>
  );
};
const EstimateView = ({ onClick }) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        marginTop: 27,
        paddingLeft: 4,
        marginRight: -10,
      }}>
      <Separator />
      <TextWithIcon onClick={onClick} />
      <Separator />
    </View>
  );
};

const Separator = () => {
  return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />;
};

const TextWithIcon = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: undefined,
          alignItems: 'center',
          paddingVertical: 16,
          paddingRight: 10,
        },
      ]}>
      <Text
        style={[styles.textStyle, { fontSize: 16, fontFamily: fontFamily.bold }]}>
        {AppString.estimate}
      </Text>
      <ChevronFwdOutline color="#2E2E2E" width={15} height={15} />
    </TouchableOpacity>
  );
};

const DescriptionView = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fontFamily.bold,
          marginTop: 30,
          color: colors.black,

        }}>
        Brief introduction about the company {'\n'}
        Brief introduction of the company{'\n'}
        {'\n'}A brief introduction to the company's transportation{'\n'}
        Brief introduction of company transportation{'\n'}
        {'\n'}A brief introduction to company protection{'\n'}
        Brief introduction of company guarantee
      </Text>
    </ScrollView>
  );
};

export default AboutUsScreen;
