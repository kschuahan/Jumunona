import {
  Modal,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { createRef, useEffect, useRef, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { AppString } from '../../utils/AppStrings';
import { styles } from '../../utils/AppStyles';
import { imagesUrl } from '../../utils/AppIcons';
import { colors } from '../../utils/AppColors';
import { fontFamily } from '../../utils/Fonts';
import CloseIcon from '../../../assets/Icons/closeIcon.svg';
import ShieldCheckmarkIcon from '../../../assets/Icons/sheildCheckmark.svg';
import Policy from '../../../assets/Icons/Policy.svg';

import ScaleIcon from '../../../assets/Icons/PhoneData.svg';
import AddCircleOutline from '../../../assets/Icons/AddCircle.svg';
import ChevronFwdOutline from '../../../assets/Icons/ForwardOrange.svg';
import ResizeIcon from '../../../assets/Icons/resizeIcon.svg';
import RemoveCircleOutline from '../../../assets/Icons/removeCircleOutline.svg';
import { RouteNames } from '../../utils/RouteNames';
import { ActivityIndicatorView } from '../../components/Dialogs';
import { postAPICall } from '../../Netowork/Apis';
import { CartAPIs } from '../../Netowork/Constants';

export enum ColorSizeBottomSheetMode {
  selectSize = "selectSize",
  addToCart = "addToCart",
  buyNow = "buyNow"

}

var addToCartModel = {
  productId: "",
  quantity: 1,
  attr1_id: "",
  attr2_id: "",
  attr3_id: "",
}
var hasSetSelectedColor = false
var isCart = false;
var colorIndex = -1;
var sizeIndex = -1
const SelectProductSizeColorScreen = ({ navigation,
  productDetail,
  displayImage,
  currentMode = ColorSizeBottomSheetMode.selectSize,
  isShow = false,
  onClose,
  onGuranty,
  onGoToCart }) => {


  useEffect(() => {
    colorIndex = -1
    sizeIndex = -1
    addToCartModel = {
      productId: productDetail._id,
      quantity: 1,
      attr1_id: "",
      attr2_id: "",
      attr3_id: "078bb017-6bff-4462-b833-dee4db0e7f37",
    }
    hasSetSelectedColor = true
  }, [])



  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={isShow}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose}
        style={[
          styles.botton_view,
          { backgroundColor: 'rgba(0, 0,0, .7 )', justifyContent: 'flex-end' },
        ]}>
        <Pressable
          style={{
            paddingHorizontal: 10,
            backgroundColor: colors.white,
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            width: '100%',
            flex: 0.79,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'space-between',
              }}>
              <Image
                source={{ uri: displayImage }}
                style={{ height: 65, width: 65, borderRadius: 10, margin: 3 }}
              />

              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 21,
                    fontFamily: fontFamily.regular,
                    color: colors.startOrange,
                  },
                ]}>
                {productDetail.price}c.
              </Text>
            </View>
            <TouchableOpacity
              style={{ marginEnd: 7.11, marginTop: 6 }}
              onPress={() => {
                onClose();
              }}>
              <CloseIcon width={15} height={15} />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}>
            <CancelReturnPolicyView onClick={() => {
              onGuranty()
            }} />
            <PhoneDataScreen onClick={() => {
              onClose()
              navigation.navigate(RouteNames.bodyData)
            }} />
            <View
              style={{
                height: 1,
                marginVertical: 12,
                backgroundColor: colors.darkWhite,
              }}
            />
            {productDetail ?
              <ColorOptions
                colorOptions={productDetail.attributes.attribute1.attr1}
                onSelectColor={(selectedColor: any) => {
                  addToCartModel.attr1_id = selectedColor.attributeID
                }}
                onSelectSize={(id: string) => {

                  addToCartModel.attr2_id = id
                }}
                onSelectQuantity={(quantity: number) => {
                  addToCartModel.quantity = quantity
                }}
              />
              : null
            }
          </ScrollView>

          {
            currentMode == ColorSizeBottomSheetMode.selectSize ?

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 35,
                  paddingBottom: 20,
                }}>
                <CommonButton
                  text={AppString.add_to_cart}
                  startorange={colors.yellowStart}
                  endColor={colors.yellowEnd}
                  productIncart={productDetail ? (productDetail.productIncart || isCart) : false}
                  onClick={(addedToCart: boolean) => {
                    onGoToCart()
                  }}
                />
                <CommonButton text={AppString.buy} onClick={() => { }} />
              </View>
              : currentMode == ColorSizeBottomSheetMode.addToCart ?

                <View style={{
                  marginVertical: 35,
                  paddingBottom: 20,
                }}>
                  <CommonButton text={AppString.add}
                    productIncart={productDetail ? (productDetail.productIncart || isCart) : false}
                    onClick={() => {
                      onGoToCart()
                    }
                    } />
                </View>
                :
                <View style={{
                  marginVertical: 35,
                  paddingBottom: 20,
                }}>
                  <CommonButton text={AppString.buy} onClick={() => { }} />
                </View>

          }
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const CancelReturnPolicyView = ({ onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: 6,
          alignItems: 'center',
          paddingVertical: 4,
          paddingHorizontal: 6,
          backgroundColor: '#F6F6F6',
          borderRadius: 8,
          justifyContent: 'flex-start',
        },
      ]}>
      <Policy />
      <Text
        style={[
          styles.textStyle,
          {
            fontSize: 14,
            fontWeight: '400',
            paddingStart: 8,
          },
        ]}>
        Доставка Возврат - Цена - Отмена заказа
      </Text>
    </TouchableOpacity>
  );
};

