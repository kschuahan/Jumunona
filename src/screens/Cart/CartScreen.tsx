import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useMemo, useState } from 'react';
import ChevronFwdOutlineIcon from '../../../assets/Icons/chevronForwardOutline.svg';
import EditIcon from '../../../assets/Icons/editIcon.svg';
import { appIcons, imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';

import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import DropDownGrey from '../../../assets/Icons/DropDownGrey.svg';
import { RouteNames } from '../../utils/RouteNames';
import AddCart from '../../../assets/Icons/AddCard.svg';
import RemoveCart from '../../../assets/Icons/RemoveCart.svg';
import DeleteIcon from '../../../assets/Icons/DeleteChat.svg';
import SearchCart from '../../../assets/Icons/SearchCart.svg';
import LikeCart from '../../../assets/Icons/LikeCart.svg';
import OrangeCheck from '../../../assets/Icons/OrnageCheck.svg';

import { AppString } from '../../utils/AppStrings';
import { data } from '../Product/ProductDetailScreen';
import { styles } from '../../utils/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import { getAPICall, postAPICall } from '../../Netowork/Apis';
import { CartAPIs } from '../../Netowork/Constants';
import { ActivityIndicatorView, CenterProgressView, ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
import { CommonModal } from '../HomeScreen';
import { ConfirmationDialog, OkDialog } from '../../utils/Extentions';
import { useIsFocused } from '@react-navigation/native';

let row: Array<any> = [];
let prevOpenedRow;
let selectedShopIds: Array<string> = []
let selectedProductIds: Array<string> = []
let cartIds: Array<string> = []
const CartScreen = ({ navigation }) => {

  const [isCheck, setIsCheck] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [data, setData] = useState<CommonModal>()
  const [loading, setLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(false)

  const [refresh, setRefresh] = useState(false)
  const [sum, setSum] = useState(0)
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setData(undefined)
      getCart()
    } else {
      setIsEditable(false)
    }

  }, [isFocused])

  useEffect(() => {
    //calculating price
    if (data && data?.isSuccess && data.data && data.data.data && data.data.data.cartDetails) {
      setSum(data.data.data.cartDetails.reduce((accumulator: any, currentValue: any) => accumulator +
        (getProdcutPrice(currentValue.products)), 0))
    }
  }, [mainLoading, refresh])

  function getProdcutPrice(items: any) {

    return items.reduce((accumulator: any, currentValue: any) => accumulator + (currentValue.price), 0)
  }


  // getting cart produccts
  const getCart = () => {
    if (! data && data.isSuccess && data.data.data) {
    setMainLoading(true)
    } else {
      setLoading(true)
    }
    getAPICall(CartAPIs.getCart, (res: any) => {
      cartIds = []
      setData(res)
      setMainLoading(false)
      setLoading(false)
    }
    )
  }

  const deleteItemFromCart = () => {
    if (selectedProductIds.length > 0) {
      confirmationAlert('Вы уверены, что хотите удалить эти продукты?', () => {
        setLoading(true)
        postAPICall({
          cartIds: selectedProductIds
        },
          CartAPIs.deleteMultiItemFromCart,
          true,
          (res: any) => {
            getCart()
            setLoading(false)
            selectedProductIds = []
            selectedShopIds = []

            setIsEditable(false)
            setIsCheck(false)
          }
        )
      }, () => {
        console.log("canceled")
      })

    } else {
      Alert.alert("Пожалуйста, выберите товары, которые хотите удалить из корзины")
    }
  }

  const moveToFav = () => {
    if (selectedProductIds.length > 0) {
      confirmationAlert('Вы уверены, что хотите переместить эти товары в избранное?', () => {
        setLoading(true)
        postAPICall({
          productId: selectedProductIds
        },
          CartAPIs.moveToFavorite,
          true,
          (res: any) => {
            getCart()
            selectedProductIds = []
            selectedShopIds = []
            setLoading(false)
            setIsEditable(false)
            setIsCheck(false)
          }
        )
      }, () => {
        console.log("canceled")
      })

    } else {
      Alert.alert("пожалуйста, выберите продукты, чтобы переместить их в избранное")
    }
  }

  const confirmationAlert = (message: string, onConfirm, onCancel) => {
    Alert.alert("", message, [{
      text: AppString.confirm,
      onPress: (onConfirm),
      style: 'default',
    },
    {
      text: AppString.cancel,
      onPress: (onCancel),
      style: 'default',
    }])
  }

  return (
    <View style = {{flex: 1}}>
       { data && data.isSuccess && data.data.data ?
    
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={style.container}>
          <View style={style.header}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'stretch',
                marginTop: 24,
                marginLeft: 16,
              }}>
              <Text style={{ fontSize: 21, fontWeight: 'bold', color: colors.black }}>Cart</Text>
              <Text
                style={{
                  marginTop: 3,
                  marginLeft: 4.5,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#14100D',
                }}>
                {`(${data.data.data.cartDetails.length})`}
              </Text>
            </View>
            {data.data.data.cartDetails.length > 0 ? <TouchableOpacity
              onPress={() => {
                setIsEditable(!isEditable)
              }}
              style={{
                marginTop: 28, paddingEnd: 12
              }}>
              {isEditable ? <OrangeCheck /> : <EditIcon height={16} width={16} style={{ borderColor: '#666666' }} />}
            </TouchableOpacity> : null}
          </View>
          <ScrollView
            style={style.scrollView}
            showsVerticalScrollIndicator={false}>
            <FlatList
              style={{ marginHorizontal: 6 }}
              data={data.data.data.cartDetails}
              scrollEnabled={false}
              ListEmptyComponent={
                <Text style={[styles.textStyle, {
                  color: colors.lightOrange,
                  paddingVertical: 100,
                  fontSize: 16, fontWeight: 'bold', textAlign: 'center'
                }]}>No prodcut in cart</Text>
              }
              keyExtractor={item => {
                return item.shopId;
              }}
              numColumns={1}
              renderItem={({ item, index }) => {
                return (

                  <CartProduct
                    onQunatityUpdate={() => {
                      setLoading(true)
                      console.warn("rwerewrewr")
                      getCart()
                      // setRefresh(!refresh)
                    }}
                    onDelete={(item: any) => {
                      getCart()
                    }}
                    check={false}
                    navigation={navigation}
                    shopData={item} onClick={() => {
                      navigation.push(RouteNames.product_detail, {
                        id: item._id,
                      })
                    }}
                    shouldRefresh={() => {
                      setRefresh(!refresh)
                    }}
                  />
                );
              }}
            />

            {/* {<FlatList
              style={{
                backgroundColor: colors.white,
                borderRadius: 13,
                padding: 10,
                marginBottom: 9,
                marginHorizontal: 6
              }}
              scrollEnabled={false}
              data={cartItemData}
              keyExtractor={item => {
                return item.id;
              }}
              ListHeaderComponent={<View style={{
                flexDirection: 'row',
                justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Text style={{
                  color: colors.black333333, fontSize: 16, fontWeight: '400'
                }}>Нет в наличии, 2 шт</Text>

                <TouchableOpacity>
                  <Text style={{
                    color: colors.lightOrange, fontSize: 14, fontWeight: '400'
                  }}>{AppString.clear}</Text>
                </TouchableOpacity>
              </View>}
              numColumns={1}
              renderItem={({ item, index }) =>
                <OutOfStocksCardProduct item={item} onClick={() => {
                  navigation.navigate(RouteNames.product_search_screen, { isRoute: true })

                }} />
              }
            />} */}
            {data && data.data && data.data.data ? <RelatedProducts
              data={data.data.data.recommendedProducts}
              onclick={(item: any) => {
                navigation.push(RouteNames.product_detail, {
                  id: item._id,
                });
              }}
            /> : null}
          </ScrollView>
          {/* <View
        style={{
          position: 'absolute',
          bottom: 0,
          height: 64,
          width: '99%',
          backgroundColor: '#ffffff',
          borderTopEndRadius: 13,
          borderTopStartRadius: 13,
        }}
      /> */}

          {sum > 0 && data && data.data && data.data.data && data.data.data.cartDetails ? <View
            style={{
              backgroundColor: colors.white,
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 12,
              paddingHorizontal: 10,
              flexDirection: 'row',
              borderTopStartRadius: 13,
              borderTopEndRadius: 13,
              shadowColor: colors.black,
              elevation: 10,
              borderBlockColor: colors.whiteF7F7F7,
              borderBottomWidth: 1,
              marginBottom: -9,
              paddingBottom: 18
            }}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <RadioButtons isCheck={isCheck} onClick={() => {

                if (isCheck) {
                  selectedShopIds = []
                  selectedProductIds = []
                } else {
                  selectedShopIds = []
                  selectedProductIds = []
                  selectedShopIds = data.data.data.cartDetails.map(it => it.shopId)
                  data.data.data.cartDetails.forEach(element => {
                    console.log("element", element)
                    let productIdsArr = element.products.map(product => product.cartId)
                    // console.warn(selectedProductIds) 
                    selectedProductIds = [...selectedProductIds, ...productIdsArr]
                  });
                }
                setIsCheck(!isCheck)

              }} />
              <Text
                style={{
                  fontSize: 13,
                  color: '#8b8b8b',
                  fontFamily: '400',
                  marginStart: 4
                }}>
                {AppString.choose_all}
              </Text>
            </View>

            {!isEditable ?
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#333',
                    fontFamily: '400',
                    marginStart: 4
                  }}>
                  {AppString.total + ':'}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.lightOrange,
                    fontFamily: '400',
                    marginHorizontal: 4
                  }}>
                  {AppString.currency_symbol}<Text
                    style={{
                      fontSize: 22,
                      color: colors.lightOrange,
                      fontFamily: '400',
                      marginStart: 4
                    }}>{sum.toFixed(2)}</Text>
                </Text>
                <CommonButton
                  onClick={() => {
                    // setBuyShow(true);
                    //navigation.navigate(RouteNames.myAddress)
                    let ids = []
                    if (selectedProductIds.length > 0) {
                      ids = selectedProductIds
                    } else {
                      ids = cartIds
                    }
                    console.warn(ids);
                    
                    navigation.navigate(RouteNames.cartConfirmOrder, { ids: ids })
                  }}
                />
              </View>
              :
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 7 }}>
                <TouchableOpacity onPress={() => {
                  moveToFav()
                }} style={{
                  borderRadius: 20,
                  height: 40,
                  paddingHorizontal: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: colors.orangeEC407AL,
                  borderWidth: 1
                }}>

                  <Text
                    style={[
                      styles.textStyle,
                      { color: "#EC407A", fontWeight: '400', fontSize: 16 },
                    ]}>
                    {AppString.to_Favourites}
                  </Text>
                </TouchableOpacity>
                <CommonButton
                  startorange='#EC407A'
                  endColor='#E93368'
                  text={AppString.delete}
                  onClick={() => {
                    deleteItemFromCart()
                  }} 
                />
              </View>
            }
          </View> : null}

          <View style={{
            height: 0.5, width: '100%', backgroundColor: '#D9D9D9',
            position: 'absolute', bottom: 0,
          }} />


        </View>
      
      </GestureHandlerRootView>
      : mainLoading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
        setData(undefined)
        getCart()
      }} />

    }
      <CenterProgressView isShow={loading} />
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
          borderRadius: 20,
          height: 40,
          paddingHorizontal: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Text
          style={[
            styles.textStyle,
            { color: colors.white, fontWeight: '400', fontSize: 16 },
          ]}>
          {text}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};


