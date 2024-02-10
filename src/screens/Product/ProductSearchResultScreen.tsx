import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {colors} from '../../utils/AppColors';
import {useEffect, useState} from 'react';
import {styles} from '../../utils/AppStyles';
import {dimensions} from '../../utils/sizes';
import MasonryList from '@react-native-seoul/masonry-list';
import {appIcons, imagesUrl} from '../../utils/AppIcons';
import {RouteNames} from '../../utils/RouteNames';
import LinearGradient from 'react-native-linear-gradient';
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import FunnelGrayOutlineIcon from '../../../assets/Icons/funnelOutlineGrey.svg';
import CaretDownIcon from '../../../assets/Icons/DropDown.svg';
import ChevronDownOutlineIcon from '../../../assets/Icons/chevronDownOutlline.svg';
import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import {CustomHeaderWithoutBackgroundSearch} from '../../components/Header';
import CheckmarkOutline from '../../../assets/Icons/CheckOrange.svg';
import {fontFamily} from '../../utils/Fonts';
import {AppString} from '../../utils/AppStrings';
import FilterBottomSheet from './FilterBottomSheet';
import {useRoute} from '@react-navigation/native';

const categoryData = [
  {id: 1, desc: 'Jackets'},
  {id: 2, desc: 'Tops'},
  {id: 3, desc: 'Child'},
  {id: 4, desc: 'Baby'},
  {id: 5, desc: 'Home'},
  {id: 6, desc: 'Electro'},
  {id: 7, desc: 'Auto'},
  {id: 8, desc: 'Home'},
  {id: 9, desc: 'Beauty'},
  {id: 10, desc: 'Suits'},
  {id: 11, desc: 'Accesso'},
  {id: 12, desc: 'Make-Up'},
];

const data = [
  {
    id: 1,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 2,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 3,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 4,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 5,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 6,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 7,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 8,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 9,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
  {
    id: 10,
    imageURL: appIcons.shoeImageURL,
    desc: '600+ просмотров Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  },
];
export const ProductSearchResultScreen = ({navigation, route}) => {
  const [select, setSelect] = useState(-1);
  const [selectUpdate, setSelectUpdate] = useState(-1);
  const [showFilter, setShowFilter] = useState(false);

  const {categoryID, routeName} = route.params;

  useEffect(() => {
    console.log('categoryID', categoryID);
    console.log('routeName', routeName);
  }, []);

  const sortBy = [
    {id: 1, desc: 'Все'},
    {id: 2, desc: 'Хиты'},
    {id: 3, desc: 'Цена'},
  ];
  const filter = [
    {id: 1, desc: 'Country'},
    {id: 2, desc: 'Brand'},
    {id: 3, desc: 'Material'},
    {id: 4, desc: 'Style'},
    {id: 5, desc: 'Sleeve Length'},
  ];

  const [selectedSortBy, setSortBy] = useState(1);

  return (
    <View style={[styles.container, {padding: 0}]}>
      <CustomHeaderWithoutBackgroundSearch navigation={navigation} />
      <View style={style.container}>
        {route.params && route.params.isRoute ? null : (
          <CategoriesList navigation={navigation} />
        )}

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: colors.white,
            alignItems: 'center',
            paddingStart: 20,
            paddingEnd: 21,
            paddingTop: 6,
            borderTopStartRadius: 13,
            borderTopEndRadius: 13,
            marginTop: route.params && route.params.isRoute ? undefined : 9,
          }}>
          <FlatList
            style={style.primaryCategoriesContent}
            showsHorizontalScrollIndicator={false}
            data={sortBy}
            horizontal
            keyExtractor={item => {
              return item.id.toString();
            }}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1, marginRight: 52}}>
                  <TouchableOpacity onPress={() => setSortBy(item.id)}>
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          selectedSortBy === item.id ? '#ff7600' : '#666666',
                      }}>
                      {item.desc}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowFilter(true);
            }}>
            <FunnelGrayOutlineIcon
              width={15}
              height={15}
              color={colors.black666666}
              style={{marginTop: 10}}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            paddingTop: 15.5,
            width: Dimensions.get('window').width,
          }}>
          <FlatList
            data={filter}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{marginHorizontal: 8}}
            keyExtractor={item => {
              return item.id.toString();
            }}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setSelect(index);
                      setSelectUpdate(-1);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingStart: 10.5,
                      paddingEnd: 18.4,
                      marginRight: 8,
                      backgroundColor: '#F6F6F6',
                      borderRadius: select == index ? 0 : 20,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                      height: 32,
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        color: colors.black666666,
                      }}>
                      {item.desc}
                    </Text>
                    <CaretDownIcon
                      width={8}
                      height={8}
                      style={{marginLeft: 4}}
                    />
                  </TouchableOpacity>

                  {select == index ? (
                    <View
                      style={{
                        backgroundColor: '#F6F6F6',
                        height: 8,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        marginTop: -4,
                        marginRight: 6,
                        marginStart: -2,
                      }}
                    />
                  ) : null}
                </View>
              );
            }}
          />
          {select != -1 ? (
            <View>
              <FlatList
                data={['Китай', 'Таджикистан', 'Турция']}
                numColumns={2}
                style={{
                  backgroundColor: '#F6F6F6',
                  padding: 15,
                  borderTopRightRadius: 13,
                  borderTopLeftRadius: 13,
                  paddingTop: 0,
                }}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectUpdate(index);
                    }}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      flex: 0.5,
                      marginTop: 15,
                    }}>
                    {select == 0 ? (
                      <Image
                        source={appIcons.china}
                        style={{height: 15, width: 15, borderRadius: 8}}
                      />
                    ) : null}
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          marginStart: 4,
                          fontSize: 13,
                          color:
                            selectUpdate == index
                              ? colors.lightOrange
                              : colors.balc111111,
                        },
                      ]}>
                      {item}
                    </Text>
                    {selectUpdate == index ? (
                      <CheckmarkOutline
                        width={11}
                        height={9}
                        style={{marginStart: 2}}
                      />
                    ) : null}
                  </TouchableOpacity>
                )}
              />

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingHorizontal: 12,
                  marginTop: 6,
                }}>
                <CommonButton
                  startorange="#FCD82F"
                  endColor="#FDCA30"
                  text={AppString.reset}
                  onClick={() => {}}
                />
                <CommonButton
                  startorange="#FE8C00"
                  endColor="#FC4A1A"
                  borderBottomStartRadius={0}
                  borderBottomEndRadius={20}
                  borderTopEndRadius={20}
                  borderTopStartRadius={0}
                  onClick={() => {}}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={[style.productsGrid]}>
          <MasonryList
            data={data}
            keyExtractor={item => {
              return item.id;
            }}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            style={{marginHorizontal: 4}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    backgroundColor: '#ffffff',
                    marginHorizontal: 4.5,
                    marginBottom: 20,
                    width: 'auto',

                    borderColor: '#f1f1f1',
                    marginTop: 5,
                  }}
                  onPress={() => {
                    navigation.navigate(RouteNames.product_detail);
                  }}>
                  <Image
                    source={appIcons.shoeImageURL}
                    style={{
                      height: 265,
                      paddingHorizontal: 1,
                      width: 'auto',
                      borderRadius: 13,
                      backgroundColor: '#f1f1f1',

                      marginBottom: 8,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      paddingLeft: 7,
                    }}>
                    <Image
                      source={appIcons.china}
                      style={{height: 15, width: 15, marginTop: 3}}
                    />
                    <Text
                      style={{
                        marginLeft: 4,
                        fontSize: 13,
                        fontWeight: '500',
                        color: colors.black,
                      }}
                      numberOfLines={1}>
                      Футболка
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 8,
                      marginTop: 4,
                    }}>
                    <View style={{flexDirection: 'row', width: '30%'}}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#ff7600',
                          fontWeight: '500',
                        }}>
                        999
                      </Text>
                      <Text
                        style={{
                          paddingTop: 6,
                          color: '#ff7600',
                          fontSize: 12,
                          fontWeight: '500',
                        }}>
                        c.
                      </Text>
                    </View>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: '70%',
                        color: '#AAAAAA',
                        paddingTop: 3,
                      }}>
                      {item.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
      <FilterBottomSheet
        isShow={showFilter}
        onClose={() => {
          setShowFilter(false);
        }}
      />
    </View>
  );
};

