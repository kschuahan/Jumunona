import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import React from 'react';
import { styles } from '../../utils/AppStyles';
import { imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { AppString } from '../../utils/AppStrings';
import { Card } from 'react-native-paper';
import { useState } from 'react';
import { fontFamily } from '../../utils/Fonts';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import CheckmarkOutline from '../../../assets/Icons/CheckOrange.svg';
import CreateOutline from '../../../assets/Icons/EditItem.svg';

import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';

const categories = ['New', 'Womens', 'Mens', '内衣', '鞋靴', '箱包', '美妆'];
const products = [
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
  { title: 'v 29.9', isSelected: false },
];

export const FavoriteScreen = ({ navigation }) => {
  const [pos, setPos] = useState(0);

  const [select, setSelect] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.whiteF7F7F7, padding: undefined },
      ]}>
      <Card
        style={{
          elevation: 2,
          paddingHorizontal: 13,
          backgroundColor: colors.white,
          borderTopEndRadius: 0,
          borderTopStartRadius: 0,
          marginBottom: 5,
          paddingTop: Platform.OS == 'ios' ? 20 : 25,
          paddingBottom: 5,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: 'center' }}>
            <ChevronBackOutline width={15} height={15} />
          </TouchableOpacity>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 21, fontWeight: 'bold' },
            ]}>
            {AppString.want_to} <Text
              style={[
                styles.textStyle,
                { fontSize: 21 },
              ]}>
              {'(281)'}
            </Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              //setSelect(!select)
            }}
            style={{ alignItems: 'center' }}>
            {select ? (
              <CheckmarkOutline
                width={19}
                height={14}
                color={colors.lightOrange}
              />
            ) : (
              <CreateOutline
                width={15}
                height={15}
                color={colors.black666666}
              />
            )}
            {/* <Ionicons
              name={select ? 'checkmark-outline' : 'create-outline'}
              color={select ? colors.lightOrange : colors.black666666}
              size={24}
            /> */}
          </TouchableOpacity>
        </View>
        <SearchView />
      </Card>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.white,
            flexDirection: 'row',
            padding: undefined,
            marginTop: -4,
          },
        ]}>
        <FlatList
          style={{ width: '30%', backgroundColor: colors.whiteF7F7F7 }}
          data={categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setPos(index);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 16,
                    color: pos == index ? colors.lightOrange : colors.grey,
                  },
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        <FlatList
          style={{ width: '80%', marginTop: 8, marginStart: 10 }}
          data={products}
          keyExtractor={item => {
            return item.toString();
          }}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flex: 1 / 3,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginBottom: 20,
              }}>
              <Image
                source={{ uri: imagesUrl.shoes }}
                style={{ height: 80, width: 80, borderRadius: 5 }}
              />
              <Text
                style={[
                  styles.textStyle,
                  { fontSize: 14, color: colors.lightOrange, marginTop: 2 },
                ]}>
                {item.title}
              </Text>
              {select ? (
                <TouchableOpacity
                  onPress={() => { }}
                  style={{ position: 'absolute', end: 10, top: 2 }}>
                  {item.isSelected ? (
                    <CheckmarkCircle
                      width={17}
                      height={17}
                      color={colors.endOrange}
                    />
                  ) : (
                    <EllipsisHorizontalNormal
                      width={17}
                      height={17}
                      color={colors.white}
                    />
                  )}
                  {/* <Ionicons
                    name={
                      item.isSelected ? 'checkmark-circle' : 'ellipse-outline'
                    }
                    size={17}
                    color={item.isSelected ? colors.endOrange : colors.white}
                  /> */}
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
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
        backgroundColor: colors.whiteF7F7F7,
        borderRadius: 19,
        marginTop: 8,
      }}>
      <SearchIcon
        width={17}
        height={17}
        style={{ marginStart: 15 }}
        color={colors.grey}
      />
      <TextInput
        value={search}
        placeholder={AppString.city_name}
        style={style.searchTextInput}
        placeholderTextColor={colors.grey}
        onChangeText={text => {
          setSearch(text);
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  searchTextInput: {
    height: 33,
    width: '100%',
    marginStart: 11,
    fontFamily: fontFamily.regular,
    fontSize: 15,
    paddingVertical: 0
  },
});