const RelatedProducts = ({ data, onclick }) => {

  return (
    data ? <View style={{ marginBottom: 100, paddingStart: 12, paddingEnd: 3 }}>
      {data.length > 0 ? <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 8,
          marginBottom: 10
        }}>
        <View
          style={{
            height: 1,
            width: 50,
            borderRadius: 0.5,
            backgroundColor: colors.lightOrange,
          }}
        />
        <View
          style={{
            height: 2,
            width: 2,
            borderRadius: 1,
            backgroundColor: colors.lightOrange,
          }}
        />

        <Text
          style={{
            fontSize: 14,
            color: colors.lightOrange,
            fontFamily: 'SegoeUI',

            paddingHorizontal: 5,
            alignSelf: 'center',
          }}>
          Ещё
        </Text>
        <View
          style={{
            height: 2,
            width: 2,
            borderRadius: 1,
            backgroundColor: colors.lightOrange,
          }}
        />
        <View
          style={{
            height: 1,
            width: 50,
            borderRadius: 0.5,
            backgroundColor: colors.lightOrange,
          }}
        />
      </View> : null}
      <FlatList
        data={data}
        keyExtractor={item => {
          return item._id.toString();
        }}
        scrollEnabled={false}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{
                borderRadius: 13,
                backgroundColor: '#ffffff',
                marginEnd: 9,
                marginVertical: 4,
                flex: 0.5,
                height: 326,
                borderColor: '#f1f1f1',
                marginTop: 8,
              }}
              onPress={() => {
                onclick(item);
              }}>
              <Image
                source={
                  item.images !== ''
                    ? { uri: item.images }
                    : appIcons.shoeImageURL
                } style={{
                  height: 265,
                  paddingHorizontal: 1,
                  width: 'auto',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,

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
                  style={{ height: 15, width: 15 }}
                />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 15,
                    fontWeight: '500',
                    color: colors.black
                  }}
                  numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <View
                style={{ flexDirection: 'row', paddingLeft: 8, paddingTop: 4 }}>
                <View style={{ flexDirection: 'row', width: '30%' }}>
                  <Text
                    style={{
                      fontSize: 17,
                      color: '#ff7600',
                      fontWeight: 'bold',
                    }}>
                    {item.price ? item.price : '58'}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 6,
                      color: '#ff7600',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}>
                    c.
                  </Text>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 11,
                    width: '70%',
                    color: '#AAAAAA',
                    paddingTop: 6,
                    fontFamily: 'SegoeUI',
                  }}>
                  {`${item.views}${AppString.views}`}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View> : null
  );
};




