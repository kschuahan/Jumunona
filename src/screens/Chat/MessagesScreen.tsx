import { FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { styles } from '../../utils/AppStyles'
import ClearIcon from '../../../assets/Icons/Clear.svg';
import AddIcon from '../../../assets/Icons/AddChat.svg';
import SettingIcon from '../../../assets/Icons/Setting.svg';
import DeleteIcon from '../../../assets/Icons/DeleteChat.svg';
import UploadIcon from '../../../assets/Icons/UploadChat.svg';
import ChatSettingIcon from '../../../assets/Icons/ChatSetting.svg';
import { AppString } from '../../utils/AppStrings';
import { colors } from '../../utils/AppColors';
import { Card } from 'react-native-paper';
import { fontFamily } from '../../utils/Fonts';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import Count from '../../../assets/Icons/CircleOrnage.svg';

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { appIcons, imagesUrl } from '../../utils/AppIcons';
import LinearGradient from 'react-native-linear-gradient';
import { RouteNames } from '../../utils/RouteNames';
import { getAPICall } from '../../Netowork/Apis';
import { ChatAPI } from '../../Netowork/Constants';
import { CommonModal } from '../HomeScreen';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { useIsFocused } from '@react-navigation/native';

let row: Array<any> = [];
let prevOpenedRow;
export interface ChatRooms {
  _id: string
  userName: string
}
const MessagesScreen = ({ navigation }) => {


  const [chats, setChats] = useState<Array<ChatRooms>>([])
  const [data, setData] = useState<CommonModal>();
  const [loading, setLoading] = useState(false);

  const isFocused = useIsFocused()
  const RightButtons = ({ index = 0, onClick }) => {

    return <View style={[style.rowDirectionCenter, {
      justifyContent: 'space-around',
      width: 222,
      backgroundColor: '#F0F0F0'
    }]}>
      <TouchableOpacity onPress={() => {
        onClick()
        navigation.navigate(RouteNames.shopSettings)
      }}><ChatSettingIcon /></TouchableOpacity>
      <TouchableOpacity><UploadIcon /></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        //onClick()
        // const data = chats.filter((it, pos) => pos != index)
        //setChats(data)
      }}><DeleteIcon /></TouchableOpacity>

    </View>
  }

  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }


  useEffect(() => {
    if (isFocused) {
      setData(undefined)
      callAPI()
    }
  }, [isFocused])

  const callAPI = () => {
    setLoading(true)
    getAPICall(ChatAPI.getAllUsers+'1', (res: any) => {
      if (res && res.isSuccess && res.data.data) {
        const da=[...res.data.data.admin, ...res.data.data.user]
        console.log("dd",da);
        
        setChats(da) 
      }
      setData(res)
      setLoading(false)
    });
  };

  return (
    data && data.isSuccess && data.data.data ? <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={[styles.container, { padding: 0 }]}>
        <TopBar />

        <View style={[styles.container, { padding: 0 }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.white }}
            data={chats}
            renderItem={({ item, index }) => {

              return <Swipeable ref={ref => row[index] = ref}
                onSwipeableOpen={() => closeRow(index)}


                renderRightActions={() =>
                  <RightButtons index={index} onClick={() => {

                  }} />
                }>
                <View style = {{backgroundColor: colors.white}}>
                  <UserChatListItem item={item} onClick={() => {
                    navigation.navigate(RouteNames.chat_screen, { id: item._id, name:item.userName })
                  }} />
                  <View style={{ height: 0.8, backgroundColor: colors.whiteF0F0F0, marginStart: 68, marginTop: 14 }} />
                </View>
              </Swipeable>
            }
            }
          />

        </View>
        <TouchableOpacity onPress={() => {
          navigation.navigate(RouteNames.chatSetting)
        }} style={{
          backgroundColor: colors.black323232, height: 48,
          borderRadius: 13, justifyContent: 'center', alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 14,
          position: 'absolute',
          top: 58,
          end: 10
        }}>
          <SettingIcon />
          <Text
            style={[
              styles.textStyle,
              { fontSize: 14, color: colors.white, marginStart: 8 },
            ]}>
            {AppString.settings}
          </Text>
        </TouchableOpacity>

      </View>
    </GestureHandlerRootView>
      : loading ? (
        <ProgressView />
      ) : (
        <RetryWhenErrorOccur
          data={data}
          onClick={() => {
            setData(undefined);
            callAPI();
          }}
        />
      )
  )
}


