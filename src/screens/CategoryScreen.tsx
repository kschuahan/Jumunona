import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import React, {useEffect, useState} from 'react';
import MasonryList from '@react-native-seoul/masonry-list';
import {colors} from '../utils/AppColors';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily} from '../utils/Fonts';
import SearchIcon from '../../assets/Icons/searchIcon.svg';
import ChevronDownOutline from '../../assets/Icons/chevronDownOutlline.svg';
import EllipsisHorizontal from '../../assets/Icons/ellipsis-horizontal.svg';
import EllipsisHorizontalGrey from '../../assets/Icons/EllipsisGrey.svg';
// import HoodieIcon from '../../assets/Icons/hoodieIcon.svg';
import ImageIcon from '../../assets/Icons/image-outline.svg';
import {RouteNames} from '../utils/RouteNames';
import {appIcons} from '../utils/AppIcons';
import {getAPICall} from '../Netowork/Apis';
import {categoriesModule, ProductAPIs} from '../Netowork/Constants';
import {ProgressView, RetryWhenErrorOccur} from '../components/Dialogs';

interface CommonModal {
  isSuccess: boolean;
  data: any;
}

interface PagingData {
  total: number;
  remaining: number;
  current: number;
  pages: number;
}

const HeaderCategoryScreen = () => (
  <View style={styles.headerContainer}>
    <View style={styles.searchBarBG}>
      <SearchIcon width={17} height={17} style={styles.searchIcon} />
      <TextInput style={styles.searchInput} placeholder="Suggested Category" />
    </View>
  </View>
);