const OutOfStocksCardProduct = ({ item, onClick }) => {

  return <TouchableOpacity disabled={true} style={{
    marginBottom: 9,
  }}>

    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
      }}>
      <RadioButtons />

      <Image
        source={appIcons.shoeImageURL}
        style={{ width: 110, height: 110, borderRadius: 11, marginStart: 10 }}
      />
      <View
        style={{
          justifyContent: 'space-between',
          height: 110, width: '60%'
        }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: colors.greyCECECE }} numberOfLines={1}>
            若过度长的话只显示第一行
          </Text>

          <Text style={{ fontSize: 16, fontWeight: '400', color: colors.balc111111, marginTop: 5 }} numberOfLines={2}>
            #逻辑: 找同类 找最终一级的分类
          </Text>
        </View>


        <TouchableOpacity onPress={() => {
          onClick()
        }} style={{
          borderRadius: 20,
          borderColor: colors.lightOrange,
          borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 32,
          width: 91,
          alignSelf: 'flex-end'
        }}>
          <Text style={{ fontSize: 14, fontWeight: '400', color: colors.lightOrange }} numberOfLines={2}>
            {AppString.similar}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>

}

export const RadioButtons = ({ isCheck = false, onClick, size = 22 }) => {
  return true ? <TouchableOpacity onPress={onClick}>{isCheck ? (
    <CheckmarkCircle width={size} height={size} color={colors.lightOrange} />
  ) : (
    <EllipsisHorizontalNormal width={size} height={size} />
  )}</TouchableOpacity> : null
}