const PhoneDataScreen = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}
      style={[
        styles.profile,
        {
          marginTop: 13,
          alignItems: 'center',
          paddingVertical: 5,
          paddingHorizontal: 6,
          backgroundColor: '#FDF1EC',
          borderRadius: 8,
          justifyContent: 'space-between',
        },
      ]}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ScaleIcon />
        <Text
          style={[
            styles.textStyle,
            { fontSize: 14, paddingStart: 4.22, fontWeight: '400' },
          ]}>
          Данные тел
        </Text>
      </View>
      <ChevronFwdOutline color={colors.startOrange} width={12} height={12} />
    </TouchableOpacity>
  );
};
const ColorOptions = ({ colorOptions, onSelectColor, onSelectSize, onSelectQuantity }) => {
  const [selectedColorIndex, setSelectColorIndex] = useState(-1)


  useEffect(() => {

    const filter = colorOptions.data
   // .filter(it => it.quantity > 0)
   // console.log("Filter" + filter);

    if (filter.length > 0) {
      const cartItemIndex = filter.findIndex((element) => (element.isItemInCart));
      console.log("cartItemIndex", cartItemIndex);

      if (cartItemIndex != -1) {
        // const index = filter.findIndex((element) => (element.attirbutedID ===
        //   filter[cartItemIndex].attirbutedID));
        addToCartModel.attr1_id = filter[cartItemIndex].attirbutedID

        setSelectColorIndex(cartItemIndex)
        console.log("cartItemIndexIndex", cartItemIndex);
      } else {
        // const index = colorOptions.data.findIndex((element) => (element.attirbutedID ===
        //   filter[0].attirbutedID));
        setSelectColorIndex(colorIndex != -1 ? colorIndex : -1)

       // console.log("Index", index);
      }

    }

  }, [])


  return (
    <View>
      <Text style={[styles.textStyle, { fontSize: 14 }]}>
        {colorOptions.attributeName} ({colorOptions.data.length})
      </Text>

      <FlatList
        data={colorOptions.data}
        renderItem={({ item, index }) => {

          // if (!hasSetSelectedColor && item.quantity > 0) {
          //   // console.warn("fsdfdsf", selectedColorIndex)
          //   setSelectColorIndex(index)
          //   hasSetSelectedColor = true
          // }
          return (
            <View style={{ marginEnd: 8 }}>
              <View style={{ height: 13 }} />
              <TouchableOpacity disabled={item.quantity == 0}
                onPress={() => {
                  colorIndex = index
                  onSelectColor(colorOptions.data[index])
                  setSelectColorIndex(index)
                }}>
                <View
                  style={{
                    marginHorizontal: 1,
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignContent: 'center',
                  }}>
                  <Image
                    source={{ uri: item.skuImageUrlPath }}
                    style={{
                      width: 109, height: 111, borderTopLeftRadius: 7,
                      borderTopRightRadius: 7
                    }}
                  />
                  <View
                    style={{
                      width: 109,
                      height: 42,
                      justifyContent: 'center',
                      backgroundColor: '#F6F6F6',
                      borderBottomLeftRadius: 7,
                      borderBottomRightRadius: 7
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'center',
                          alignSelf: 'center',
                          color:
                            selectedColorIndex == index
                              ? colors.startOrange
                              : colors.black,
                          marginTop: 4,
                          fontSize: 10
                        },
                      ]}>
                      {' '}
                      {item.attributeValue}
                    </Text>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: 5,
                      end: 4,
                      height: 19,
                      width: 19,
                      backgroundColor: colors.greyB3B3B38C,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 10,
                    }}>
                    <ResizeIcon width={19} height={19} color={colors.white} />
                  </View>
                </View>
                {selectedColorIndex == index ? (
                  <View
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(255, 118, 0, 0.08)',
                      width: '100%',
                      height: '100%',
                      borderRadius: 7,
                      borderColor: colors.startOrange,
                      borderWidth: 1,
                    }}
                  />
                ) : null}

                {item.quantity == 0 ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -10,
                      end: -1,
                      height: 13,
                      width: 44,
                      backgroundColor: colors.greyCCCCCC,
                      borderColor: colors.whiteF2F2F2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomEndRadius: 5,
                      borderTopStartRadius: 5,
                    }}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: colors.white,
                          fontSize: 10,
                        },
                      ]}>
                      sold out
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            </View>
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <View
        style={{
          height: 1,
          marginVertical: 13,
          backgroundColor: colors.darkWhite,
        }}
      />

      <SizeAndBuyingForView productDetail={colorOptions}
        selectedColorIndex={selectedColorIndex} onSelectSize={onSelectSize} />
      <View
        style={{
          height: 1,
          marginVertical: 10,
          backgroundColor: colors.darkWhite,
        }}
      />
      <QuanityView onClick={(qunatity: number) => {
        onSelectQuantity(qunatity)
      }}
        quantity={colorOptions.data[selectedColorIndex != -1 ? selectedColorIndex : 0].quantity} />

    </View>
  );
};

