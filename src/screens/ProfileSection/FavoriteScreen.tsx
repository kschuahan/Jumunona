import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from '../../utils/AppStyles';
import {imagesUrl} from '../../utils/AppIcons';
import {colors} from '../../utils/AppColors';
import {AppString} from '../../utils/AppStrings';
import {Card} from 'react-native-paper';
import {useState} from 'react';
import {fontFamily} from '../../utils/Fonts';

import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import CheckmarkOutline from '../../../assets/Icons/CheckOrange.svg';
import CreateOutline from '../../../assets/Icons/EditItem.svg';

import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import {getAPICall, postAPICall} from '../../Netowork/Apis';
import {ProductAPIs, categoriesModule} from '../../Netowork/Constants';
import {CenterProgressView, ClearChatPopup} from '../../components/Dialogs';
import {CommonModal} from '../HomeScreen';
import {RouteNames} from '../../utils/RouteNames';
import CircleGreyDot from '../../../assets/Icons/CircleGreyDot.svg';

const categories = ['New', 'Womens', 'Mens', '内衣', '鞋靴', '箱包', '美妆'];
const products = [
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
  {title: 'v 29.9', isSelected: false},
];

export const FavoriteScreen = ({navigation}) => {
  const [pos, setPos] = useState(0);
  const [edit, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favlist, setFavList] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<CommonModal>();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [reloadFav, setReload] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [show, isShow] = useState(false);

  useEffect(() => {
    callCategoryAPI();
    getFavList();
  }, []);

  const getFavList = () => {
    setLoading(true);
    getAPICall(ProductAPIs.getFavourite + selectedCategory, (res: any) => {
      if (res.isSuccess) {
        if (res.data.data) {
          let data = res.data.data.map(it => {
            return {data: it, isSelected: false};
          });
          setFavList(data);
        } else {
          setFavList([]);
        }
      } else {
        setFavList([]);
      }
      setSelectAll(false);
      setLoading(false);
    });
  };

  const callCategoryAPI = () => {
    getAPICall(categoriesModule.getCategories, (res: any) => {
      if (res.data.data != undefined) {
        if (res.data.data.length > 0) {
          const allCategory = {_id: '', categoryName: 'Все'};
          res.data.data.splice(0, 0, allCategory);
        }
      }
      setCategoryData(res);
    });
  };

  const removeFav = (ids: Array<any>) => {
    setLoading(true);
    postAPICall(
      {productId: ids},
      ProductAPIs.removeFavourite,
      true,
      (res: any) => {
        if (res.isSuccess) {
          setEditing(!edit);
          setFavList(
            favlist.filter(it => {
              return !ids.includes(it.data._id);
            }),
          );
          setReload(!reloadFav);
        }
        setLoading(false);
      },
    );
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.whiteF7F7F7, padding: undefined},
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{alignItems: 'center'}}>
            <ChevronBackOutline width={15} height={15} />
          </TouchableOpacity>
          <Text style={[styles.textStyle, {fontSize: 21, fontWeight: 'bold'}]}>
            {AppString.want_to}{' '}
            <Text style={[styles.textStyle, {fontSize: 21}]}>{'(281)'}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              setEditing(!edit);
            }}
            style={{alignItems: 'center'}}>
            {edit ? (
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
      {
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
          {categoryData && categoryData.isSuccess ? (
            <FlatList
              style={{width: '30%', backgroundColor: colors.whiteF7F7F7}}
              data={categoryData.data.data}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    setPos(index);
                    setSelectedCategory(item._id);
                    getFavList();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 15,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        fontSize: 16,
                        color: pos == index ? colors.lightOrange : colors.grey,
                        textAlign: 'center',
                      },
                    ]}>
                    {item.categoryName}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : null}
          {favlist.length > 0 || loading ? (
            <FlatList
              style={{width: '80%', marginTop: 8, marginStart: 10}}
              data={favlist}
              keyExtractor={item => {
                return item.data._id.toString();
              }}
              numColumns={3}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.push(RouteNames.product_detail, {
                      id: item.data._id,
                    });
                  }}
                  style={{
                    flex: 1 / 3,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={{
                      uri:
                        item.data.images != ''
                          ? item.data.images
                          : imagesUrl.shoes,
                    }}
                    style={{height: 80, width: 80, borderRadius: 5}}
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      {fontSize: 14, color: colors.lightOrange, marginTop: 2},
                    ]}>
                    ¥ {item.data.price}
                  </Text>
                  {edit ? (
                    <TouchableOpacity
                      onPress={() => {
                        favlist[index].isSelected = !favlist[index].isSelected;
                        if (!favlist[index].isSelected && selectAll) {
                          setSelectAll(false);
                        }
                        setReload(!reloadFav);
                      }}
                      style={{position: 'absolute', end: 15, top: 2}}>
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
                      <Ionicons
                        name={
                          item.isSelected
                            ? 'checkmark-circle'
                            : 'ellipse-outline'
                        }
                        size={17}
                        color={
                          item.isSelected ? colors.endOrange : colors.white
                        }
                      />
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={[
                styles.textStyle,
                {
                  fontSize: 14,
                  width: '70%',
                  marginHorizontal: 8,
                  color: colors.lightOrange,
                  textAlign: 'center',
                  alignSelf: 'center',
                },
              ]}>
              No products in your favourite list.
            </Text>
          )}
        </View>
      }

      {/* Bottom View */}

      {edit ? (
        <View
          style={{
            height: 80,
            paddingTop: 10,
            paddingLeft: 25,
            paddingRight: 11,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            shadowColor: '#0000000D',
            shadowOpacity: 1,
            shadowOffset: {width: 0, height: -3},
            backgroundColor: colors.white,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <RadioButtons
                isCheck={selectAll}
                onClick={() => {
                  setSelectAll(!selectAll);
                  if (favlist != undefined) {
                    const newList = favlist.map(it => {
                      it.isSelected = !selectAll;
                      return it;
                    });

                    setFavList(newList);
                    setReload(!reloadFav);
                  }
                }}
              />
              <Text
                style={{
                  fontSize: 13,
                  color: '#8b8b8b',
                  fontFamily: '400',
                  marginStart: 4,
                }}>
                {AppString.choose_all}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 12,
              }}>
              <TouchableOpacity
                style={{
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1,
                  borderColor: '#CCCCCC',
                  paddingLeft: 16,
                  paddingRight: 10,
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {fontSize: 14, fontWeight: '400', color: colors.balc111111},
                  ]}>
                  {AppString.add_to_cart}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 34,
                  borderRadius: 17,
                  borderWidth: 1,
                  borderColor: colors.lightOrange,
                  paddingLeft: 16,
                  paddingRight: 10,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  const ids = favlist
                    .filter(it => {
                      return it.isSelected;
                    })
                    .flatMap(it => {
                      return it.data._id;
                    });
                  if (ids.length > 0) {
                    isShow(true);
                  }
                  console.warn(ids);
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 14,
                      fontWeight: '400',
                      color: colors.lightOrange,
                    },
                  ]}>
                  {AppString.delete}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      {loading ? <CenterProgressView /> : null}

      <ClearChatPopup
        title="are you sure you want to remove the products"
        isShow={show}
        onConfirm={() => {
          const ids = favlist
            .filter(it => {
              return it.isSelected;
            })
            .flatMap(it => {
              return it.data._id;
            });
          removeFav(ids);
          isShow(false);
        }}
        onCancel={() => {
          isShow(false);
        }}
      />
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
        style={{marginStart: 15}}
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
    paddingVertical: 0,
  },
});

export const RadioButtons = ({isCheck = false, onClick, size = 22}) => {
  return true ? (
    <TouchableOpacity onPress={onClick}>
      {isCheck ? (
        <CheckmarkCircle
          width={size}
          height={size}
          color={colors.lightOrange}
        />
      ) : (
        <EllipsisHorizontalNormal width={size} height={size} />
      )}
    </TouchableOpacity>
  ) : null;
};
