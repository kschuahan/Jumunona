import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {RouteNames} from '../../utils/RouteNames';
const logo = require('../../../assets/icon-512x512.png');

const LoginScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.top}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: 'bold',
            paddingBottom: 24,
            fontFamily: 'SegoeUIBold',
          }}>
          Вход
        </Text>
        <Image
          source={logo}
          style={{width: 82, height: 82, marginTop: 32, borderRadius: 24}}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'SegoeUIBold',
            color: '#FF7600',
            paddingTop: 12.5,
          }}>
          Jumunona
        </Text>
      </View>
      <View style={styles.middle}>
        <View style={{marginHorizontal: 12}}>
          <View style={{flexDirection: 'row', width: '100%', marginBottom: 13}}>
            <LinearGradient
              colors={['#ff7600', '#ffc500']}
              start={{x: 0.4, y: 0}}
              end={{x: 1, y: 1}}
              style={{
                width: '45%',
                height: 36,
                borderRadius: 24,
                paddingLeft: 8,
              }}>
              <Text style={styles._992}>+992</Text>
            </LinearGradient>

            <TextInput
              placeholder="Enter Mobile No."
              style={styles.mobileTextInput}></TextInput>
          </View>
          <View>
            <TextInput
              placeholder="Please Enter Password"
              style={styles.passwordTextInput}></TextInput>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.replace(RouteNames.main);
        }}
        style={styles.loginButton}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#ffc500', '#ff7600']}
          style={styles.buttonGradient}>
          <Text
            style={{fontSize: 16, color: '#fff', fontFamily: 'SegoeUIBold'}}>
            Log in
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.bottom}>
        <Text
          onPress={() => {
            navigation.replace('ForgotPassword');
          }}
          style={{fontWeight: '700', fontFamily: 'SegoeUI', fontSize: 12}}>
          Забыли пароль ?
        </Text>
        <Text
          onPress={() => {
            navigation.replace('Signup');
          }}
          style={{fontWeight: '700', fontFamily: 'SegoeUI', fontSize: 12}}>
          Зарегистрироваться
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 30.5,
    paddingBottom: 56.25,
  },
  middle: {
    paddingHorizontal: 10,
    paddingTop: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'hsl(0, 0%, 98%)',
    borderRadius: 17,
    width: 359,
    height: 115,
    alignSelf: 'center',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginHorizontal: 32,
  },
  _992: {
    color: '#fff',
    paddingTop: 10,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  mobileTextInput: {
    width: '82%',
    backgroundColor: '#f5f5f5',
    height: 38,
    borderRadius: 24,
    marginLeft: -60,
    paddingLeft: 16,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  passwordTextInput: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: 38,
    borderRadius: 24,
    paddingLeft: 16,
    fontFamily: 'SegoeUI',
    fontSize: 14,
  },
  loginButton: {
    flex: 1,
    width: '100%',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 14,
    justifyContent: 'space-between',
    fontFamily: 'SegoeUIBold',
  },
  buttonGradient: {
    elevation: 4,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
});
