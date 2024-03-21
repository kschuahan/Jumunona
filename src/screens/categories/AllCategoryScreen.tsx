import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native';
import { styles } from '../../utils/AppStyles';
import React, { useEffect, useState } from 'react';
import { RouteNames } from '../../utils/RouteNames';
import { AppString } from '../../utils/AppStrings';
import { colors } from '../../utils/AppColors';
import ChevronFwdOutlineIcon from '../../../assets/Icons/ForwardBlack.svg';
import ImageIcon from '../../../assets/Icons/image-outline.svg';
import { CustomHeader } from '../../components/Header';
import { getAPICall } from '../../Netowork/Apis';
import { categoriesModule } from '../../Netowork/Constants';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { CommonModal } from '../HomeScreen';



export const AllCategoriesScreen = ({ navigation }) => {
  const [pos, setPos] = useState(0);
  const [leftCategoryList, setLeftCategoryList] = useState<CommonModal>();
  const [loading, setLoading] = useState(false);
  const [activeItemSubCategories, setActiveItemSubCategories] = useState();
  const [rightSideCategories, setRightSideCategories] = useState<CommonModal>();

  const callLeftCategoryListAPI = () => {
    setLoading(true);
    getAPICall(
      categoriesModule.getCategoriesListForCategoriesScreen,
      (response: any) => {
        if (response.isSuccess) {
          setActiveItemSubCategories(response?.data.categories[0].subCategory);
        }
        setLeftCategoryList(response);
        setLoading(false);
      },
    );
  };


  useEffect(() => {
    callLeftCategoryListAPI();
  }, []);

  return (
    <View style={[styles.container, { padding: 0 }]}>
      <CustomHeader navigation={navigation} title={AppString.categories} />
      {leftCategoryList && leftCategoryList.isSuccess && leftCategoryList.data?.categories ? <View
        style={[styles.container, { paddingEnd: 6, backgroundColor: undefined }]}>
        <View
          style={[
            styles.container,
            {
              flexDirection: 'row',
              padding: undefined,
              backgroundColor: undefined,
            },
          ]}>
          <FlatList
            style={{ width: '22%', marginTop: -10 }}
            data={leftCategoryList.data?.categories}
            keyExtractor={item => {
              return item._id;
            }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  setPos(index);
                  setActiveItemSubCategories(item.subCategory)
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 17.25,
                  marginTop: index == 0 ? 13 : 17.25,
                  paddingEnd: 8
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      fontSize: 16,
                      color:
                        pos == index ? colors.lightOrange : colors.black444444,
                      textAlign: 'center'
                    },
                  ]}>
                  {item.categoryName}
                </Text>
              </TouchableOpacity>
            )}
          />

          <FlatList
            style={{ width: '78%', marginTop: -14 }}
            data={activeItemSubCategories}
            keyExtractor={item => {
              return item._id.toString();
            }}
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
                  title={item.categoryName}
                  onClick={() => {
                    navigation.navigate(RouteNames.product_search_screen, {
                      categoryID: item.categoryId,
                      isRoute: true,
                      searchText: ''
                    });
                  }}
                />
                <FlatList
                  data={item.subCategory}
                  keyExtractor={item => {
                    return item._id.toString();
                  }}
                  numColumns={3}
                  scrollEnabled={false}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={{
                        flex: 1 / 3,
                        // justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 11
                      }}
                      onPress={() => {
                        navigation.push(RouteNames.product_search_screen, {
                          categoryID: item.categoryId,
                          isRoute: true,
                          searchText: ''
                        });
                      }}>
                      {/* <ImageIcon width={66} height={66} /> */}
                      {/* <Image
                      source={{uri: imagesUrl.jacket}}
                      style={{height: 66, width: 66}}
                    /> */}
                      {item.details == undefined || item.details.categoryImage === '' ? (
                        <ImageIcon width={66} height={66} />
                      ) : (
                        <Image source={{ uri: item.details.categoryImage }}
                          height={66} width={66}
                          style={{ borderRadius: 4 }} />
                      )}
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            fontSize: 13,
                            color: colors.balc111111,
                            marginTop: 2.5,
                            textAlign: 'center'
                          },
                        ]}>
                        {item.categoryName}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          />
        </View>
      </View>
        : loading ? (
          <ProgressView />
        ) : (
          <RetryWhenErrorOccur
            data={leftCategoryList}
            onClick={() => {
              setLeftCategoryList(undefined);
              setActiveItemSubCategories(undefined);
              callLeftCategoryListAPI();
            }}
          />
        )}
    </View>
  )
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
