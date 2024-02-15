import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MasonryList from '@react-native-seoul/masonry-list';
import { RouteNames } from '../utils/RouteNames';
import { colors } from '../utils/AppColors';
import React, { useEffect, useState } from 'react';
import { fontFamily } from '../utils/Fonts';

import EllipsisHorizontal from '../../assets/Icons/ellipsis-horizontal.svg';
import ImageOutline from '../../assets/Icons/image-outline.svg';
import { appIcons } from '../utils/AppIcons';
import { getAPICall } from '../Netowork/Apis';
import { categoriesModule, ProductAPIs } from '../Netowork/Constants';
import { ProgressView, RetryWhenErrorOccur } from '../components/Dialogs';
import { AppString } from '../utils/AppStrings';
import { TouchableHighlight } from 'react-native-gesture-handler';

export interface CommonModal {
  isSuccess: boolean;
  data: any;
}

interface PagingData {
  total: number;
  remaining: number;
  current: number;
  pages: number;
}
const numColumns = 5;

const HeaderItem = ({ onSearchClick }) => (
  <View style={styles.header}>
    <TextInput
      style={styles.searchBox}
      placeholder="Спортивная обувь"
      placeholderTextColor="#727272"
    />
    <TouchableOpacity style={styles.button} onPress={onSearchClick}>
      <LinearGradient
        colors={['#FF7600', '#FC4A1A']}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.linearGradient}>
        <Text style={styles.searchButtonText}>Поиск</Text>
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const MainCategoriesItem = ({ navigation, data }) => {
  return data && data.isSuccess ? (
    <View style={{ width: '100%' }}>
      <FlatList
        style={styles.categories}
        scrollEnabled={false}
        data={data.data.data
          .slice(0, 10)
          .sort((a: any, b: any) => a.homeIndex - b.homeIndex)}
        keyExtractor={item => {
          return item._id;
        }}
        numColumns={5}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1 / 5,
              }}>
              {index === 9 ? (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => {
                    navigation.navigate(RouteNames.categories);
                  }}
                  style={{ alignItems: 'center' }}>
                  <EllipsisHorizontal width={24} height={38} />
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.black,
                      paddingBottom: 10,
                      fontWeight: '400',
                    }}>
                    ещё
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(RouteNames.product_search_screen, {
                      categoryID: item._id,
                      routeName: RouteNames.home,
                      index: index,
                    });
                  }}
                  style={{ alignItems: 'center' }}>
                  {item.image === '' ? (
                    <ImageOutline width={50} height={38} />
                  ) : (
                    <Image source={{ uri: item.image }} height={38} width={50} />
                  )}
                  <Text
                    numberOfLines={2}
                    style={{
                      fontSize: 13,
                      fontWeight: '400',
                      color: colors.black,
                      paddingBottom: 10,
                      textAlign: 'center',
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
  ) : null;
};

