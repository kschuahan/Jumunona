import { TouchableOpacity, View, Text, Pressable } from 'react-native';
import { styles } from '../../utils/AppStyles';
import { useEffect, useState } from 'react';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { ScrollView } from 'react-native-virtualized-view';
import LinearGradient from 'react-native-linear-gradient';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import {
  FailAccDeletePopup,
  VerifyDeleteAccountDialog,
} from '../../components/Dialogs';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import { fontFamily } from '../../utils/Fonts';

const ConfirmDeleteAccount = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.deleting_an_account,
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

  const [agreeToTnC, setAgreeToTnC] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showFailurePop, setShowFailurePop] = useState(false);
  return (
    <ScrollView style={[styles.container]} showsVerticalScrollIndicator={false}>
      <TitleDesciptionView
        title={AppString.by_deleting_you_waive_rights_Title}
        desc={AppString.by_deleting_you_waive_rights_Desc}
      />
      <TitleDesciptionView
        title={AppString.the_following_conditions_must_be_met_Title}
        desc={AppString.the_following_conditions_must_be_met_Desc}
        color={colors.balc111111}
      />
      <AgreeTermsVew
        isSelected={agreeToTnC}
        onSelect={() => {
          setAgreeToTnC(!agreeToTnC);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          setShowConfirm(true);
        }}
        style={{ paddingBottom: 100 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#FE8C00', '#FC4A1A']}
          style={{
            elevation: 4,
            height: 46,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 23,
          }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.white,
              fontFamily: fontFamily.bold,
            }}>
            {AppString.confirm_delete}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <VerifyDeleteAccountDialog
        isShow={showConfirm}
        onConfirm={() => {
          setShowConfirm(false);
          setShowFailurePop(true);
        }}
        onCancel={() => {
          setShowConfirm(false);
        }}
      />

      <FailAccDeletePopup
        isShow={showFailurePop}
        onConfirm={() => {
          setShowFailurePop(false);
        }}
        onCancel={() => {
          setShowFailurePop(false);
        }}
      />
    </ScrollView>
  );
};

const TitleDesciptionView = ({ title, desc, color = colors.grey6C6C6C }) => {
  return (
    <View style={{ paddingVertical: 14 }}>
      <Text
        style={{
          fontSize: 15,
          color: colors.lightOrange,
          fontWeight: '500',
          paddingBottom: 11,
        }}>
        {title}
      </Text>
      <View
        style={{ backgroundColor: colors.white, borderRadius: 13, padding: 10 }}>
        <Text style={{ fontSize: 14, lineHeight: 25, color: color }}>
          {desc}
        </Text>
      </View>
    </View>
  );
};

const AgreeTermsVew = ({ isSelected, onSelect }) => {
  return (
    <Pressable onPress={onSelect}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        {isSelected ? (
          <CheckmarkCircle width={17} height={17} color={colors.lightOrange} />
        ) : (
          <EllipsisHorizontalNormal width={17} height={17} color={'#6C6C6C'} />
        )}
        {/* <Ionicons
          name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
          size={25}
          color={isSelected ? colors.lightOrange : '#6C6C6C'}
        /> */}
        <Text style={{ fontSize: 14, color: '#6C6C6C', marginStart: 5 }}>
          {AppString.i_have_read_and_agree_to_the_cancellation_terms}
        </Text>
      </View>
    </Pressable>
  );
};
export default ConfirmDeleteAccount;