const CategoriesList = ({navigation}) => {
  const [activeItemPrimaryCategory, setActiveItemPrimaryCategory] = useState(1);

  return (
    <View
      style={{height: 137, backgroundColor: colors.white, borderRadius: 13}}>
      <View style={styles.primaryCategories}>
        <FlatList
          style={styles.primaryCategoriesContent}
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({item}) => {
            return (
              <View style={{flex: 1, marginRight: 22}}>
                <TouchableOpacity
                  onPress={() => setActiveItemPrimaryCategory(item.id)}>
                  <Text
                    style={{
                      fontSize: 16,
                      color:
                        activeItemPrimaryCategory === item.id
                          ? '#ff7600'
                          : 'black',
                    }}>
                    {item.desc}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        <View style={styles.downArrowButton}>
          <LinearGradient
            colors={[colors.whiteF2F2F2, colors.whiteF6F6F6]}
            start={{x: 0.4, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              height: 20,
              width: 4,
              backgroundColor: '#7E7D7D29',
              borderRadius: 100,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.push(RouteNames.categories);
            }}
            style={{marginStart: -10}}>
            <ChevronDownOutlineIcon width={46} height={46} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={['3rd level', 'Thicken', 'Zipper', 'Zipper', 'Zipper']}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginStart: 8}}
        keyExtractor={item => {
          return item.toString();
        }}
        renderItem={({item}) => (
          <TouchableOpacity style={{marginEnd: 8, gap: 2}}>
            <Image
              source={{uri: imagesUrl.shoes}}
              style={{height: 70, width: 70, borderRadius: 18}}
            />
            <Text
              style={{
                fontSize: 15,
                color: colors.black,
                alignSelf: 'center',
              }}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export const CommonButton = ({
  text = AppString.ok,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  onClick,
  borderTopEndRadius = 0,
  borderTopStartRadius = 20,
  borderBottomEndRadius = 0,
  borderBottomStartRadius = 20,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: '50%',
      }}
      onPress={onClick}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{x: 0.4, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          borderTopLeftRadius: borderTopStartRadius,
          borderTopRightRadius: borderTopEndRadius,
          borderBottomRightRadius: borderBottomEndRadius,
          borderBottomLeftRadius: borderBottomStartRadius,
          height: 34,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.textStyle,
            {color: colors.white, fontWeight: 'bold', fontSize: 14},
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
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
        width: '96%',
        marginStart: 10,
        height: 33,
      }}>
      {/* <SearchIcon
        width={17}
        height={17} style={{ marginStart: 15 }} /> */}

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

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    alignSelf: 'center',
  },

  primaryCategoriesContent: {
    paddingTop: 8,

    backgroundColor: '#ffffff',
    borderTopLeftRadius: 13,
  },

  productsGrid: {
    width: Dimensions.get('window').width,
    flex: 1,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  searchTextInput: {
    height: 33,
    marginStart: 11,
    fontSize: 15,
    padding: 0,
    paddingHorizontal: 5,
    fontWeight: '400',
  },
});
