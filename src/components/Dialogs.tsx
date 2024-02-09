import {
  Modal,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { styles } from '../utils/AppStyles';
import { AppString } from '../utils/AppStrings';
import { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../utils/AppColors';
import { fontFamily } from '../utils/Fonts';

import CloseCircleOutline from '../../assets/Icons/CloseCircle.svg';
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler';
import { imagesUrl } from '../utils/AppIcons';
import CheckGreen from '../../assets/Icons/CheckGreen.svg';
import CloseIconRed from '../../assets/Icons/CloseIconRed.svg';
import { RadioButtons } from '../screens/Cart/CartScreen';
import Internet from '../../assets/Icons/Internet.svg';

import CameraIcon from '../../assets/Icons/Camera.svg';

import GalleryIcon from '../../assets/Icons/Gallery.svg';
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




export const LeaveCommentPopup = ({ isShow = false, onCancel }) => {

  const [click, setClick] = useState(false)

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
              justifyContent: 'center',
              alignContent: 'center',
              width: '95%'
            },
          ]}>
          <TitleWithImages />
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            justifyContent: 'center', marginTop: 10
          }}>
            <ViewWithColor Icon={CheckGreen} color='#02AAB0' />

            <Text
              style={[
                styles.textStyle,
                {
                  marginStart: 9,
                  fontWeight: '500'
                },
              ]}>
              {'Изображения, детали и комментарии'}
            </Text>
          </View>

          <TextWithColor />
        </View>

        <View
          style={[
            styles.bottom_sheet,
            {
              justifyContent: 'center',
              alignContent: 'center',
              marginTop: 13,
              width: '95%'

            },
          ]}>
          <TitleWithImages data={[1, 2]} />
          <View style={{
            flexDirection: 'row', alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 14
          }}>
            <ViewWithColor />
            <Text
              style={[
                styles.textStyle,
                {
                  marginStart: 9,
                  fontWeight: '500'
                },
              ]}>
              {'Плохое изображение, отсутствует подробный текст'}
            </Text>
          </View>


          <View style={{
            flexDirection: 'row', alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 14
          }}>

            <RadioButtons size={15} isCheck={click} onClick={() => {
              setClick(!click)
            }} />
            <Text
              style={[
                styles.textStyle,
                {
                  marginStart: 9,
                  color: '#121212'
                },
              ]}>
              {"Don't show again"}
            </Text>
          </View>
          <TextWithColor text='1' mt={-20} />

        </View>
        <Pressable onPress={onCancel} style={{ paddingTop: 22 }}
        >
          <CloseCircleOutline
            width={31}
            height={31}
          />
        </Pressable>
      </View>

    </Modal >
  );
};

const ViewWithColor = ({ Icon = CloseIconRed, s = 15, color = '#E52D27' }) => {

  return <View style={{
    height: s, width: s,
    justifyContent: 'center', alignItems: 'center',
    borderRadius: s / 2, backgroundColor: color
  }}>
    <Icon />
  </View>
}


const TextWithColor = ({ text = '5', mt = -8 }) => {

  return <View style={{
    backgroundColor: '#E93368', height: 28, width: 48,
    borderTopStartRadius: 8, borderBottomEndRadius: 8, alignSelf: 'flex-end',
    justifyContent: 'center', alignItems: 'center', marginTop: mt
  }}>
    <Text
      style={[
        styles.textStyle,
        {
          fontSize: 13,
          color: colors.white
        },
      ]}>
      {'+'} <Text
        style={[
          styles.textStyle,
          {
            fontSize: 21,
            color: colors.white
          },
        ]}>{text}</Text> <Text
          style={[
            styles.textStyle,
            {
              color: colors.white
            },
          ]}>{'J'}</Text>
    </Text>

  </View>
}

const TitleWithImages = ({ data = [1, 2, 4] }) => {

  return <GestureHandlerRootView style={{ width: '100%' }}>
    <View style={{ paddingHorizontal: 14 }}>

      <Text
        style={[
          styles.textStyle,
          {
            paddingVertical: 9,
            fontSize: 11,
          },
        ]}>
        {'Хороший товар, удобная ткань, красивый и по размеру'}
      </Text>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item, index }) =>
          <Image source={{ uri: imagesUrl.shoes }} style={{
            height: 100,
            width: 100, borderRadius: 8, marginEnd: 9
          }} />
        }
      />
    </View>
  </GestureHandlerRootView>
}

export const HelpPopup = ({ isShow = false, onCancel }) => {


  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
      onRequestClose={onCancel}>
      <View
        style={[styles.botton_view, { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' }]}>
        <GestureHandlerRootView style={{ width: '100%' }}>
          <View
            style={[
              styles.bottom_sheet,
              {
                paddingHorizontal: 10,
                width: '100%', borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0
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
              {AppString.description}
            </Text>

            <FlatList
              data={dataList}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>

                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: 17,
                        color: '#121212'
                      },
                    ]}>
                    {item.title}
                  </Text>

                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: 14,
                        color: '#989898'
                      },
                    ]}>
                    {item.subTitle}
                  </Text>
                </View>
              }
            />

            <TouchableOpacity style={{ marginTop: 20, marginBottom: 20 }} onPress={onCancel} >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FE8C00', '#FC4A1A']}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 23,
                  height: 39,

                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 18,
                      color: colors.white,
                      fontWeight: 'bold'

                    },
                  ]}>
                  {AppString.ok}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </GestureHandlerRootView>
      </View>
    </Modal>
  );
};



