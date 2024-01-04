import { TouchableOpacity, View, FlatList, Text, TextInput, StyleSheet, Platform } from 'react-native';
import { styles } from '../../utils/AppStyles';
import React, { useEffect, useState } from 'react';
import { RouteNames } from '../../utils/RouteNames';
import { AppString } from '../../utils/AppStrings';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import ChevronFwdOutlineIcon from '../../../assets/Icons/ForwardBlack.svg';
import ImageIcon from '../../../assets/Icons/image-outline.svg';
import { CustomHeader } from '../../components/Header';
import CartIcon from '../../../assets/Icons/Carts.svg';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import { Card } from 'react-native-paper';

const categories = [
  "Women's",
  "Men's",
  'Baby',
  'Home',
  '美妆',
  '电器',
  '家具',
  '玩具',
  '配饰',
  '内衣',
  '鞋靴',
  '汽车用品',
];
const products = [
  { title: 'coat', isSelected: false },
  { title: '3 category', isSelected: false },
  { title: 'Jacket', isSelected: false },
  { title: 'Cotton clothes', isSelected: false },
  { title: 'down jacket', isSelected: false },
  { title: 'leather coat', isSelected: false },
  { title: '棒球服', isSelected: false },
  { title: '西装', isSelected: false },
  { title: 'PU皮衣', isSelected: false },
];

export const ShopCategoriesScreen = ({ navigation }) => {
  const [pos, setPos] = useState(0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',

      headerRight: () => (
        <View style={{
          flexDirection: 'row', gap: 34, alignItems: 'center', marginBottom: -2
        }}>
          {/* <TouchableOpacity
            onPress={() => {
              onShare();
            }}
            style={{ alignItems: 'center', marginStart: -20 }}>
            <Share />
          </TouchableOpacity> */}

          <TouchableOpacity onPress={() => {
            navigation.navigate(RouteNames.cartScreen)
          }} style={{ alignItems: 'center', marginStart: -20 }}>
            <CartIcon />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center', marginStart: -20 }}>
            <EllipsisHorizontal width={24} height={24} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginBottom: -2

          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{ alignItems: 'center', marginStart: -25, marginEnd: 5 }}>
            <ChevronBackOutline width={15} height={15} />
          </TouchableOpacity>

          <SearchView />
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.white,
      },

      headerShadowVisible: false,
    });
  }, []);

  return (
    <View style={[styles.container, { padding: 0 }]}>
      {/* <CustomHeader navigation={navigation} title={AppString.categories} /> */}
      <ToolbarWithSearch navigation={navigation} onClick={() => { }}  />

      <View style={[styles.container, { paddingEnd: 6, backgroundColor: undefined }]}>
        <View
          style={[
            styles.container,
            { flexDirection: 'row', padding: undefined, backgroundColor: undefined },
          ]}>
          <FlatList
            style={{ width: '22%', marginTop: -10 }}
            data={categories}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setPos(index);
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 17.25,
                  marginTop: index == 0 ? 13 : 17.25
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 16,
                      color:
                        pos == index ? colors.lightOrange : colors.black444444,
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            style={{ width: '78%', marginTop: -14 }}
            data={[
              { title: 'Jackets', product: products },
              { title: 'Tops', product: products },
              { title: 'Joggers', product: products },
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  backgroundColor: colors.white,
                  marginTop: 9,
                  paddingBottom: 9.5,
                  borderRadius: 11,
                }}>
                <TextWithIcon
                  title={item.title}
                  onClick={() => {
                    navigation.push(RouteNames.product_search_screen);
                  }}
                />
                <FlatList
                  data={products}
                  keyExtractor={item => {
                    return item.toString();
                  }}
                  numColumns={3}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        flex: 1 / 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 11,
                      }}
                      onPress={() => {
                        navigation.push(RouteNames.product_search_screen, {
                          isRoute: true,
                        });
                      }}>
                      <ImageIcon width={66} height={66} />
                      {/* <Image
                      source={{uri: imagesUrl.jacket}}
                      style={{height: 66, width: 66}}
                    /> */}
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 13,
                            color: colors.balc111111,
                            marginTop: 2.5,
                          },
                        ]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};



const ToolbarWithSearch = ({ navigation, onClick }) => {
  const [selectedSortBy, setSortBy] = useState(1);

  return <Card
    style={{
      elevation: 0,
      paddingHorizontal: 6,
      paddingEnd: 6,
      borderRadius: 13,
      backgroundColor: colors.white,
      borderTopEndRadius: 0,
      borderTopStartRadius: 0,
      paddingTop: Platform.OS == 'ios' ? 20 : 20,
      paddingBottom: 5,
      marginBottom: 4
    }}>
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%',
      paddingEnd: 6
    }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginStart: 6
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ alignItems: 'center', marginEnd: 10 }}>
          <ChevronBackOutline width={15} height={15} />
        </TouchableOpacity>

        <SearchView />
      </View>
      <View style={{
        flexDirection: 'row', gap: 15, alignItems: 'center', marginStart: -25
      }}>
        {/* <TouchableOpacity
                  onPress={() => {
                      onShare();
                  }}
              >
                  <Share />
              </TouchableOpacity> */}

        <TouchableOpacity onPress={() => {
          navigation.navigate(RouteNames.cartScreen)
        }} >
          <CartIcon />
        </TouchableOpacity>
        <TouchableOpacity >
          <EllipsisHorizontal width={24} height={24} />
        </TouchableOpacity>
      </View>
    </View>


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
        backgroundColor: colors.whiteF6F6F6,
        borderRadius: 19,
        width: '83%'
      }}>
      {/* <Ionicons
        name="search"
        size={17}
        style={{marginStart: 15}}
        color={colors.grey}
      /> */}
      <SearchIcon width={15} height={15} style={{ marginStart: 15 }}
      />

      <TextInput
        value={search}
        placeholder={'Футболки'}
        style={style.searchTextInput}
        placeholderTextColor={colors.grey}
        onChangeText={text => {
          setSearch(text);
        }}
      />
    </View>
  );
};

const TextWithIcon = ({ title = 'Jackets', padding = 10, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: undefined,
          alignItems: 'center',
          paddingTop: 10,
          paddingHorizontal: 20,
        },
      ]}>
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 15,
            fontWeight: '500',
            fontFamily: undefined,
            color: colors.black222222,
          },
        ]}>
        {title}
      </Text>
      <ChevronFwdOutlineIcon color={colors.black} width={12} height={12} />
    </TouchableOpacity>
  );
};



const style = StyleSheet.create({
  searchTextInput: {
    height: 33,
    marginStart: 4,
    fontFamily: 'SegoeUI',
    fontSize: 15,
    padding: 0,
    width: '80%'
  },
  primaryCategoriesContent: {
    paddingTop: 8,
    paddingLeft: 16,
    flex: 0.9,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
  },
  button: {
    marginTop: 10,
    marginBottom: 12,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 100,
    borderWidth: 0.8,
    borderColor: colors.lightOrange,
  },
});
