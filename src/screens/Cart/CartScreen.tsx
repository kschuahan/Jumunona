import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useEffect, useState } from 'react';
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
import { getAPICall } from '../../Netowork/Apis';
import { CartAPIs } from '../../Netowork/Constants';
import { ProgressView, RetryWhenErrorOccur } from '../../components/Dialogs';
interface CartItemData {
  id: string;
  storeName: string;
  articleName: string;
  articleColor: string;
  articleSize: string;
  imageURL: string;
  price: number;
  quantity: number;
  radioButtonStore: boolean;
  radioButtonItem: boolean;
  products: Array<ProductItemData>
}


interface ProductItemData {
  id: number;
  price: number;
  radioButtonItem: boolean;
}


const cartItemData: CartItemData[] = [
  {
    id: '1',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'White',
    articleSize: 'M',
    imageURL: appIcons.shoeImageURL,
    price: 999,
    quantity: 1,
    radioButtonStore: true,
    radioButtonItem: false,
    products: [{ id: 1, price: 230, radioButtonItem: true }, { id: 2, price: 900, radioButtonItem: true }]
  },
  {
    id: '2',
    storeName: '店铺名称',
    articleName: '若过度长的话只显示第一行',
    articleColor: 'Red',
    articleSize: 'L',
    imageURL: appIcons.shoeImageURL,
    price: 299,
    quantity: 2,
    radioButtonStore: false,
    radioButtonItem: false,
    products: [{ id: 1, price: 230, radioButtonItem: false }]

  },

];

let row: Array<any> = [];
let prevOpenedRow;
let isEditableButton = false;
const CartScreen = ({ navigation }) => {

  const [isCheck, setIsCheck] = useState(false)
  const [isEditable, setIsEditable] = useState(false)
  const [cartProduct, setCartProduct] = useState<[any]>()
  const [data, setData] = useState<any>(undefined)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getCart()
  }, [])
  const sum = cartItemData.reduce((accumulator, currentValue) => accumulator +

    (currentValue.radioButtonStore ? getProdcutPrice(currentValue.products) : 0), 0);



  function getProdcutPrice(items: Array<ProductItemData>) {

    return items.reduce((accumulator, currentValue) => accumulator + (currentValue.radioButtonItem ? currentValue.price : 0), 0)
  }


  const getCart = () => {
    setLoading(true)
    getAPICall(CartAPIs.getCart, (res: any) => {
      if (res.isSuccess) {
        setData(res.data.data)
        console.warn(res.data.data.cartDetails)
        setCartProduct(res.data.data.cartDetails)
      } else {
        setData(undefined)
      }
      setLoading(false)
    }
    ).catch( error => {
      setData(undefined)
      setLoading(false)
    })
  }
  return (

    data && !loading ?
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
              {`(${34})`}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              isEditableButton = !isEditable
              setIsEditable(!isEditable)
            }}
            style={{
              marginTop: 28, paddingEnd: 12
            }}>
            {isEditable ? <OrangeCheck /> : <EditIcon height={16} width={16} style={{ borderColor: '#666666' }} />}
          </TouchableOpacity>
        </View>
        <ScrollView
          style={style.scrollView}
          showsVerticalScrollIndicator={false}>
          <FlatList
            style={{ marginHorizontal: 6 }}
            data={cartItemData}
            scrollEnabled={false}
            keyExtractor={item => {
              return item.id;
            }}
            numColumns={1}
            renderItem={({ item, index }) => {
              return (

                <CartProduct check={item.radioButtonItem}
                  navigation={navigation}
                  items={item} onClick={() => {
                    navigation.push(RouteNames.product_detail)
                  }} />
              );
            }}
          />

          <FlatList
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
          />
          <RelatedProducts
            onclick={() => {
              navigation.push(RouteNames.product_detail);
            }}
          />
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

        <View
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
                }}>{sum}</Text>
            </Text>
            <CommonButton
              onClick={() => {
                // setBuyShow(true);
                //navigation.navigate(RouteNames.myAddress)
                navigation.navigate(RouteNames.cartConfirmOrder)
              }}
            />
          </View>
        </View>

        <View style={{
          height: 0.5, width: '100%', backgroundColor: '#D9D9D9',
          position: 'absolute', bottom: 0,
        }} />


      </View>
    </GestureHandlerRootView>
    : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
      setData(undefined)
      getCart()
    }} />
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
          width: 100,
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


