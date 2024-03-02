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
import { RouteNames } from '../../utils/RouteNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import RootStackParamList from '../../utils/navigations';
import { colors } from '../../utils/AppColors';
import AboutUs from '../../../assets/Icons/AppLogo.svg';
import { CenterProgressView } from '../../components/Dialogs';
import { postAPICall } from '../../Netowork/Apis';
import { AuthAPIs } from '../../Netowork/Constants';
import { AsyncStorageKeys, saveValue, userData } from '../../utils/AsyncStorage';

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;
// type WelcomeScreenRouteProp = RouteProp<RootStackParamList, "Welcome">;
interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [mobileErr, setMobileErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [loading, setLoading] = useState(false)

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
    return isValid
  }

  const login = () => {
    if (validate()) {
      setLoading(true)
      postAPICall(
        {
          phoneNumber: '91' + mobile,
          password: password,

        },
        AuthAPIs.login,
        false,
        (res: any) => {
          console.warn(res.data.accessToken)
          setLoading(false)
          if (res.isSuccess) {
            if (res.data.accessToken) {
              saveValue(AsyncStorageKeys.authToken, res.data.accessToken)
              saveValue(AsyncStorageKeys.userId, res.data.userId)
              userData.userID = res.data.userId
              navigation.replace("Main");
            } else {
              Alert.alert(res.data)
            }
          } else {
            Alert.alert(res.data)
          }

        }
      )
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.top}>
          <Text
            style={{
              fontSize: 21,
              fontWeight: "400",
              paddingBottom: 24,
            }}
          >
            Вход
          </Text>
          <AboutUs
            style={{ marginTop: 16, borderRadius: 24 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: "SegoeUIBold",
              color: "#FF7600",
              paddingTop: 8,
            }}
          >
            Jumunona
          </Text>
        </View>
        <View style={styles.middle}>
          <View style={{ marginHorizontal: 12 }}>
            <View
              style={{ width: "100%", marginBottom: 13 }}
            >
              <View
                style={{ flexDirection: "row", width: "100%" }}
              >
                <LinearGradient
                  colors={["#ff7600", "#ffc500"]}
                  start={{ x: 0.4, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: "40%",
                    height: 34,
                    borderRadius: 24,
                    paddingLeft: 8,
                  }}
                >
                  <Text style={styles._992}>+992</Text>

                  {/* <TextInput placeholder="+91" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> */}
                </LinearGradient>

                <TextInput
                  onChangeText={text => {
                    setMobile(text);
                  }}
                  value={mobile}
                  placeholder="Введите ваш номер телефона"
                  style={styles.mobileTextInput}
                ></TextInput>

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
            <View style={{ marginBottom: 13, }}>
              <TextInput
                placeholder="Введите свой пароль"
                style={styles.passwordTextInput}
                onChangeText={text => {
                  setPassword(text);
                }}
                value={password}
              ></TextInput>
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
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            login()
          }}
          style={styles.loginButton}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={["#ffc500", "#FC4A1A"]}
            style={styles.buttonGradient}
          >
            <Text
              style={{ fontSize: 16, color: "#fff", fontWeight: "bold" }}
            >
              Войти
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.bottom}>
          <Text
            onPress={() => {
              navigation.replace("ForgotPassword");
            }}
            style={{ fontWeight: "600", fontSize: 12, color: '#3D3D3D' }}
          >
            Забыли пароль?
          </Text>
          <Text
            onPress={() => {
              navigation.replace("Signup");
            }}
            style={{ fontWeight: "600", fontSize: 12, color: '#3D3D3D' }}
          >
            Зарегистрироваться
          </Text>
        </View>
      </ScrollView>
      <CenterProgressView isShow={loading} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteF2F2F2
  },
  top: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 23.5,
    paddingBottom: 48,
  },
  middle: {
    paddingHorizontal: 10,
    paddingTop: 13,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderRadius: 17,
    marginHorizontal: 8
  },
  bottom: {
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    marginStart: 20,
    marginEnd: 20
  },
  _992: {
    color: "#fff",
    paddingTop: 7,
    paddingLeft: 2,
    fontSize: 14,
    fontWeight: '400'
  },
  mobileTextInput: {
    width: '87%',
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 0
  },
  passwordTextInput: {
    width: "100%",
    backgroundColor: "#f5f5f5",
    height: 34,
    borderRadius: 24,
    paddingLeft: 16,

    fontFamily: "SegoeUI",
    fontSize: 14,
    paddingVertical: 0
  },
  loginButton: {
    flex: 1,
    width: "100%",
    paddingTop: 18,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    fontWeight: 'bold'
  },
  buttonGradient: {
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
  },
});