const CartProduct = ({ check = true, shopData, navigation, onClick, onDelete, onQunatityUpdate, shouldRefresh }) => {

  const [isCheck, setIsCheck] = useState(false)
  const [loading, setLoading] = useState(false)


  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }



  const deleteApi = (item: any) => {
    ConfirmationDialog(() => {
      setLoading(true)
      const deleteItem = { cartId: item.cartId }
      postAPICall(deleteItem, CartAPIs.deleteItemFromCart, true, (res: any) => {
        setLoading(false)
        OkDialog(res.data && res.data.message ? res.data.message : res.data.toString())
        if (res.isSuccess) {
          onDelete(item)
        }
      })
    })
  }

  const updateQuantity = (item: any, quantity: number) => {
    const quntItem = { cartId: item.cartId, quantity: quantity, attr1_Id: '' }
    setLoading(true)
    postAPICall(quntItem, CartAPIs.updateCart, true, (res: any) => {
      setLoading(false)
    
      if (res.isSuccess) {
        onQunatityUpdate(item)
      }
    })
  }


  const RightButtons = ({ index = 0, item }) => {

    return <View style={[style.rowDirectionCenter, {
      justifyContent: 'space-around',
      width: 222,
      backgroundColor: colors.whiteF6F6F6
    }]}>
      <TouchableOpacity onPress={() => {
        navigation.navigate(RouteNames.product_search_screen, { isRoute: true,
          searchText: '' })
      }}><SearchCart /></TouchableOpacity>
      <TouchableOpacity onPress={() => { }}><LikeCart /></TouchableOpacity>
      {loading ? <ActivityIndicatorView /> : <TouchableOpacity onPress={() => {
        // const data = chats.filter((it, pos) => pos != index)
        //setChats(data)
        deleteApi(item)
      }}><DeleteIcon /></TouchableOpacity>}

    </View>
  }

  return (
  <View>
  <TouchableOpacity disabled={true}
    onPress={onClick}
    style={{
      backgroundColor: colors.white,
      borderRadius: 13,
      marginBottom: 9,
      paddingTop: 10
    }}>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(RouteNames.shopHomeScreen)
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 10
      }}>

      <RadioButtons isCheck={selectedShopIds.indexOf(shopData.shopId) > -1} onClick={() => {

        if (selectedShopIds.includes(shopData.shopId)) {
          selectedShopIds.pop(shopData.shopId)
          shopData.products.forEach(element => {

            selectedProductIds.pop(element.cartId)
          });
        } else {
          selectedShopIds.push(shopData.shopId)

          let productIdsArr = shopData.products.map(product => product.cartId)
          // console.warn(selectedProductIds) 
          selectedProductIds = [...selectedProductIds, ...productIdsArr]

        }
        console.warn(selectedShopIds)
        shouldRefresh()
        setIsCheck(!isCheck)
      }} />
      <Image
        source={appIcons.china}
        style={{ width: 18, height: 18, marginStart: 10 }}
      />
      <Text style={{
        paddingLeft: 9,
        color: colors.black, fontSize: 16, fontWeight: 'bold', paddingBottom: 2
      }}>{shopData.shopName}</Text>
      <ChevronFwdOutlineIcon
        width={8}
        height={10}
        style={{
          borderColor: '#CDCDCD',
          marginTop: 2,
          marginLeft: 8,
        }}
      />
    </TouchableOpacity>

    <FlatList
      style={{ marginTop: 14 }}
      data={shopData.products}
      scrollEnabled={false}
      renderItem={({ item, index }) =>
        <Swipeable
          ref={ref => row[index] = ref}
          onSwipeableOpen={() => closeRow(index)}
          renderRightActions={() =>
            <RightButtons index={index} item={item} />}>
          <ProductItem onUpdateQuantity={(qut: number) => {
            updateQuantity(item, qut)
          }}
            check={shopData.radioButtonStore}
            item={item} onClick={onClick}
            shouldRefresh={shouldRefresh}
          />
        </Swipeable>
      }

    />

  </TouchableOpacity>
  <CenterProgressView isShow={ loading} />
  </View>)
}


