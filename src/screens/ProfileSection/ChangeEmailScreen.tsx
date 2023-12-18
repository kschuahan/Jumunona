import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../utils/AppColors';
import {AppString} from '../../utils/AppStrings';
import {styles} from '../../utils/AppStyles';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import {fontFamily} from '../../utils/Fonts';

const ChangeEmailScreen = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: AppString.change_email,
      headerRight: () => (
        <TouchableOpacity style={{alignItems: 'center'}}>
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{alignItems: 'center'}}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  });
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <ScrollView>
      <View
        style={[
          style.container,
          {backgroundColor: colors.white, borderRadius: 13},
        ]}>
        <Text
          style={[
            styles.textStyle,
            {marginBottom: 6, fontFamily: fontFamily.bold, fontSize: 17},
          ]}>
          {AppString.enter_new_email}
        </Text>

        <View style={{flexDirection: 'row', marginBottom: 14}}>
          <TextInput
            placeholder={AppString.enter_your_new_email}
            style={style.emailTextInput}
            value={email}
            onChangeText={text => {
              setEmail(text);
            }}></TextInput>
        </View>

        <Text
          style={[
            styles.textStyle,
            {marginBottom: 6, fontFamily: fontFamily.bold, fontSize: 17},
          ]}>
          {AppString.confirmation_code}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder={AppString.enter_new_number}
            style={style.passwordTextInput}
            value={otp}
            onChangeText={text => {
              setOtp(text);
            }}
          />
          <TouchableOpacity
            style={{
              width: '35%',
              height: 34,
              paddingLeft: 8,
              marginLeft: -30,
              opacity: email.length == 0 ? 0.5 : 1,
            }}
            onPress={() => {}}
            disabled={email.length == 0}>
            <LinearGradient
              colors={['#FE8C00', '#FC4A1A']}
              start={{x: 0.4, y: 0}}
              end={{x: 1, y: 1}}
              style={{flex: 1, borderRadius: 24}}>
              <Text style={style._992}>{AppString.get_code}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => {}} style={style.loginButton}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={['#FE8C00', '#FC4A1A']}
          style={styles.buttonGradient}>
          <Text
            style={{fontSize: 18, color: '#fff', fontFamily: fontFamily.bold}}>
            {AppString.confirm}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChangeEmailScreen;
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
    paddingLeft: 8,
    fontFamily: fontFamily.regular,
    fontSize: 14,
  },
  emailTextInput: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: 34,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
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