const CategoryScreen: React.FC = ({navigation}) => {
  const [productsData, setProductsData] = useState<CommonModal>();
  const [pagingData, setPagingData] = useState<PagingData>();
  const [loading, setLoading] = useState(false);
  const [productsDataArray, setProductsDataArray] = useState<Array<any>>([]);
  const [horizontalCategoryData, setHorizontalCategoryData] =
    useState<CommonModal>();
  const [activeItemPrimaryCategory, setActiveItemPrimaryCategory] =
    useState<string>('');
  const [activeItemSubCategories, setActiveItemSubCategories] = useState();

  const callhorizontalCategoryAPI = () => {
    setLoading(true);
    getAPICall(
      categoriesModule.getCategoriesListForCategoriesScreen,
      (response: any) => {
        setHorizontalCategoryData(response);
        // Assuming the first category is always available
        setActiveItemPrimaryCategory(response?.data.data[0]._id);
        setActiveItemSubCategories(response?.data.data[0].subCategories);
      },
    );
  };
  const callAPI = (page = 1) => {
    setLoading(true);
    getAPICall(ProductAPIs.getProducts + `${page}`, (response: any) => {
      if (response.isSuccess) {
        setPagingData(response.data.data.pages);
        setProductsDataArray([
          ...productsDataArray,
          ...response.data.data.products,
        ]);
        setProductsData(response);
      }
    });
    setLoading(false);
  };
  useEffect(() => {
    callhorizontalCategoryAPI();
    callAPI();
  }, []);

  const fetchMore = () => {
    if (
      productsData?.isSuccess &&
      pagingData &&
      pagingData?.pages > pagingData?.current
    ) {
      callAPI(pagingData.current + 1);
    }
  };

  return horizontalCategoryData &&
    activeItemPrimaryCategory &&
    activeItemSubCategories &&
    productsData &&
    productsDataArray ? (
    <View style={styles.container}>
      <HeaderCategoryScreen />
      {horizontalCategoryData ? (
        <View style={styles.primaryCategories}>
          <FlatList
            style={styles.primaryCategoriesContent}
            data={horizontalCategoryData?.data.data.sort(
              (a: any, b: any) => a.categoryListIndex - b.categoryListIndex,
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => {
              return item._id.toString();
            }}
            initialScrollIndex={0}
            renderItem={({item}) => {
              return (
                <View style={{flex: 1, marginRight: 22}}>
                  <TouchableOpacity
                    onPress={() => {
                      setActiveItemPrimaryCategory(item._id);
                      setActiveItemSubCategories(item.subCategories);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          activeItemPrimaryCategory === item._id
                            ? '#ff7600'
                            : 'black',
                        fontWeight: '400',
                      }}>
                      {item.categoryName}
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
              style={{
                marginStart: -10,
                marginEnd: -20,
              }}
              onPress={() => {
                navigation.navigate(RouteNames.categories);
              }}>
              <ChevronDownOutline />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View />
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollable}>
        {/* {activeItemSubCategories && activeItemSubCategories.data.data ? ( */}
        {activeItemSubCategories ? (
          <View style={styles.secondaryCategoriesBG}>
            <FlatList
              scrollEnabled={false}
              // data={activeItemSubCategories?.data.data.subCategories.slice(
              data={activeItemSubCategories.slice(0, 10)}
              keyExtractor={item => {
                // console.log('item', item);
                return item._id;
              }}
              numColumns={5}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flex: 0.5,
                      marginTop: 8,
                    }}>
                    {index === 9 ? (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(RouteNames.categories);
                        }}
                        style={{alignItems: 'center'}}>
                        <EllipsisHorizontal width={24} height={50} />
                        <Text
                          style={{
                            fontSize: 13,
                            color: colors.balc111111,
                            fontWeight: '400',
                          }}>
                          Ещё
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate(RouteNames.product_search_screen);
                        }}
                        style={{alignItems: 'center'}}>
                        <ImageIcon width={50} height={50} />
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: 13,
                            color: colors.balc111111,
                            fontWeight: '400',
                          }}>
                          {item.categoryName}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              }}
            />
          </View>
        ) : (
          <View />
        )}

        <View style={styles.productsGrid}>
          <MasonryList
            data={productsDataArray}
            keyExtractor={item => {
              return item.id;
            }}
            numColumns={2}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    borderRadius: 12,
                    backgroundColor: '#ffffff',
                    marginHorizontal: 4.5,
                    marginVertical: 4,
                    width: 'auto',
                    borderColor: '#f1f1f1',
                    marginTop: 9,
                    flex: 0.5,
                    paddingBottom: 8,
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

                      marginBottom: 7,
                    }}
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
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
                        color: colors.black,
                        fontWeight: '500',
                      }}
                      numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingLeft: 8,
                      marginTop: 3,
                    }}>
                    <View style={{flexDirection: 'row', width: '30%'}}>
                      <Text
                        style={{
                          fontSize: 17,
                          color: '#ff7600',
                          fontFamily: fontFamily.bold,
                        }}>
                        {item.price}
                      </Text>
                      <Text
                        style={{
                          paddingTop: 6,
                          color: '#ff7600',
                          fontSize: 12,
                          fontFamily: fontFamily.bold,
                        }}>
                        c.
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 4,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          width: '70%',
                          color: '#AAAAAA',
                          fontFamily: fontFamily.regular,
                          fontSize: 10.5,
                          paddingLeft: 28,
                        }}>
                        {`${item.views}+куплено`}
                      </Text>
                      <EllipsisHorizontalGrey style={{marginTop: 4}} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  ) : loading ? (
    <RetryWhenErrorOccur
      data={productsData}
      onClick={() => {
        setActiveItemSubCategories(undefined);
        setProductsData(undefined);
        callAPI();
      }}
    />
  ) : (
    <ProgressView />
  );
};
export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F6F6F6',
  },
  headerContainer: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 4,
    width: Dimensions.get('window').width,
    paddingHorizontal: 8,
  },
  searchBarBG: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 37,
    borderRadius: 24,
  },
  searchIcon: {
    color: '#999999',
    marginLeft: 11.18,
  },
  searchInput: {
    height: 37,
    width: 'auto',
    marginLeft: 11.13,
    backgroundColor: '#ffffff',
    fontFamily: fontFamily.regular,
    fontSize: 15,
  },

  primaryCategories: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
    gap: 6,
    backgroundColor: colors.white,
    borderRadius: 13,
  },
  primaryCategoriesContent: {
    paddingTop: 5,
    paddingLeft: 16,
    flex: 0.9,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 13,
  },
  downArrowButton: {
    flexDirection: 'row',
    height: '100%',
    flex: 0.1,
    borderTopRightRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    paddingRight: 10,
    paddingBottom: 4,
  },
  scrollable: {
    paddingTop: 0,
    backgroundColor: '#F6F6F6',
  },
  secondaryCategoriesBG: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 12,
    paddingHorizontal: 6,
    paddingBottom: 6.5,
    borderBottomRightRadius: 12,
  },
  productsGrid: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginTop: 9,
    marginHorizontal: 4,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
});
