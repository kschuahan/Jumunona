import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../utils/AppColors';

const logo = require('../../../assets/icon-512x512.png');
import AboutUs from '../../../assets/Icons/AppLogo.svg';
import { RouteNames } from '../../utils/RouteNames';

const SignUpScreen: React.FC = ({ navigation, route }) => {
  const [mobile, setMobile] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [referralCode, setRefferalCode] = useState('');
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <Text style={styles.registerText}>Регистрация</Text>
        <AboutUs
          style={{ width: 82, height: 82, marginTop: 51.5, borderRadius: 24 }}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'SegoeUIBold',
            color: '#FF7600',
            paddingTop: 1.5,
          }}>
          Jumunona
        </Text>
      </View>
      <View style={styles.middle}>
        <View style={{ marginHorizontal: 12 }}>
          <View
            style={{ flexDirection: 'row', width: '100%', paddingBottom: 13 }}>
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

          <View
            style={{ flexDirection: 'row', width: '100%', paddingBottom: 13 }}>
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
              <TouchableOpacity style={styles.sendOTPButton}>
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

          <View
            style={{ flexDirection: 'row', width: '100%', paddingBottom: 13 }}>
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

          <View
            style={{ flexDirection: 'row', width: '100%', paddingBottom: 13 }}>
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

          <View style={{ flexDirection: 'row', width: '100%' }}>
            <LinearGradient
              colors={['#ff7600', '#ffc500']}
              start={{ x: 0.4, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.leftSideGradient}>
              <Text style={styles.referralCodeText}>Код</Text>
            </LinearGradient>

            <TextInput
              placeholder="Введите код приглашения (если есть)"
              style={styles.referralCodeTextInput}
              numberOfLines={1}
              onChangeText={text => {
                setRefferalCode(text);
              }}
              value={referralCode}></TextInput>
          </View>
        </View>
      </View>
      <Text style={styles.termsText}>
        Согласен(а) с <Text onPress={() => {
          navigation.navigate(RouteNames.term_of_use)

        }} style={[styles.termsText, { color: '#131E78' }]}>«Условиями использования»</Text> и <Text onPress={() => {
          navigation.navigate(RouteNames.privacy_policy)

        }} style={[styles.termsText, { color: '#131E78' }]}>«Конфиденциальностью»</Text> нажимая Зарегистрироваться
      </Text>
      <View style={styles.buttonsView}>
        <TouchableOpacity onPress={() => { }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FE8C00', '#ff7600']}
            style={[styles.loginButtonGradient, { marginBottom: 13 }]}>
            <Text style={styles.signupText}>Зарегистрироваться</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.replace('Login');
          }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FFE259', '#FDCB32', '#FDCA30']}
            style={styles.loginButtonGradient}>
            <Text style={styles.loginText}>Войти</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30.5,
    paddingBottom: 60.5,
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 21,
    width: 160,
    textAlign: 'center',
    color: colors.black
  },
  middle: {
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 258,
    width: 359,
    alignSelf: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    paddingTop: 32,
    marginHorizontal: 32,
    alignSelf: 'center',
  },
  _992: {
    color: '#fff',
    paddingTop: 9,
    paddingLeft: 8.09,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  leftSideGradient: {
    width: '35%',
    height: 36,
    borderRadius: 24,
  },
  mobileTextInput: {
    width: '87%',
    backgroundColor: '#f5f5f5',
    height: 36,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  otpText: {
    color: '#fff',
    paddingTop: 9,
    paddingLeft: 8.09,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  codeTextInput: {
    width: '116%',
    backgroundColor: '#f5f5f5',
    height: 36,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  sendOTPButton: {
    width: '100%',
    height: 36,
    borderRadius: 24,
    marginLeft: -85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 74,
    textAlign: 'center',
  },
  passwordText: {
    color: '#fff',
    paddingTop: 8,
    paddingLeft: 8.09,
    fontWeight: '400',
    fontSize: 14,
  },
  passwordTextInput: {
    width: '87%',
    backgroundColor: '#f5f5f5',
    height: 36,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontWeight: '400',
    fontSize: 14,
  },
  referralCodeText: {
    color: '#fff',
    paddingTop: 8,
    paddingLeft: 8.09,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  referralCodeTextInput: {
    width: '87%',
    backgroundColor: '#f5f5f5',
    height: 36,
    borderRadius: 24,
    marginLeft: -40,
    paddingLeft: 16,
    fontSize: 14,
    fontWeight: '400'
  },
  termsText: {
    color: '#3D3D3D',
    paddingBottom: 12,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    fontSize: 11,
    fontWeight: '400',
  },
  buttonsView: {
    width: '100%',
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  signupText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'SegoeUIBold',
    textAlign: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  loginButtonGradient: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginHorizontal: 10,
  },
});
