import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
} from 'react-native';
import { styles } from '../utils/AppStyles';
import { AppString } from '../utils/AppStrings';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/AppColors';
import { fontFamily } from '../utils/Fonts';

import CloseCircleOutline from '../../assets/Icons/CloseCircle.svg';

export const VerifyDeleteAccountDialog = ({
  isShow = false,
  onConfirm,
  onCancel,
}) => {
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
      onRequestClose={onCancel}>
      <View
        style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
        <View style={[styles.bottom_sheet, { paddingHorizontal: 10 }]}>
          <Text
            style={[
              styles.textStyle,
              { marginTop: 10, fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.verify_phone_no}
          </Text>
          <TextInput
            placeholder={AppString.enter_phone}
            style={style.textInput}
            onChangeText={(text: String) => {
              setNumber(text);
            }}
            value={number}
          />
          <Text
            style={[
              styles.textStyle,
              { fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.confirmation_code}
          </Text>

          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder={AppString.enter_sms_code}
              style={style.otpText}
              value={otp}
              onChangeText={(text: String) => {
                setOtp(text);
              }}
            />
            <TouchableOpacity style={style.sendOTPButton}>
              <LinearGradient
                colors={['#FE8C00', '#FC4A1A']}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  style.leftSideGradient,
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 10,
                  },
                ]}>
                <Text
                  style={{
                    color: '#ffffff',
                    paddingLeft: 12,
                    fontSize: 15,
                  }}>
                  {AppString.get_code}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity
              onPress={onCancel}
              style={{ marginVertical: 10, paddingBottom: 16, width: '45%' }}>
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
                    paddingHorizontal: 20,
                    fontFamily: fontFamily.bold,
                  }}>
                  {AppString.cancel}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                marginVertical: 10,
                marginBottom: 16,
                elevation: 4,
                height: 46,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.white,
                borderRadius: 23,
                borderWidth: 1,
                borderColor: colors.lightOrange,
                width: '45%',
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: colors.lightOrange,
                  paddingHorizontal: 20,
                  fontFamily: fontFamily.bold,
                }}>
                {AppString.confirm}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const FailAccDeletePopup = ({ isShow = false, onConfirm, onCancel }) => {
  const [number, setNumber] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
      onRequestClose={onCancel}>
      <View
        style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )' }]}>
        <View
          style={[
            styles.bottom_sheet,
            {
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignContent: 'center',
            },
          ]}>
          <Text
            style={[
              styles.textStyle,
              {
                paddingVertical: 9,
                fontWeight: '500',
                fontSize: 20,
                textAlign: 'center',
              },
            ]}>
            {AppString.failed_to_delete_acc}
          </Text>
          <Text style={[styles.textStyle, { paddingBottom: 20, fontSize: 14 }]}>
            {AppString.failed_acc_delete_reason}
          </Text>
        </View>
        <Pressable onPress={onCancel} style={{ paddingTop: 22 }}
        >
          <CloseCircleOutline
            width={31}
            height={31}
            color={colors.white}
          />
        </Pressable>
      </View>
    </Modal>
  );
};





export const ClearChatPopup = ({ isShow = false, onConfirm, onCancel }) => {


  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
    
      onRequestClose={onCancel}>
      <View
        style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .3 )' }]}>
        <View
          style={[
            styles.bottom_sheet,
            {
              justifyContent: 'center',
              alignContent: 'center',
              width: '82%'
            },
          ]}>
          <Text
            style={[
              styles.textStyle,
              {
                paddingVertical: 13,
                paddingBottom: 8,
                fontSize: 17,
                textAlign: 'center',
              },
            ]}>
            {AppString.sure}
          </Text>

          <Text
            style={[
              styles.textStyle,
              {
                paddingBottom: 20,
                fontSize: 13,
                textAlign: 'center',
                paddingHorizontal: 4
              },
            ]}>
            {AppString.recovery_after_cleaning_is_not_posible}
          </Text>

          <View
            style={{ height: 1, backgroundColor: '#CFCFCF' }}
          />

          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>

            <TouchableOpacity onPress={onConfirm} style={{ justifyContent: 'center', alignItems: 'center', flex: 0.5 }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 18,
                    color: '#4A78E8'
                  },
                ]}>
                {AppString.yes}
              </Text>
            </TouchableOpacity>
            <View
              style={{ height: '100%', width: 1, backgroundColor: '#CFCFCF' }}
            />
            <TouchableOpacity onPress={onCancel} style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 11, flex: 0.5 }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 18,
                    color: '#4A78E8'

                  },
                ]}>
                {AppString.no}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </Modal>
  );
};
const style = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: 34,
    borderRadius: 24,
    marginVertical: 10,
    padding: 10,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  leftSideGradient: {
    width: '40%',
    height: 34,
    borderRadius: 24,
  },
  sendOTPButton: {
    width: '100%',
    height: 34,
    borderRadius: 24,
    marginLeft: -115,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 20,
  },
  otpText: {
    width: '65%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    height: 34,
    borderRadius: 24,
    marginVertical: 10,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
});
