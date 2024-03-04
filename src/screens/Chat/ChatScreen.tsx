import React, { useEffect, useMemo, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { StyleSheet } from 'react-native';
import { dimensions } from '../../utils/sizes';
import { appIcons, imagesUrl } from '../../utils/AppIcons';
import { AppString } from '../../utils/AppStrings';
import LinearGradient from 'react-native-linear-gradient';
import HappyOutlineIcon from '../../../assets/Icons/Emogy.svg';
import ShopGrey from '../../../assets/Icons/ShopGrey.svg';
import ShopGreys from '../../../assets/Icons/ShopGreys.svg';

import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import EllipsisHosrizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import AddOutlineIcon from '../../../assets/Icons/AddWhite.svg';
import { fontFamily } from '../../utils/Fonts';
import CloseIcon from '../../../assets/Icons/Closegrey.svg';
import { ChatHeader } from '../../components/Header';
import CameraIcon from '../../../assets/Icons/Camera.svg';

import GalleryIcon from '../../../assets/Icons/Gallery.svg';

import CloseIconChat from '../../../assets/Icons/CloseChat.svg';

import VideoIcon from '../../../assets/Icons/Video.svg';
import { ProgressView, RetryWhenErrorOccur, UploadImage } from '../../components/Dialogs';
import { FileModal, cameraLaunch, selectFile } from '../../utils/FileUpload';
import { getAPICall } from '../../Netowork/Apis';
import { BASE_URL, ChatAPI } from '../../Netowork/Constants';
import { CommonModal } from '../HomeScreen';
import socket, { MessageModel, } from '../../utils/SocketHelper';
import { userData } from '../../utils/AsyncStorage';
import getSocket from '../../utils/SocketHelper';
import { localEnum } from '../../Netowork/ApiEnum';
import { io } from 'socket.io-client';


interface ChatMeassage {
  message: string,
  fromSelf: boolean
}

export const ChatScreen = ({ navigation, route }) => {

  const socket = useMemo(() => {
    return io(BASE_URL(localEnum.development))
  }, [])

  const responseHandling = (success: boolean, response: any) => {
    if (success) {

      const fileModel = new FileModal(response.fileName,
        "image",
        response.uri)

      console.log(fileModel)
    }
  }


  const [toId, setToID] = useState(route.params ? route.params.id : '65b8956628873a467127e7c5')
  console.log(route.params, userData.userID);

  const [isShow, setIsShow] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [allMessages, setAllMessages] = useState<Array<ChatMeassage>>([])
  const [data, setData] = useState<any>()
  const isShop = route.params ? route.params.isShop : false
  useEffect(() => {


    navigation.setOptions({
      headerTitle: 'Shop name',
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: colors.whiteF6F6F6,
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
          {!isShop ? <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            {/* <Ionicons name="gift-outline" size={24} /> */}
            <ShopGrey />
          </TouchableOpacity> : null}
          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            <EllipsisHosrizontalIcon />
          </TouchableOpacity>
        </View>
      ),

      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginStart: 4, marginEnd: 30 }}>
          <ChevronBackOutlineIcon width={15} height={15} />
        </TouchableOpacity>
      ),
    });
  });


  useEffect(() => {
    if (message.trim() != '') {
      setIsShow(false)
    }
  }, [message])

  useEffect(() => {
    getChatMessages()
  }, [])

  useEffect(() => {

    if (socket != null) {
      socket.on('connect', () => {
        console.warn(socket.id); // true
        socket.emit("add-user", toId);
      });

      socket.on("add-user", (userId:any) => {
        console.warn("add-user", userId);
      });

      listenForNewMessage()



    }
  }, [socket])

  const listenForNewMessage = () => {

    // if (socket) {
    socket.on("msg-recieve", (message) => {
      allMessages.push({ message: message.msg, fromSelf: false })
      setRefresh(!refresh)
    })
    // }
  }


  const getChatMessages = () => {
    setLoading(true)

    getAPICall(ChatAPI.getChatMessages + `from=${userData.userID}&to=${toId}`,
      (res: CommonModal) => {
        if (res.isSuccess) {
          if (res.data && res.data.data && res.data.data.length > 0) {
            setAllMessages(res.data.data)
            console.log(res.data.data)
          }
        }
        setData(res)

        setLoading(false)
      })
  }

  const sendMessage = async (msg: string) => {
    let message = { from: userData.userID, to: toId, msg: msg }

    try {
      const response = await socket.emitWithAck("send-msg", message);
      listenForNewMessage()

    } catch (err) {
      listenForNewMessage()

      // the server did not acknowledge the event in the given delay
    }

  }

  return (
    <View
      style={[
        styles.container,
        {
          padding: 0,
          backgroundColor: colors.whiteF2F2F2,
        },
      ]}>
      <ChatHeader navigation={navigation} isVisible={!isShop} />
      {data && data.isSuccess && data.data.data ?
        <View
          style={[
            styles.container,
            {
              paddingBottom: 100,
              backgroundColor: colors.whiteF2F2F2,
            },
          ]}>
          <FlatList
            style={{ flex: 1, paddingBottom: 500 }}
            data={allMessages}

            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View>
                {index == 0 ? (
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color: colors.balck4F4F4D,
                        textAlign: 'center',
                        marginTop: 9.5,
                        marginBottom: 6.5,
                      },
                    ]}>
                    {'15:29'}
                  </Text>
                ) : null}
                {item.fromSelf == false ?
                  <LeftInflate item={item} /> : <RightInflate item={item} />
                }

                {/* // ) : (
                //   !isShop ? <SendProductDetailsInflate item={item} /> : null
                // )} */}
              </View>
            )}
          />

          {/* {!isShop ? <ProfileProduct subTitle="" onClick={undefined} /> : null} */}

          <View style={[style.textInputWithSend, { paddingBottom: !isShop ? 42 : 10 }]}>
            <View style={[style.textInputWithSend1, { paddingBottom: 10 }]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  backgroundColor: colors.white,
                  borderRadius: 19,
                }}>
                <TextInput
                  value={message}
                  placeholder={'Type something'}
                  multiline={true}
                  style={[style.searchTextInput, { maxHeight: 120 }]}
                  placeholderTextColor={colors.grey}
                  onChangeText={text => {
                    setMessage(text);
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate(RouteNames.chat_screen)
                  }}
                  style={style.circleButton}>
                  <HappyOutlineIcon width={37} height={37} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if (isShow) {
                    setIsShow(!isShow)
                  } else if (message.trim().length > 0) {
                    sendMessage(message)
                    allMessages.push({ message: message, fromSelf: true })

                    setMessage('')
                  } else {
                    setIsShow(!isShow)
                  }
                }} style={style.circleButton}>
                  {isShow ? <CloseIconChat width={37} height={37} /> : message.trim().length == 0 ? <AddOutlineIcon width={37} height={37} /> : <Image source={appIcons.send} style={{ width: 25, height: 25, marginStart: -5, marginBottom: -3 }} />}
                </TouchableOpacity>
              </View>
            </View>
            {isShow ? <View style={{ flexDirection: 'row', }}>
              <IconWithText onClick={() => {
                setIsShow(!isShop)
                cameraLaunch(true, responseHandling)
              }} marginEnd={20} />
              <IconWithText title={AppString.album} onClick={() => {
                setIsShow(!isShop)
                selectFile(true, responseHandling)
              }} Icon={GalleryIcon} />
              <IconWithText title={AppString.video} onClick={() => {
                setIsShow(!isShop)
                selectFile(false, responseHandling)
              }} Icon={VideoIcon} />
            </View> : null}
          </View>
        </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
          setData(undefined)
          getChatMessages()
        }} />}
    </View>

  );
};