const SizeAndBuyingForView = ({ productDetail, selectedColorIndex, onSelectSize }) => {
  const [selectedSize, setSelecteSize] = useState(0);
  const users = ['Vali', 'Name 2', '+ Add'];
  const sizes = ['24', '25', '26', '27', '28', '29', '30', '31', '32'];
  const [selectedItem, setSelecteItem] = useState('');

  useEffect(() => {
    onSelectSize(selectedItem)
  }, [selectedItem])

  useEffect(() => {
    const sizes = productDetail.data[selectedColorIndex != -1 ? selectedColorIndex : 0].att2.data
   // const filter = sizes.filter(it => it.quantity > 0)
   // console.log("Filter" + filter);

     if (sizes.length > 0) {
      const cartItemIndex = sizes.findIndex((element) => (element.isItemInCart));
    //   console.log("Index", cartItemIndex);

      if (cartItemIndex != -1) {
        // const index = sizes.findIndex((element) => (element.attirbutedID ===
        //   sizes[cartItemIndex].attirbutedID));
        addToCartModel.attr2_id = sizes[cartItemIndex].attributeID
        setSelecteItem(sizes[cartItemIndex].attributeID)
        console.log("Index", cartItemIndex);
      } else {
        // const index = sizes.findIndex((element) => (element.attirbutedID ===
        //   filter[0].attirbutedID));

        setSelecteItem(sizeIndex != -1 ? sizes[sizeIndex].attirbutedID : "")

        // console.log("Index", index);
      }

    }

  }, [selectedSize])


  return (
    <View style={{ width: '100%' }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={['Для', 'Размер']}
        renderItem={({ item, index }) =>
          <TouchableOpacity
            onPress={() => {
              setSelecteSize(index);
            }}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginEnd: 20 }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    fontSize: 14,
                    color: index == selectedSize ? colors.startOrange : colors.black,
                  },
                ]}>
                {item}
              </Text>
              {index == selectedSize ? (
                <View
                  style={{
                    height: 2,
                    backgroundColor: colors.startOrange,
                    width: 30,
                    marginTop: 2
                  }}
                />
              ) : null}
            </View>
          </TouchableOpacity>}
      />

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
        {(selectedSize == 1 ? productDetail.data[selectedColorIndex != -1 ? selectedColorIndex : 0].att2.data : users).map((item: any, index: number) =>
          <View style={{ margin: 8 }}>
            <TouchableOpacity
              onPress={() => {
                if (selectedSize == 1 && hasSetSelectedColor) {
                  sizeIndex = index
                  setSelecteItem(item.attributeID)
                  //onSelectSize(item.attributeID)
                } else {
                  setSelecteItem(item)
                }
              }}>
              <View
                style={{
                  paddingHorizontal: selectedSize == 0 ? 16 : undefined,
                  justifyContent: 'center',
                  backgroundColor: '#F6F6F6',
                  borderRadius: selectedSize == 1 ? 5 : 15,
                  height: 28,
                  width: selectedSize == 1 ? 56 : undefined
                }}>
                <Text
                  style={[
                    styles.textStyle,
                    {
                      color:
                        selectedItem == item
                          ? colors.startOrange
                          : colors.black121212,
                      textAlign: 'center',
                      alignSelf: 'center',
                      fontSize: selectedSize == 1 ? 12 : 14,
                    },
                  ]}>
                  {' '}
                  {selectedSize == 1 ? item.attributeValue : item}
                </Text>
              </View>
            </TouchableOpacity>
            {((selectedSize == 1 && selectedItem == item.attributeID) || (selectedSize == 0 && selectedItem == item)) ? (
              <View
                style={{
                  position: 'absolute',
                  backgroundColor: 'rgba(255, 118, 0, 0.08)',
                  width: '100%',
                  height: '100%',
                  borderRadius: selectedSize == 1 ? 5 : 15,
                  borderColor: colors.startOrange,
                  borderWidth: 1,
                }}
              />
            ) : null}
          </View>)}
      </View>
      {/* )}
        showsVerticalScrollIndicator={false}
      /> */}
    </View>
  );
};

