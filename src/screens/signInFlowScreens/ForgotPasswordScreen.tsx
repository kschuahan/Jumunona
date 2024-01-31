import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../utils/navigations';
import { colors } from '../../utils/AppColors';
import AboutUs from '../../../assets/Icons/AppLogo.svg';
import { postAPICall } from '../../Netowork/Apis';
import { AuthAPIs } from '../../Netowork/Constants';
import { CenterProgressView } from '../../components/Dialogs';



type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgotPassword"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface ForgotPasswordScreenProps {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [mobile, setMobile] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [mobileErr, setMobileErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
  const [loading, setLoading] = useState(false)
  const [otpErr, setOTPErr] = useState('');

  const validate = () => {
    var isValid = true
    if (mobile.length < 10) {
      setMobileErr("Enter valid mobile no.")
      isValid = false
    } else {
      setMobileErr('')
    }
    if (password.length < 8) {
      setPassErr("Enter valid password.")
      isValid = false
    } else {
      setPassErr('')
    }
    if (rePassword != password) {
      setConfirmPassErr("Password does not match.")
      isValid = false
    } else {
      setConfirmPassErr('')
    }
    if (confirmationCode.length < 6) {
      setOTPErr("Enter a valid OTP")
      isValid = false
    } else {
      setOTPErr('')
    }
    return isValid
  }

  const resetPass = () => {

    if (validate()) {
      setLoading(true)
      postAPICall(
        {
          phoneNumber: '91' + mobile,
          password: password,
          confirmPassword: rePassword,
          otp: confirmationCode,
        },
        AuthAPIs.forgotPassword,
        false,
        (res: any) => {
          Alert.alert(res.data.message ? res.data.message : res.data)
          if (res.isSuccess) {
            Alert.alert(res.data.message ? res.data.message : res.data, "",  [{text: 'OK', onPress: () => { navigation.replace('Login');}}])
          } else {
            Alert.alert(res.data.message ? res.data.message : res.data)
          }
          setLoading(false)
        }
      )
    }
  }

  const SendOtp = () => {
    if (mobile.length < 10) {
      setMobileErr("Enter valid mobile no.")
    } else {
      setMobileErr('')
      setLoading(true)
      postAPICall(
        {
          phoneNumber: '91' + mobile
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

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.registerText}>Восстановление пароля</Text>
          <AboutUs
            style={{ marginTop: 40, borderRadius: 24 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "SegoeUIBold",
              color: "#FF7600",
              paddingTop: 4,
              textAlign: 'center'
            }}
          >
            Jumunona
          </Text>
        </View>
        <View style={styles.middle}>
          <View style={{ marginHorizontal: 12 }}>
            <View style={{ paddingBottom: 13, width: '100%' }}>
              <View
                style={{ flexDirection: 'row', width: '100%', }}>
                <LinearGradient
                  colors={['#ff7600', '#ffc500']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.leftSideGradient}>
                  <Text style={styles._992}>+992</Text>
                </LinearGradient>

                <TextInput
                  placeholder="Введите ваш номер телефона"
                  style={styles.mobileTextInput}
                  onChangeText={text => {
                    setMobile(text);
                  }}
                  value={mobile}></TextInput>
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

            <View style={{ paddingBottom: 13, width: '100%' }}>
              <View
                style={{ flexDirection: 'row', width: '100%' }}>
                <LinearGradient
                  colors={['#ff7600', '#ffc500']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.leftSideGradient}>
                  <Text style={styles.otpText}>Код</Text>
                </LinearGradient>

                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TextInput
                    placeholder="Введите SMS-код"
                    style={styles.codeTextInput}
                    onChangeText={text => {
                      setConfirmationCode(text);
                    }}
                    value={confirmationCode}
                  />
                  <TouchableOpacity style={styles.sendOTPButton} onPress={() => {
                    SendOtp()
                  }}>
                    <LinearGradient
                      colors={['#ff7600', '#ffc500']}
                      start={{ x: 0.4, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={[
                        styles.leftSideGradient,
                        {
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingRight: 10,
                          width: undefined
                        },
                      ]}>
                      <Text
                        style={{
                          color: '#ffffff',
                          paddingLeft: 12,
                          fontSize: 14,
                          fontWeight: '400'
                        }}>
                        Получить код
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
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


            <View style={{ paddingBottom: 13, width: '100%' }}>

              <View
                style={{ flexDirection: 'row', width: '100%', }}>
                <LinearGradient
                  colors={['#ff7600', '#ffc500']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.leftSideGradient}>
                  <Text style={styles.passwordText}>Пароль</Text>
                </LinearGradient>

                <TextInput
                  placeholder="Придумайте свой пароль"
                  style={styles.passwordTextInput}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}></TextInput>
              </View>
              {
                passErr.length > 0
                  ? <Text
                    style={{
                      color: colors.lightRed,
                      fontSize: 14,
                      fontWeight: '400',
                      paddingStart: 8
                    }}>
                    {passErr}
                  </Text>
                  : null
              }
            </View>

            <View style={{ paddingBottom: 13, width: '100%' }}>

              <View
                style={{ flexDirection: 'row', width: '100%', }}>
                <LinearGradient
                  colors={['#ff7600', '#ffc500']}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.leftSideGradient}>
                  <Text style={styles.passwordText}>Пароль</Text>
                </LinearGradient>

                <TextInput
                  placeholder="Введите пароль ещё раз"
                  style={styles.passwordTextInput}
                  onChangeText={text => {
                    setRePassword(text);
                  }}
                  value={rePassword}></TextInput>
              </View>
              {
                confirmPassErr.length > 0
                  ? <Text
                    style={{
                      color: colors.lightRed,
                      fontSize: 14,
                      fontWeight: '400',
                      paddingStart: 8
                    }}>
                    {confirmPassErr}
                  </Text>
                  : null
              }
            </View>
          </View>
        </View>
        <View style={styles.termsText}></View>
        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => {resetPass() }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={["#FE8C00", "#ff7600"]}
              style={[styles.loginButtonGradient, { marginBottom: 13 }]}
            >
              <Text style={styles.signuploginText}>Подтвердить</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("Login");
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#FFE259', '#FDCB32', '#FDCA30']}
              style={styles.loginButtonGradient}
            >
              <Text style={[styles.signuploginText, { color: colors.black }]}>Войти</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loading ? <CenterProgressView /> : null}
    </View>

  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center'
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 23.5,
    paddingBottom: 48,
  },
  registerText: {
    fontSize: 21,
    fontWeight: '400',
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 27,
    color: colors.black
  },
  middle: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: colors.white,
    borderRadius: 17,
    width: 359,
    paddingTop: 13
  },
  bottom: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    paddingTop: 32,
    marginHorizontal: 32,
  },
  _992: {
    color: "#fff",
    paddingTop: 7,
    paddingLeft: 8,
    fontSize: 14,
    fontWeight: '400'
  },
  leftSideGradient: {
    width: "40%",
    height: 34,
    borderRadius: 24,
  },
  mobileTextInput: {
    width: "87%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
    paddingVertical: 0

  },
  otpText: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 8,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  codeTextInput: {
    width: "129%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
    paddingVertical: 0

  },
  sendOTPButton: {
    width: "100%",
    height: 34,
    borderRadius: 24,
    marginLeft: -97,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 45,

  },
  passwordText: {
    color: "#fff",
    paddingTop: 8,
    paddingLeft: 8,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  passwordTextInput: {
    width: "87%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontFamily: "SegoeUI",
    fontSize: 14,
    paddingVertical: 0

  },
  termsText: {
    color: "#999",
    paddingBottom: 14,
    paddingLeft: 28,
    paddingRight: 20,
    paddingTop: 14,
    fontFamily: "SegoeUI",
    fontSize: 14,
  },
  buttonsView: {
    width: "100%",
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  signuploginText: {
    fontSize: 18,
    color: "#fff",
  },
  loginButtonGradient: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
});
