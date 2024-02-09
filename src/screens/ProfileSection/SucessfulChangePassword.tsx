import { Text, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import React from 'react';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { useEffect } from 'react';
import { RouteNames } from '../../utils/RouteNames';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import { CustomHeader } from '../../components/Header';

export const SucessfulChangePasswordScreen = ({ navigation }) => {

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerRight: () => (
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: RouteNames.main }],
            });
          }}
          style={{ alignItems: 'center' }}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#F6F6F6',
      },

      headerShadowVisible: false,
    });
  });


  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: RouteNames.main }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (

    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, { backgroundColor: '#F6F6F6' }]}>
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 10,
            borderRadius: 17,
          }}>
          <View style={{ alignSelf: 'center', marginTop: 21, marginBottom: 14 }}>
            <CheckmarkCircle width={55} height={55} color={colors.endOrange} />
          </View>

          <Text
            style={[
              styles.textStyle,
              { fontSize: 23, fontWeight: '700', alignSelf: 'center' },
            ]}>
            {AppString.sucessfully_changed}
          </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: RouteNames.main }],
              });
            }}
            style={{
              marginTop: 52,
              marginBottom: 21,
              borderColor: colors.greyCECECE,
              borderWidth: 0.8,
              height: 30,
              justifyContent: 'center',
              marginHorizontal: 77,
              borderRadius: 15,
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 13,
                  alignSelf: 'center',
                  color: colors.black666666,
                },
              ]}>
              {AppString.go_back_to_the_main_page}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