const UserChatListItem = ({ item, onClick }) => {
  return <TouchableOpacity onPress={onClick} style={[style.topBarView, { paddingStart: 12, alignItems: 'flex-start', marginTop: 12, }]}>
    <View style={[style.rowDirectionCenter,]}>

      <Image
        source={{ uri: imagesUrl.profile }}
        style={{ height: 48, width: 48, borderRadius: 24 }}
      />

      <View style={{ marginStart: 9 }}>

        <Text
          style={[
            styles.textStyle,
            { fontSize: 16, fontWeight: '600' },
          ]}>
          <Image
            source={appIcons.china}
            style={{
              width: 18,
              height: 18,
              marginTop: 5,
            }}
            resizeMode="cover"
          />{item.userName}
        </Text>

        <Text
          style={[
            styles.textStyle,
            { fontSize: 14, color: colors.grey919191, marginTop: 1 },
          ]}>
          {'Как я могу вам помочь?'}
        </Text>
      </View>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Text
        style={[
          styles.textStyle,
          { fontSize: 12, color: colors.greyC4C4C4, marginEnd: 5, marginTop: 4 },
        ]}>
        {"15:04"}
      </Text>


      {item == 1 ? <LinearGradient
        colors={["#F7B733", "#FC4A1A"]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 4
        }}
      >
        <Text
          style={[
            styles.textStyle,
            { fontSize: 12, color: colors.white },
          ]}>
          {"51"}
        </Text>
        {/* <TextInput placeholder="+91" style={{flex:1, justifyContent:'center', alignItems:'center'}}/> */}
      </LinearGradient> : null}
      {/* <Count style={{ marginTop: 14, justifyContent: 'center', alignItems: 'center' }} >


      </Count> */}
    </View>

  </TouchableOpacity>
}


const TopBar = () => {

  return <Card
    style={{
      elevation: 2,
      paddingHorizontal: 13,
      paddingEnd: 12,
      borderRadius: 13,
      backgroundColor: colors.white,
      borderTopEndRadius: 0,
      borderTopStartRadius: 0,
      paddingTop: Platform.OS == 'ios' ? 20 : 20,
      paddingBottom: 5,
      marginBottom: 4
    }}><View style={[style.topBarView]}>

      <View style={[style.rowDirectionCenter, {}]}>
        <Text
          style={[
            styles.textStyle,
            { fontSize: 21, fontWeight: 'bold', marginEnd: 12.5 },
          ]}>
          {AppString.chat}<Text
            style={[
              styles.textStyle,
              { fontSize: 15 },
            ]}>
            {' (34)'}
          </Text>
        </Text>

        <TouchableOpacity onPress={() => {

        }} style={[style.rowDirectionCenter, { marginTop: 8, gap: 4.5 }]}>
          <ClearIcon />
          <Text
            style={[
              styles.textStyle,
              { fontSize: 14, color: colors.grey9E9791 },
            ]}>
            {AppString.clear}
          </Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity onPress={() => {

      }}>
        <AddIcon />
      </TouchableOpacity>
    </View>

    <SearchView />


  </Card>
}




const SearchView = () => {
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.whiteF7F7F7,
        borderRadius: 19,
        marginTop: 10.5,
      }}>
      <SearchIcon
        width={17}
        height={17}
        style={{ marginStart: 15 }}
        color={colors.grey}
      />
      <TextInput
        value={search}
        placeholder={AppString.search}
        style={style.searchTextInput}
        placeholderTextColor={colors.grey}
        onChangeText={text => {
          setSearch(text);
        }}
      />
    </View>
  );
};


export default MessagesScreen

const style = StyleSheet.create({
  topBarView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row', paddingStart: 7, paddingEnd: 2.5
  },
  rowDirectionCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  searchTextInput: {
    height: 33,
    width: '100%',
    marginStart: 11,
    fontWeight: '400',
    fontSize: 15,
    paddingVertical: 0
  }

});