const RelatedProducts = ({ onclick }) => {
  return (
    <View style={{ marginBottom: 100, paddingStart: 12, paddingEnd: 3 }}>
      <View
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
      </View>
      <FlatList
        data={data}
        keyExtractor={item => {
          return item.id.toString();
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
                onclick();
              }}>
              <Image
                source={appIcons.shoeImageURL}
                style={{
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
                  Футболка
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
                    999
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
                  {item.desc}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
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

export const RadioButtons = ({ isCheck = false, onClick, size=22 }) => {
  return true ? <TouchableOpacity onPress={onClick}>{isCheck ? (
    <CheckmarkCircle width={size} height={size} color={colors.lightOrange} />
  ) : (
    <EllipsisHorizontalNormal width={size} height={size} />
  )}</TouchableOpacity> : null
}

const CartProduct = ({ check = true, items, navigation, onClick }) => {

  const [isCheck, setIsCheck] = useState(items.radioButtonStore)


  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  }
  const RightButtons = ({ index = 0 }) => {

    return <View style={[style.rowDirectionCenter, {
      justifyContent: 'space-around',
      width: 222,
      backgroundColor: colors.whiteF6F6F6
    }]}>
      <TouchableOpacity onPress={() => {
        navigation.navigate(RouteNames.product_search_screen, { isRoute: true })
      }}><SearchCart /></TouchableOpacity>
      <TouchableOpacity><LikeCart /></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        // const data = chats.filter((it, pos) => pos != index)
        //setChats(data)
      }}><DeleteIcon /></TouchableOpacity>

    </View>
  }

  return <TouchableOpacity disabled={true}
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

      <RadioButtons isCheck={isCheck} onClick={() => {
        setIsCheck(!isCheck)
      }} />
      <Image
        source={appIcons.china}
        style={{ width: 18, height: 18, marginStart: 10 }}
      />
      <Text style={{
        paddingLeft: 9,
        color: colors.black, fontSize: 16, fontWeight: 'bold', paddingBottom: 2
      }}>店铺名称</Text>
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
      data={items.products}
      scrollEnabled={false}
      renderItem={({ item, index }) =>
        <Swipeable
          ref={ref => row[index] = ref}
          onSwipeableOpen={() => closeRow(index)}
          renderRightActions={() =>
            <RightButtons index={index} />}>
          <ProductItem check={items.radioButtonStore} item={item} onClick={onClick} />

        </Swipeable>
      }

    />

  </TouchableOpacity>
}


const ProductItem = ({ item, check = false, onClick }) => {

  const [isIncrease, setIsIncrease] = useState(false)
  const [count, setCount] = useState(1)
  const [isCheck, setIsCheck] = useState(item.radioButtonItem)

  return <TouchableOpacity
    onPress={onClick}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 14,
      paddingHorizontal: 10,
      flex: 1
    }}>
    <RadioButtons isCheck={isCheck} onClick={() => {
      setIsCheck(!isCheck)
    }} />

    <Image
      source={appIcons.shoeImageURL}
      style={{ width: 110, height: 110, borderRadius: 11, marginStart: 10 }}
    />
    <View
      style={{
        justifyContent: 'space-between',
        height: 110, width: '60%',
        paddingStart: 10
      }}>
      <View >
        <Text style={{ fontSize: 14, fontWeight: '500', color: colors.balc111111 }} numberOfLines={2}>
          若过度长的话只显示第一行
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#F9F9F9',
            width: 70,
            height: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
            marginTop: 5.5,
            flexDirection: 'row',
            gap: 4
          }}>
          <Text style={{ color: '#999999', fontSize: 14, fontWeight: '400' }} >
            白色; 38
          </Text>
          <DropDownGrey style={{ marginTop: 3 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: colors.lightOrange, fontSize: 21, fontWeight: '500' }}>
          {item.price}c.
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
                setCount(count - 1)
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
              setCount(count + 1)
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
    width: '100%',
  },

});