const ProductItem = ({ item, check = false, onClick, onUpdateQuantity, shouldRefresh }) => {

  const [isIncrease, setIsIncrease] = useState(true)
  const [count, setCount] = useState(item.selected_quantity)
  const [isCheck, setIsCheck] = useState(false)

  //finding the selected value of colors by the index
  const selectedValue = useMemo(() => {
    const index = item.attr1.findIndex((element) => (element.isSelected))
    return item.attr1[index];
  }, [item]);
  const selectedSizes = useMemo(() => {
    const index = item.attr2.findIndex((element) => (element.isSelected))
    return item.attr2[index];
  }, [item]);

  useEffect(() => {
    if (!cartIds.includes(item.cartId)) {
      cartIds.push(item.cartId)
    }

  }, [item])

  return <TouchableOpacity
    onPress={onClick}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 14,
      paddingHorizontal: 10,
      flex: 1
    }}>
    <RadioButtons isCheck={selectedProductIds.includes(item.cartId)} onClick={() => {
      setIsCheck(!isCheck)
      if (selectedProductIds.indexOf(item.cartId) > -1) {
        selectedProductIds.pop(item.cartId)
      } else {
        selectedProductIds.push(item.cartId)
      }
      console.warn(selectedProductIds)
      shouldRefresh()
    }} />

    <Image
      source={item.productImage ? { uri: item.productImage } : appIcons.shoeImageURL}
      style={{ width: 110, height: 110, borderRadius: 11, marginStart: 10 }}
    />
    <View
      style={{
        justifyContent: 'space-between',
        height: 110, width: '60%',
        paddingStart: 10
      }}>
      <View>
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.balc111111 }}
          numberOfLines={2}>
          {item.productName}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#F9F9F9',
            width: selectedValue &&
              selectedValue.attributeValue ? selectedValue.attributeValue.length * 16 : 70,
            height: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 5.5,
            flexDirection: 'row',
            gap: 4,
          }}>
          <Text style={{ color: '#999999', fontSize: 14, fontWeight: '400' }} >
            {selectedValue && selectedValue.attributeValue ? selectedValue.attributeValue : "white"}
            {"; "}
            {selectedSizes && selectedSizes.attributeValue ? selectedSizes.attributeValue : "M"}
          </Text>
          <DropDownGrey style={{ marginTop: 3 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.lightOrange, fontSize: 21, fontWeight: '500' }}>
          {(parseInt(item.singlePrice) * count).toString()}c.
        </Text>

        {<TouchableOpacity disabled={isIncrease} onPress={() => {
          setIsIncrease(true)
        }} style={{
          flexDirection: 'row',
          borderRadius: 7,
          borderColor: '#B3B3B3',
          borderWidth: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
          height: 28,
          width: isIncrease ? 99 : 28
        }}>
          {isIncrease ? <TouchableOpacity disabled={count == 1}
            onPress={() => {
              if (count != 1) {
                onUpdateQuantity(count - 1)
               // setCount(count - 1)
              }
            }}
            style={{
              borderEndColor: '#B3B3B3',
              borderEndWidth: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
              height: 28, width: 28
            }}>
            <RemoveCart />
          </TouchableOpacity> : null}
          <Text style={{
            color: colors.black, fontSize: 14,
            fontWeight: '400',
            paddingHorizontal: isIncrease ? 10 : undefined
          }}>
            {`${isIncrease ? '' : 'x'}${count}`}
          </Text>
          {isIncrease ? <TouchableOpacity
            onPress={() => {
              if (item.totalQunatity > 0) {
                onUpdateQuantity(count + 1)
              //  setCount(count + 1)
              }
            }}
            style={{
              borderStartColor: '#B3B3B3',
              borderStartWidth: 0.6,
              justifyContent: 'center',
              alignItems: 'center',
              height: 28, width: 28
            }}>
            <AddCart />
          </TouchableOpacity> : null}
        </TouchableOpacity>}
      </View>
    </View>
  </TouchableOpacity>

}



export default CartScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.whiteF6F6F6
  },
  rowDirectionCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    elevation: 5,
    shadowColor: '#000000',
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
    width: '100%',
    height: 60,
    marginBottom: 9,
    justifyContent: 'space-between',

  },
  scrollView: {
    width: '100%'
  }
})