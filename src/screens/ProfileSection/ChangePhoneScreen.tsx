import LinearGradient from 'react-native-linear-gradient';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import { fontFamily } from '../../utils/Fonts';
import { CustomHeader } from '../../components/Header';
import React from 'react';
import { postAPICall } from '../../Netowork/Apis';
import { AuthAPIs, ProfileAPIs } from '../../Netowork/Constants';
import { AlertWithConirm, CenterProgressView } from '../../components/Dialogs';

const ChangePhoneScreen = ({ navigation, route }) => {


 const data = route.params.data;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.change_phone_number,
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

  const [mobileErr, setMobileErr] = useState('');
  const [otpErr, setOtpErr] = useState('');
  const [loading, setLoading] = useState(false)
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');


  const validate = () => {
    var isValid = true
    if (mobile.length < 10) {
      setMobileErr("Enter valid mobile no.")
      isValid = false
      return isValid
    } else {
      setMobileErr('')
    }
    if (otp.length < 6) {
      setOtpErr("Enter valid OTP.")
      isValid = false
      console.warn(otpErr)
      return isValid
    } else {
      setOtpErr('')
    }
    return isValid
  }

  const SendOtp = () => {
    if (mobile.length < 10 || isNaN(mobile)) {
      setMobileErr("Enter valid mobile no.")
    } else {
      setMobileErr('')
      setLoading(true)
      postAPICall(
        {
          phoneNumber: '91' + mobile,
          isRegister:true
        },
        AuthAPIs.sendOtp,
        false,
        (res: any) => {
          Alert.alert(res.data.message ? res.data.message : res.data)
          setLoading(false)
        }
      )
    }
  }

  const chageMobile = () => {
    setLoading(true)
      postAPICall(
        {
        newNumber: "91" + mobile,
        otp: otp,
      }, 
      ProfileAPIs.changePhoneNumber,
      true,
      (res: any) => {
        if (res.isSuccess) {
          setLoading(false)
          AlertWithConirm("", res.data.message, () => {
            navigation.goBack()
          })
        } else {
          Alert.alert(res.data.message ? res.data.message : res.data.toString())
        }
      }
      )
  }
  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={AppString.change_phone_number} />
      <ScrollView>
        <View
          style={[
            style.container,
            { backgroundColor: colors.white, borderRadius: 13, marginTop: 6, paddingTop: 6 },
          ]}>
          <Text
            style={[
              styles.textStyle,
              { marginBottom: 8, fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.enter_new_number}
          </Text>
          <View style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row' }}>
              <LinearGradient
                colors={['#ff7600', '#ffc500']}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: '24%',
                  height: 34,
                  borderRadius: 24,
                }}>
                <Text style={style._992}>+992</Text>
              </LinearGradient>

              <TextInput
                placeholder={AppString.enter_your_new_nubmer}
                style={style.mobileTextInput}
                value={mobile}
                onChangeText={text => {
                  setMobile(text);
                }}></TextInput>
            </View>
            {
              mobileErr.length > 0
                ? <Text
                  style={{
                    color: colors.lightRed,
                    fontSize: 14,
                    fontWeight: '400',
                    paddingStart: 8
                  }}>
                  {mobileErr}
                </Text>
                : null
            }
          </View>
          <Text
            style={[
              styles.textStyle,
              { marginBottom: 8, fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.confirmation_code}
          </Text>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeholder={AppString.enter_new_number}
                style={style.passwordTextInput}
                value={otp}
                onChangeText={text => {
                  setOtp(text);
                }}></TextInput>
              <TouchableOpacity
                style={{
                  width: '35%',
                  height: 34,
                  paddingLeft: 8,
                  marginLeft: -30,
                  opacity: mobile.length == 0 ? 0.5 : 1,
                }}
                onPress={() => { 
                  SendOtp()
                }}
                disabled={mobile.length == 0}>
                <LinearGradient
                  colors={['#FE8C00', '#FC4A1A']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ flex: 1, borderRadius: 24 }}>
                  <Text style={style._992}>{AppString.get_code}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            {
              otpErr.length > 0
                ? <Text
                  style={{
                    color: colors.lightRed,
                    fontSize: 14,
                    fontWeight: '400',
                    paddingStart: 8
                  }}>
                  {otpErr}
                </Text>
                : null
            }
          </View>
        </View>

        <TouchableOpacity onPress={() => {
            if (validate()) {
              chageMobile()
            }
         }} style={style.loginButton}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FE8C00', '#FC4A1A']}
            style={styles.buttonGradient}>
            <Text
              style={{ fontSize: 18, color: '#fff', fontFamily: fontFamily.bold }}>
              {AppString.confirm}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
      <CenterProgressView isShow={loading} /> 
    </View>
  );
};

export default ChangePhoneScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 14,
    margin: 10,
  },
  _992: {
    color: '#ffffff',
    paddingTop: 7,
    paddingLeft: 4,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  mobileTextInput: {
    width: '84%',
    backgroundColor: '#f5f5f5',
    height: 34,
    borderRadius: 24,
    marginLeft: -30,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    paddingVertical: 0
  },
  passwordTextInput: {
    width: '73%',
    backgroundColor: '#f5f5f5',
    height: 34,
    borderTopLeftRadius: 24,
    borderBottomLeftRadius: 24,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  loginButton: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 12,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    fontFamily: fontFamily.bold,
  },
  buttonGradient: {
    elevation: 4,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
});
