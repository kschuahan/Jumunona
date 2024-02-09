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
import { RouteNames } from '../../utils/RouteNames';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import { fontFamily } from '../../utils/Fonts';
import { CustomHeader } from '../../components/Header';
import { postAPICall } from '../../Netowork/Apis';
import { ProfileAPIs } from '../../Netowork/Constants';
import { CenterProgressView, ProgressView } from '../../components/Dialogs';

const ChangePassswordScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ 
      headerTitle: AppString.change_password,
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
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');
  const [newPassErr, setNewPassErr] = useState('');
  const [confirmPassErr, setConfirmPassErr] = useState('');
  const [loading, setLoading] = useState(false);

  const changePass = () => {
    setLoading(true)
      postAPICall({
        newPassword: newPass,
        confirmPassword: confirmNewPass
      }, ProfileAPIs.changePass, true, (res: any) => {
         setLoading(false)
          if (res.isSuccess) {
            navigation.replace(RouteNames.sucessfulChangePassword);
          } else {
            Alert.alert(res.data.toString())
          }
      })
  }

  const validate = () => {
    console.warn(newPass.trim().length)
    if (newPass.trim().length >= 8) {
      setNewPassErr("")
        if (confirmNewPass == newPass) {
          setConfirmPassErr("")
          return true
        } else {
          setConfirmPassErr("Password does not match.")
           return false
        }
    } else {
      setNewPassErr("Enter valid new password.")
      setConfirmPassErr("")
      return false
    }
  }

  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={AppString.change_password} />

      <ScrollView style = {{flex: 1}}>
        <View
          style={[
            style.container,
            { backgroundColor: colors.white, borderRadius: 13,  marginTop: 6, },
          ]}>
          <Text
            style={[
              styles.textStyle,
              { marginBottom: 6, fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.new_password}
          </Text>
          <View style={{ marginBottom: 14}}>
          <View style={{ flexDirection: 'row', }}>
            <TextInput
              placeholder={AppString.create_new_password}
              style={style.passwordTextInput}
              value={newPass}
              onChangeText={text => {
                setNewPass(text);
              }}></TextInput>
          </View>
          {
                  newPassErr.length > 0
                    ? <Text
                      style={{
                        color: colors.lightRed,
                        fontSize: 14,
                        fontWeight: '400',
                        paddingStart: 8
                      }}>
                      {newPassErr}
                    </Text>
                    : null

                }
        </View>
          <Text
            style={[
              styles.textStyle,
              { marginBottom: 6, fontFamily: fontFamily.bold, fontSize: 17 },
            ]}>
            {AppString.confrim_new_password}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder={AppString.enter_your_pass_again}
              style={style.passwordTextInput}
              value={confirmNewPass}
              onChangeText={text => {
                setConfirmNewPass(text);
              }}></TextInput>
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

        <TouchableOpacity
          onPress={() => {
            // navigation.navigate(RouteNames.sucessfulChangePassword);
            if (validate()) {
              changePass()
            }
          }}
          style={style.confirmButton}>
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
      { loading ? <CenterProgressView /> : null}
    </View>
  );
};

export default ChangePassswordScreen;
const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 14,
    margin: 10,
  },
  passwordTextInput: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    height: 34,
    borderRadius: 24,
    paddingHorizontal: 16,
    fontFamily: fontFamily.regular,
    fontSize: 14,
    paddingVertical: 0
  },
  confirmButton: {
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