const LeftInflate = ({ item }) => {
  return (
    <View style={style.chatInflate}>
      <Profile />

      <View
        style={{
          width: '100%',
          backgroundColor: colors.white,
          borderRadius: 13,
          padding: 10,
        }}>
        <Text
          style={[styles.textStyle, { fontSize: 17, color: colors.black121212 }]}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};


const IconWithText = ({ title = AppString.image, onClick, Icon = CameraIcon, marginEnd = 33 }) => {
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

const RightInflate = ({ item }) => {
  return (
    <View
      style={[
        style.chatInflate,
        { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
      ]}>
      <Profile />
      <View
        style={{ backgroundColor: colors.white, borderRadius: 13, padding: 10 }}>
        <Text
          style={[styles.textStyle, { fontSize: 17, color: colors.black121212 }]}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};

const SendProductDetailsInflate = ({ item }) => {
  return (
    <View
      style={[
        style.chatInflate,
        { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
      ]}>
      <Profile />
      <View style={{ backgroundColor: colors.white, borderRadius: 13 }}>
        <Image
          source={{ uri: imagesUrl.shoes }}
          style={{
            height: 244,
            width: 244,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            backgroundColor: colors.white,
          }}
        />
        <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 16, color: colors.lightOrange },
            ]}>
            {'178с.'}
          </Text>
          <Text style={[styles.textStyle, { fontSize: 17 }]}>
            {'MMORT儿童鞋子子子子子子 身MMORT儿童鞋子子子子...'}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 4,
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: 2,
                paddingBottom: 6,
                alignItems: 'center',
              }}>
              <ShopGreys style={{
                marginTop: 3
              }} />
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 14,
                    color: colors.grey9A9A9A,
                  },
                ]}>
                {'Shop name'}
              </Text>
            </View>
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  color: colors.grey9A9A9A,
                },
              ]}>
              {'продано 42'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Profile = ({ image = imagesUrl.profile }) => {
  return (
    <Image
      source={{ uri: image }}
      style={{
        height: 33,
        width: 33,
        borderRadius: 17,
        backgroundColor: colors.white,
      }}
    />
  );
};

const ProfileProduct = ({
  title = 'MMORT儿童鞋子子子子...',
  subTitle = AppString.left,
  time = '178с.',
  buttonText = AppString.sent,
  onClick,
}) => {
  return (
    <View
      style={[
        styles.profileProduct,
        {
          marginHorizontal: 0,
          position: 'absolute',
          bottom: 95,
          backgroundColor: colors.white,
          padding: 10,
          width: Dimensions.get('window').width - 20,
          start: 10,
          end: 12,
        },
      ]}>
      <View style={{ flexDirection: 'row', width: '60%', alignItems: 'center' }}>
        <Image
          source={{ uri: imagesUrl.shoes }}
          style={{ height: 60, width: 60, borderRadius: 8 }}
        />
        <View
          style={{
            marginStart: 10,
            justifyContent: 'space-between',
            height: 60,
          }}>
          <Text style={[styles.textStyle, { fontSize: 16 }]}>{title}</Text>
          <Text
            style={[
              styles.textStyle,
              { color: colors.lightOrange, fontSize: 14 },
            ]}>
            {time}{' '}
            <Text style={[styles.textStyle, { color: colors.grey }]}>
              {subTitle}
            </Text>
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'space-between', height: 60 }}>
        <TouchableOpacity onPress={onClick} style={{ alignSelf: 'flex-end' }}>
          <CloseIcon width={14} height={14} color={colors.grey919692} />
        </TouchableOpacity>

        <CommonButton text={buttonText} onClick={() => { }} />
      </View>
    </View>
  );
};

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
          padding: 10,
          paddingVertical: 6,
          borderRadius: 1000,
        }}>
        <Text style={[styles.textStyle, { color: colors.white }]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  textInputWithSend: {
    backgroundColor: colors.whiteF7F7F7,
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
    paddingBottom: 42,
    paddingTop: 8,
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    paddingHorizontal: 12,
  },
  textInputWithSend1: {

    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',

  },
  searchTextInput: {
    width: '71%',
    marginStart: 11,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    paddingVertical: 5
  },
  circleButton: {
    backgroundColor: colors.white,
    height: 37,
    width: 37,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatInflate: {
    flex: 0.7,
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
    width: Dimensions.get('window').width / 1.5,
  },
});

export default ChatScreen;