const QuanityView = ({ quantity, onClick }) => {
  const [quantiy, setQuantity] = useState(1);

  const maxQuantity = quantity;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
      }}>
      <Text
        style={[
          styles.textStyle,
          { textAlign: 'center', fontSize: 14, alignSelf: 'center' },
        ]}>
        {' '}
        Количество
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          onPress={() => {
            if (quantiy > 1 &&
              addToCartModel.attr2_id.length != 0
              && addToCartModel.attr1_id.length != 0) {
              setQuantity(quantiy - 1);
              onClick(quantiy)
            }
          }}>
          <RemoveCircleOutline
            color={quantiy > 1 ? colors.startOrange : '#F1F1F1'}
            width={30}
            height={30}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.textStyle,
            { alignSelf: 'center', fontSize: 17, paddingRight: 8 },
          ]}>
          {' '}
          {quantiy.toString()}
        </Text>
        <TouchableOpacity
          onPress={() => {
            if (quantiy < maxQuantity &&
              addToCartModel.attr2_id.length != 0
              && addToCartModel.attr1_id.length != 0) {
              setQuantity(quantiy + 1);
              onClick(quantiy)
            }
          }}>
          <AddCircleOutline
            color={quantiy < maxQuantity ? colors.startOrange : '#F1F1F1'}
            width={30}
            height={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CommonButton = ({
  text = AppString.add_to_cart,
  endColor = colors.endOrange,
  startorange = colors.startOrange,
  productIncart = false,
  onClick,
}) => {
  const [isItemInCart, setIsItemInCart] = useState(productIncart)
  const [loading, setLoading] = useState(false)
  const validate = () => {
    if (addToCartModel.attr1_id.length == 0) {
      Alert.alert("Please select color")
      return false
    }
    else if (addToCartModel.attr2_id.length == 0) {
      Alert.alert("Please select size")
      return false
    } else { }
    return true
  }

  const addToCart = () => {
    setLoading(true)
    postAPICall(addToCartModel,
      CartAPIs.addToCart,
      true,
      ((res: any) => {
        setLoading(false)
        if (res.isSuccess) {
          Alert.alert(AppString.alert, "Product added to cart successfully.")
          isCart = true
          setIsItemInCart(true)
        } else {
          Alert.alert(AppString.alert, res.data.toString())
        }
      })
    )
  }

  return (
    <TouchableOpacity onPress={() => {
      if (text == AppString.add || text == AppString.add_to_cart) {
        if (isItemInCart) {
          onClick()
        }
        else if (validate()) {
          addToCart()
        }
      } else {
        onClick()
      }
    }} style={{ flex: 0.5 }} disabled={loading}>
      <LinearGradient
        colors={[startorange, endColor]}
        start={{ x: 0.4, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 1000,
          marginEnd: 10,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {

          loading ?
            <ActivityIndicatorView tintColor={colors.white} />
            :
            <Text
              style={[
                styles.textStyle,
                { color: colors.white, fontWeight: 'bold', fontSize: 14 },
              ]}>
              {(text == AppString.add || text == AppString.add_to_cart) ? isItemInCart ? AppString.go_to_cart : text : text}
            </Text>
        }
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SelectProductSizeColorScreen;
