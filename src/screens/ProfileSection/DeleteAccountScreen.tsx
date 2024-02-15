import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
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
import { AsyncStorage } from 'react-native';
import { AsyncStorageKeys } from '../../utils/AsyncStorage';
import { deleteAPICall } from '../../Netowork/Apis';
import { ProfileAPIs } from '../../Netowork/Constants';

const DeleteAccount = ({ navigation }) => {

  const reaonseArray = [
    { title: AppString.need_to_turn_off_your_phone, isSelected: false },
    { title: AppString.need_to_turn_off_email, isSelected: false },
    { title: AppString.security_privacy, isSelected: false },
    { title: AppString.addition_account, isSelected: false },
    { title: AppString.difficulty_with_shopping, isSelected: false },
    { title: AppString.other, isSelected: false },
  ];

  const [reasonItems, setReasonItems] = useState(reaonseArray);
  const [selectedIndex, setSelectedIndex] = useState<Number>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  var reason = ""
  
  const validate = () => {
    var isValid = true
    if (selectedIndex == undefined) {
      Alert.alert('', "Please select the reason.")
      isValid = false
    } else if(selectedIndex == reasonItems.length - 1 && reason.length == 0) {
      Alert.alert('', "Please describe the reason.")
      isValid = false
    }
    return isValid
  }

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
                  if(index != reasonItems.length - 1) {
                    reason = ""
                  }
                  reasonItems[index].isSelected = true
                  if (selectedIndex != undefined) {
                    if (selectedIndex != index) {
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
          showTextInput={ selectedIndex == reasonItems.length - 1 }
          setText={ (text: string) => {
            reason = text
            console.warn(reason)
          }}
            onDelete={() => {
              if (validate()) {
              navigation.navigate(RouteNames.confirmDeleteAccount, {deleteAccReason: selectedIndex == reasonItems.length - 1 ? reason : reasonItems[selectedIndex]});
              }
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

const FooterView = ({showTextInput, setText, onDelete }) => {

  const [reasonString, setReasonString] = useState('');

  return (
    <View style={{paddingBottom: 400}}>
      {showTextInput ?
      <TextInput
        style={[
          styles.textStyle,
          {
            textAlignVertical: 'top',
            minHeight: 75,
            maxHeight: 120,
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
        value={reasonString}
        multiline={true}
        numberOfLines={5}
        editable={true}
        onChangeText={ (text) => {
          setReasonString(text)
          setText(text)
        }}
      /> : null }
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
