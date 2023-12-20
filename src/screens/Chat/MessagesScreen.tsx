import { FlatList, Image, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
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

const MessagesScreen = ({ navigation }) => {

  const rightButtons = () => {

    return <View style={[style.rowDirectionCenter, {
      justifyContent: 'space-around',
      width: 222,
      backgroundColor: '#F0F0F0'
    }]}>
      <TouchableOpacity><ChatSettingIcon /></TouchableOpacity>
      <TouchableOpacity><UploadIcon /></TouchableOpacity>
      <TouchableOpacity><DeleteIcon /></TouchableOpacity>

    </View>
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View style={[styles.container, { padding: 0 }]}>
        <TopBar />

        <View style={[styles.container, { padding: 0 }]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: colors.white }}
            data={[1, 2, 4, 5, 6, 7, 8, 23, 9, 0]}
            renderItem={({ item, index }) =>
              <Swipeable renderRightActions={rightButtons}>
                <View>
                  <UserChatListItem item={item} onClick={() => {
                    navigation.navigate(RouteNames.chat_screen)
                  }} />
                  <View style={{ height: 0.8, backgroundColor: colors.whiteF0F0F0, marginStart: 68, marginTop: 14 }} />
                </View>
              </Swipeable>
            }
          />

        </View>
        <TouchableOpacity style={{
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
          />{' Поддержка'}
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