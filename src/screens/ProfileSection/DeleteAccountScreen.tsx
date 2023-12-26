import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { RouteNames } from '../../utils/RouteNames';
import { styles } from '../../utils/AppStyles';
import { AppString } from '../../utils/AppStrings';
import { fontFamily } from '../../utils/Fonts';
import { colors } from '../../utils/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import { refresh } from '@react-native-community/netinfo';
import { ScrollView } from 'react-native-virtualized-view';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';

import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { CustomHeader } from '../../components/Header';

const DeleteAccount = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: RouteNames.deleteAccount,
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

  const reaonseArray = [
    { title: AppString.need_to_turn_off_your_phone, isSelected: false },
    { title: AppString.need_to_turn_off_email, isSelected: false },
    { title: AppString.security_privacy, isSelected: false },
    { title: AppString.addition_account, isSelected: false },
    { title: AppString.difficulty_with_shopping, isSelected: false },
    { title: AppString.other, isSelected: false },
  ];

  const [reasonString, setReasonString] = useState<String>();
  const [reasonItems, setReasonItems] = useState(reaonseArray);
  const [selectedIndex, setSelectedIndex] = useState<Number>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={RouteNames.deleteAccount} />

      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: 5 }]}>
          <Header />
          {reasonItems.map((item, index) => (
            <View>
              <ReasonCell
                item={item}
                index={index}
                onSelect={(index: number) => {
                  reasonItems[index].isSelected = !reasonItems[index].isSelected;

                  if (selectedIndex != undefined) {
                    if (selectedIndex == index) {
                      setSelectedIndex(undefined);
                    } else {
                      reasonItems[selectedIndex].isSelected = false;
                      setSelectedIndex(index);
                    }
                  } else {
                    setSelectedIndex(index);
                  }
                  setReasonItems(reasonItems);
                  setIsRefreshing(!isRefreshing);
                }}
              />
              <Separator />
            </View>
          ))}

          <FooterView
            value={reasonString}
            onChangeText={(text: string) => {
              setReasonString(text);
            }}
            onDelete={() => {
              navigation.navigate(RouteNames.confirmDeleteAccount);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
const Header = ({ }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
      }}>
      <Text
        style={[
          styles.textStyle,
          {
            fontWeight: '500',
            fontSize: 20,
            paddingTop: 15,
            paddingBottom: 10,
            paddingHorizontal: 11.5,
            color: colors.black121212,
          },
        ]}>
        {AppString.please_select_a_reason}
      </Text>
    </View>
  );
};

const ReasonCell = ({ item, index, onSelect }) => {
  return (
    <Pressable
      onPress={() => {
        onSelect(index);
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 15,
          paddingHorizontal: 11,
          backgroundColor: colors.white,
        }}>
        <Text
          style={[
            styles.textStyle,
            {
              fontSize: 16,
              color: colors.black121212,
              width: '90%'
            },
          ]}>
          {item.title}
        </Text>

        {item.isSelected ? (
          <CheckmarkCircle width={22} height={22} color={colors.lightOrange} />
        ) : (
          <EllipsisHorizontalNormal width={22} height={22} />
        )}
        {/* <Ionicons
          name={item.isSelected ? 'checkmark-circle' : 'ellipse-outline'}
          size={25}
          color={item.isSelected ? colors.startOrange : '#CECECE'}
        /> */}
      </View>
    </Pressable>
  );
};

const Separator = () => {
  return <View style={{ height: 1, backgroundColor: colors.darkWhite }} />;
};

const FooterView = ({ value, onChangeText, onDelete }) => {
  return (
    <View style={{}}>
      <TextInput
        style={[
          styles.textStyle,
          {
            textAlignVertical: 'top',
            height: 75,
            padding: 8,
            fontFamily: fontFamily.regular,
            fontSize: 16,
            backgroundColor: colors.white,
            borderBottomLeftRadius: 13,
            borderBottomRightRadius: 13,
            borderWidth: 1,
            borderColor: colors.lightOrange,
          },
        ]}
        placeholder={AppString.please_provide_a_reason}
        placeholderTextColor={colors.grey979797}
        value={value}
        multiline={true}
        numberOfLines={5}
        editable={true}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={() => {
          onDelete();
        }}
        style={{ paddingTop: 14 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#FE8C00', '#FC4A1A']}
          style={{
            elevation: 4,
            height: 46,
            marginHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 23,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors.white,
              fontWeight: 'bold',
            }}>
            {AppString.next_step}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  iconStyle: {
    borderRadius: 12.5,
  },
});

export default DeleteAccount;
