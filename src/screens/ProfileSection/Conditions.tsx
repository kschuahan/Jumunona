import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { styles } from '../../utils/AppStyles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { useEffect } from 'react';
import { RouteNames } from '../../utils/RouteNames';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';

export const ConditionsScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: RouteNames.conditions,

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
        <View
          style={{
            backgroundColor: colors.white,
            paddingHorizontal: 10,
            borderRadius: 13,
          }}>
          <TextWithIcon
            title={AppString.trem_of_use}
            onClick={() => {
              navigation.navigate(RouteNames.term_of_use);
            }}
          />
          <TextWithIcon
            title={AppString.system_permissions}
            onClick={() => {
              navigation.navigate(RouteNames.system_permission);
            }}
          />
          <TextWithIcon
            title={AppString.privacy_policy}
            onClick={() => {
              navigation.navigate(RouteNames.privacy_policy);
            }}
          />
          <TextWithIcon
            title={AppString.pertional_information}
            onClick={() => {
              navigation.navigate(RouteNames.personal_info);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const TextWithIcon = ({ title = AppString.address, padding = 13, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        { marginTop: undefined, alignItems: 'center', paddingVertical: padding },
      ]}>
      <Text style={[styles.textStyle, { fontSize: 16, fontWeight: 'bold' }]}>
        {title}
      </Text>

      <ChevronFwdOutlineIcon height={12} width={12} />
      {/* <Ionicons
        name={'chevron-forward-outline'}
        color={colors.extraGrey}
        size={15}
      /> */}
    </TouchableOpacity>
  );
};