const dataList = [{
  title: 'Публично',
  subTitle: 'Псевдонимы пользователей и аватары будут отображаться публично в разделе комментариев.'
},
{
  title: 'Анонимно',
  subTitle: 'Комментарии будут отображаться анонимно.'
},
]




export const ClearChatPopup = ({ isShow = false,
  title = AppString.recovery_after_cleaning_is_not_posible,
  onConfirm, onCancel }) => {


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
            {title}
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



export const DeleteAddress = ({ isShow = false, onConfirm, onCancel }) => {


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
              width: '82%',
              borderRadius: 15
            },
          ]}>
          <Text
            style={[
              styles.textStyle,
              {
                paddingTop: 25,
                paddingBottom: 14,
                fontSize: 21,
                textAlign: 'center',
              },
            ]}>
            {AppString.do_you_want_to_delete_an_address}
          </Text>



          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 20 }}>

            <TouchableOpacity onPress={onConfirm}
              style={{
                justifyContent: 'center', alignItems: 'center',
                borderColor: colors.lightOrange, height: 39, width: 110, borderWidth: 1, borderRadius: 20
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 18,
                    color: colors.lightOrange
                  },
                ]}>
                {AppString.yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FE8C00', '#FC4A1A']}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 23,
                  height: 39, width: 110,

                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 18,
                      color: colors.white

                    },
                  ]}>
                  {AppString.no}
                </Text>
              </LinearGradient>
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


export const DeleteBodyData = ({ isShow = false, onConfirm, onCancel }) => {


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
              width: '82%',
              borderRadius: 15
            },
          ]}>
          <Text
            style={[
              styles.textStyle,
              {
                paddingTop: 25,
                paddingBottom: 14,
                fontSize: 21,
                textAlign: 'center',
              },
            ]}>
            {AppString.exit_body_data}
          </Text>
          <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center', gap: 13, marginBottom: 20 }}>

            <TouchableOpacity onPress={onConfirm}
              style={{
                justifyContent: 'center', alignItems: 'center',
                borderColor: colors.lightOrange, height: 39, width: 110, borderWidth: 1, borderRadius: 20
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 18,
                    color: colors.lightOrange
                  },
                ]}>
                {AppString.yes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCancel} >
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#FE8C00', '#FC4A1A']}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 23,
                  height: 39, width: 110,

                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 18,
                      color: colors.white

                    },
                  ]}>
                  {AppString.no}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </Modal>
  );
};



export const ProgressView = ({ ht = '100%' }) => {
  return <View style={[styles.centeredView, { marginHorizontal: 0, height: ht, paddingVertical: 20 }]}>
    <ActivityIndicator size={Platform.OS == "ios" ? "large" : 70} color={colors.lightOrange} />
    {/* <Text style={[style.textStyle, {textAlign:'center'}]}>Loading...</Text> */}

  </View>
}

export const CenterProgressView = ({ }) => {
  return <View style={{ position: 'absolute', margin: 0, justifyContent: "center", backgroundColor: 'rgba(0,0,0, 0.2)', flex: 1, width: "100%", height: "100%" }}>
    <ActivityIndicator size={Platform.OS == "ios" ? "large" : 70} color={colors.lightOrange} />
  </View>
}


export const RetryWhenErrorOccur = ({ data, isRetry = true, ht = "100%", onClick }) => {


  return <View style={[styles.centerContent, { gap: 10, height: ht }]}>

    {ht == '100%' ? <Internet /> : null}
    <Text style={[styles.textStyle,
    {
      fontWeight: 'bold', fontSize: 18,
      textAlign: 'center'
    }]}>{data && data.data ? data.data.toString() : ""}</Text>
    {isRetry ?
      <CommonButton onClick={onClick} /> : null}


  </View>

}


const CommonButton = ({
  text = AppString.pay,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 20,
          borderRadius: 40,
          height: 35,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontSize: 14, fontWeight: '500' },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const UploadImage = ({ isShow = false, camera, library, onCancel }) => {
  return (
    <Modal
      transparent={true}
      animationType={'fade'}
      visible={isShow}
      onRequestClose={onCancel}>
        <Pressable onPress= {onCancel} style = {{justifyContent: 'flex-end', flex: 1, backgroundColor: 'rgba(0,0,0,0.4'}}>
      <View style={{ flexDirection: 'row',  bottom: 0, padding: 20, backgroundColor: colors.white, shadowOpacity: 1, shadowRadius: 3, shadowOffset: {width: 0, height: -3}, shadowColor: 'rgba(0,0,0,0.5)', borderTopLeftRadius: 13, borderTopRightRadius: 13}}>
        <IconWithText title={AppString.camera} onClick={camera} marginEnd={20} />
        <IconWithText title={AppString.album} onClick={library} Icon={GalleryIcon} />
      </View>
      </Pressable>
      </Modal>
  )
}


const IconWithText = ({ title = AppString.camera, onClick, Icon = CameraIcon, marginEnd = 33 }) => {
  return <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginEnd: marginEnd }} onPress={onClick}>
    <View style={{
      backgroundColor: colors.white,
      justifyContent: 'center', alignItems: 'center',
      height: 58, width: 58, borderRadius: 8,
    }}>
      <Icon />

    </View>
    <Text
      style={[styles.textStyle, { fontSize: 14, color: colors.black666666, marginTop: 4 }]}>
      {title}
    </Text>
  </TouchableOpacity>
}


export const ActivityIndicatorView = ({tintColor = colors.lightOrange}) => {
  return (
    <ActivityIndicator size={"small"} style={{ alignSelf: 'center', justifyContent: "center", alignItems: "center", marginStart: -20, }} color={tintColor} />
  )
}