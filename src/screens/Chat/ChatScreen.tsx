import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import { styles } from '../../utils/AppStyles';
import { colors } from '../../utils/AppColors';
import { StyleSheet } from 'react-native';
import { dimensions } from '../../utils/sizes';
import { imagesUrl } from '../../utils/AppIcons';
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

export const ChatScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Shop name',
      headerTitleAlign: 'left',
      headerStyle: {
        backgroundColor: colors.whiteF6F6F6,
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            {/* <Ionicons name="gift-outline" size={24} /> */}
            <ShopGrey />
          </TouchableOpacity>
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

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: 100,
          backgroundColor: colors.whiteF2F2F2,
        },
      ]}>
      <FlatList
        style={{ flex: 1 }}
        data={[1, 2]}
        keyExtractor={item => {
          return item.toString();
        }}
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
            {index % 2 == 0 ? (
              <LeftInflate item={item} />
            ) : (
              <SendProductDetailsInflate item={item} />
            )}
          </View>
        )}
      />

      <ProfileProduct subTitle="" onClick={undefined} />

      <View style={style.textInputWithSend}>
        <SearchView />
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate(RouteNames.chat_screen)
            }}
            style={style.circleButton}>
            <HappyOutlineIcon width={37} height={37} />
          </TouchableOpacity>
          <TouchableOpacity style={style.circleButton}>
            <AddOutlineIcon width={37} height={37} />
          </TouchableOpacity>
        </View>
      </View>
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
          {'Welcome \n\nText'}
        </Text>
      </View>
    </View>
  );
};

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
          {'Welcome \n\nText'}
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

const SearchView = () => {
  const [search, setSearch] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        borderRadius: 19,
      }}>
      <TextInput
        value={search}
        placeholder={''}
        style={style.searchTextInput}
        placeholderTextColor={colors.grey}
        onChangeText={text => {
          setSearch(text);
        }}
      />
    </View>
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
          width: dimensions.width - 20,
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
    width: dimensions.width,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 42,
    paddingTop: 8,
    flexDirection: 'row',
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    paddingHorizontal: 12,
  },
  searchTextInput: {
    height: 33,
    width: '71%',
    marginStart: 11,
    fontFamily: fontFamily.regular,
    fontSize: 15,
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
    width: dimensions.width / 1.5,
  },
});

export default ChatScreen;