const HomeScreen: React.FC = ({ navigation }) => {
  const [data, setData] = useState<CommonModal>();
  const [pagingData, setPagingData] = useState<PagingData>();
  const [loading, setLoading] = useState(false);
  const [dataArray, setArrayData] = useState<Array<any>>([]);
  const [categoryData, setCategoryData] = useState<CommonModal>();

  const fetchData = () => {
    setLoading(true); // Set loading to true before starting API calls
    callCategoryAPI();
    callAPI();
  };
  const checkLoadingStatus = () => {
    // Assuming both functions have completed execution
    setLoading(false); // Set loading to false after both API calls are complete
  };
  useEffect(() => {
    fetchData();
  }, []);
  const callCategoryAPI = () => {
    getAPICall(categoriesModule.getHomePageCategories, (res: any) => {
      setCategoryData(res);
      // checkLoadingStatus();
    });
  };
  const callAPI = (page = 1) => {
    getAPICall(ProductAPIs.getProducts + `${page}`, (res: any) => {
      if (res.isSuccess) {
        setPagingData(res.data.data.pages);
        setArrayData([...dataArray, ...res.data.data.products]);
      }
      checkLoadingStatus();
      setData(res);
    });
  };

  const featchMore = () => {
    if (
      data?.isSuccess &&
      pagingData &&
      pagingData?.pages > pagingData?.current
    ) {
      callAPI(pagingData.current + 1);
    }
  };

  return dataArray && pagingData ? (
    <View style={styles.container}>
      <HeaderItem
        onSearchClick={() => {
          navigation.navigate(RouteNames.product_search_screen, {
            isRoute: true,
          });
        }}
      />
      <View style={styles.grid}>
        <MasonryList
          data={dataArray}
          keyExtractor={item => {
            return item._id;
          }}
          ListFooterComponent={
            loading ? (
              <ProgressView ht={undefined} />
            ) : data?.isSuccess ? null : (
              <RetryWhenErrorOccur
                ht={120}
                data={data}
                onClick={() => {
                  callAPI(pagingData.current + 1);
                }}
              />
            )
          }
          // ListEmptyComponent={
          //   <RetryWhenErrorOccur
          //     data={'No Products found'}
          //     onClick={() => {
               
          //     }} isRetry={false}/>
          // }
          onEndReached={featchMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <MainCategoriesItem navigation={navigation} data={categoryData} />
          }
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 7 }}
          numColumns={2}
          renderItem={({ item, i }) => {
            return (
              <Pressable
                style={[styles.gridViewItemStyle, { paddingBottom: 8 }]}
                onPress={() => {
                  navigation.navigate(RouteNames.product_detail, {
                    id: item._id,
                  });
                }}>
                <Image
                  source={
                    item.images !== ''
                      ? { uri: item.images }
                      : appIcons.shoeImageURL
                  }
                  style={[
                    styles.gridViewItemImage,
                    { height: i % 3 !== 1 ? 240 : 277 },
                  ]}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    paddingLeft: 7,
                  }}>
                  {/* <SvgUri style={{ borderRadius: 8, overflow: 'hidden' }}
                    height={15} width={15} uri={item.country_flag} /> */}
                  <Image
                    source={appIcons.china}
                    style={{ borderRadius: 8, height: 15, width: 15 }}
                  />
                  <Text
                    style={{
                      marginLeft: 4,
                      fontSize: 13,
                      paddingBottom: 1,
                      fontWeight: '500',
                      paddingEnd: 12,
                      color: colors.black,
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
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text
                      style={{
                        fontSize: 17,
                        color: '#ff7600',
                        fontFamily: fontFamily.bold,
                      }}>
                      {item.price ? item.price : '58'}
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
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#AAAAAA',
                      paddingTop: 3,
                      marginTop: 4,
                      fontSize: 10.5,
                      marginEnd: 15,
                      fontFamily: fontFamily.regular,
                    }}>
                    {`${item.views}${AppString.views}`}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  ) : loading ? (
    <ProgressView />
  ) : (
    <RetryWhenErrorOccur
      data={data}
      onClick={() => {
        setData(undefined);
        setCategoryData(undefined);
        callCategoryAPI();
        callAPI();
      }}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: colors.whiteF6F6F6,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  searchBox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: colors.white,
    borderColor: '#ff7600',
    height: 36,
    paddingEnd: 90,
    fontSize: 15,
    paddingLeft: 12,
    fontFamily: fontFamily.regular,
    paddingVertical: 0,
  },
  button: {
    marginLeft: -82.5,
  },
  linearGradient: {
    borderRadius: 24,
    height: 31,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: fontFamily.regular,
  },
  scrollView: {
    flex: 1,
    paddingTop: 4,
    width: '100%',
    backgroundColor: colors.whiteF6F6F6,
  },

  categories: {
    borderRadius: 13,
    backgroundColor: '#ffffff',
    marginHorizontal: 4,
    marginBottom: 8,
    marginTop: 4,
    paddingHorizontal: 2,
    paddingTop: 12,
    paddingBottom: 4,
  },
  gridItem: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, //approxiamte a square
  },
  grid: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 8,
  },
  gridViewItemStyle: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginHorizontal: 4.5,
    marginVertical: 4.5,
    width: 'auto',
    flex: 0.5,
  },
  gridViewItemImage: {
    paddingHorizontal: 1,
    width: 'auto',
    borderRadius: 13,
    marginBottom: 7,
  },
});
