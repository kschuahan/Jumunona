import { useEffect, useState } from "react";
import { RouteNames } from "../../utils/RouteNames";
import { TouchableOpacity, View, ScrollView, Text, Image, FlatList, Dimensions } from "react-native";
import EllipsisHorizontal from '../../../assets/Icons/ellipsis-horizontal.svg';
import ChevronBackOutline from '../../../assets/Icons/chevronBackOutline.svg';
import PinDrop from '../../../assets/Icons/PinDrop.svg';
import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import { AppString } from "../../utils/AppStrings";
import { fontFamily } from "../../utils/Fonts";
import { colors } from "../../utils/AppColors";
import { CustomHeader } from "../../components/Header";
import { styles } from "../../utils/AppStyles";
import { appIcons } from "../../utils/AppIcons";
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import EditIcon from '../../../assets/Icons/EditWithoutBorder.svg';
import PaymentIcon from '../../../assets/Icons/PaymentIcon.svg';
import LinearGradient from "react-native-linear-gradient";
import { DeliveryNotePopup } from "./DeliveryNotePopup";
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
];

export const CartConfirmOrderScreen = ({ navigation }) => {
    const [showNotePopup, setShowNotePopup] = useState(false)
    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.placing_an_order} />
            <ScrollView
                style={{ paddingHorizontal: 6 }}
            >
                <AddressView />
                <FlatList
                    data={cartItemData}
                    scrollEnabled={false}
                    keyExtractor={item => {
                        return item.id;
                    }}
                    numColumns={1}
                    renderItem={({ item, index }) => {
                        return (

                            <CartItemListView check={item.radioButtonItem}
                                navigation={navigation}
                                items={item} onClick={() => {
                                    navigation.push(RouteNames.product_detail)
                                }}
                                onShowNotePopup={ () => {
                                    setShowNotePopup(true)
                                }}
                                />
                        );
                    }}
                />
                <TotalView />
                <PaymentGateway />
            </ScrollView>
            <BottomView navigation={navigation}/>
            <DeliveryNotePopup isShow = {showNotePopup} onClose={ () => {
                setShowNotePopup(false)
            }} />
        </View>
    )
}

const AddressView = ({ }) => {
    return (
        <View
            style={{
                marginTop: 5,
                paddingTop: 14,
                paddingBottom: 10.5,
                paddingHorizontal: 12,
                flexDirection: "row",
                gap: 9,
                backgroundColor: colors.white,
                borderRadius: 13,
                alignItems: "center",
            }}
        >
            <PinDrop />
            <View
                style={{
                    flexDirection: "column",
                    width: "85%"
                }}
            >
                <Text
                    style={{
                        fontFamily: fontFamily.bold,
                        fontWeight: 'bold',
                        fontSize: 17,
                        color: colors.black14100D
                    }}
                >
                    Room 5505, Building G2, No. 88
                </Text>
                <Text
                    style={{
                        fontFamily: fontFamily.regular,
                        fontSize: 14,
                        color: colors.grayAAAAAA
                    }}
                >
                    Nazir 18080880808
                </Text>
            </View>
            <ChevronFwdOutline
                color={colors.extraGrey}
                width={12}
                height={12}
                style={{
                    position: "absolute",
                    end: 12.5
                }}
            />
        </View>
    )
}

const CartItemListView = ({ check = true, items, navigation, onClick, onShowNotePopup }) => {
    return (

        <View
            style={{
                marginTop: 9,
                paddingTop: 9.5,
                paddingBottom: 10.5,
                paddingHorizontal: 12,
                backgroundColor: colors.white,
                borderRadius: 13,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    paddingBottom: 9.5
                }}
            >
                <Image
                    source={appIcons.china}
                    style={{ width: 18, height: 18 }}
                />
                <Text
                    style={{
                        paddingLeft: 9,
                        paddingRight: 9,
                        color: colors.black, fontSize: 16, fontWeight: 'bold',
                    }}
                >
                    店铺名称
                </Text>


            </View>
            <FlatList
                data={items.products}
                renderItem={({ item, index }) => (
                    <CartItem check={items.radioButtonStore} item={item} onClick={onClick} />
                )}

                ListFooterComponent={
                    <View style={{
                        width: "100%",
                        paddingStart: 6,
                        paddingEnd: 3
                    }}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%"
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.balc111111, fontSize: 14
                                }}
                            >
                                {AppString.note}
                            </Text>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: 6
                                }}
                                onPress={onShowNotePopup }
                            >
                                <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA, }} numberOfLines={2}>
                                    {AppString.no}
                                </Text>
                                <ChevronFwdOutline width={4} height={8} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                gap: 3,
                                width: "100%",
                                paddingTop: 11
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.balc111111, fontSize: 14
                                }}
                            >
                                {AppString.note} 2{AppString.piece}:
                            </Text>
                            <Text
                                style={{
                                    color: colors.lightOrange, fontSize: 15, fontWeight: "bold"
                                }}
                            >
                                751c.
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>
    )
}

const CartItem = ({ item, check = false, onClick }) => {

    const [deliveryByTrain, setDeliveryByTrain] = useState(true)

    return (
        <View>
            <TouchableOpacity
                onPress={onClick}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                }}>

                <Image
                    source={appIcons.shoeImageURL}
                    style={{ width: 86, height: 86, borderRadius: 11, }}
                />
                <View
                    style={{
                        justifyContent: 'space-between',
                        height: 86,
                        paddingStart: 9.5,
                        width: "75%"
                    }}>
                    <View >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignContent: "space-between"
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.balc111111, width: "80%", maxHeight: 30 }} numberOfLines={2}>
                                若过度长的话只显示第一行 若过度长的话只显示第一行若过度长的话只显示第一行若过度长的话只显示第一行
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.balc111111 }} numberOfLines={2}>
                                368c.
                            </Text>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignContent: "space-between",
                                paddingTop: 6
                            }}
                        >
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA, width: "80%", maxHeight: 30 }} numberOfLines={2}>
                                Серый; Вали
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA }} numberOfLines={2}>
                                x1
                            </Text>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    width: '100%',
                    marginTop: 13.5,
                    marginBottom: 10.5,

                }}
            >
                <Text style={{ fontSize: 13, fontWeight: '400', color: colors.balc111111, }}>
                    {AppString.delivery}

                </Text>
                <View
                    style={{
                        paddingStart: 5.5,
                        gap: 9.5,
                    }}
                >
                    <Text style={{ fontSize: 13, fontWeight: '400', color: colors.grayAAAAAA, }}>
                        {AppString.byTrain} (28 - 34) {AppString.days}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: '400', color: colors.grayAAAAAA, }}>
                        {AppString.byAir} (4 - 8) {AppString.days}
                    </Text>
                </View>

                <View
                    style={{
                        paddingStart: 5.5,
                        gap: 9.5

                    }}
                >
                    <View
                        style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: '400', color: colors.balc111111, textAlign: "right" }}>
                            {AppString.free}
                        </Text>
                        <RadioButtons isCheck={deliveryByTrain} onClick={() => { setDeliveryByTrain(!deliveryByTrain) }} />
                    </View>
                    <View
                        style={{
                            justifyContent: "flex-end",
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center"
                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: '400', color: colors.balc111111, textAlign: "right" }}>
                            15c.
                        </Text>
                        <RadioButtons
                            isCheck={!deliveryByTrain}
                            onClick={() => {
                                setDeliveryByTrain(!deliveryByTrain)
                            }} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const RadioButtons = ({ isCheck = false, onClick }) => {
    return true ? <TouchableOpacity onPress={onClick}>{isCheck ? (
        <CheckmarkCircle width={16} height={16} color={colors.lightOrange} />
    ) : (
        <EllipsisHorizontalNormal width={16} height={16} />
    )}</TouchableOpacity> : null
}

const TotalView = ({ }) => {
    return (
        <View
            style={{
                marginTop: 9,
                paddingVertical: 17.5,
                paddingHorizontal: 12,
                backgroundColor: colors.white,
                borderRadius: 13
            }}
        >
            <Text style={{
                fontSize: 16,
                fontWeight: '500',
                color: colors.balc111111,
            }}>
                {AppString.details}
            </Text>

            {/* Товары detail */}
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 17,
                    justifyContent: "space-between"
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.balc111111,
                }}>
                    {AppString.goods}
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: colors.lightOrange,
                        marginLeft: 13
                    }}>
                        {"   "}2
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: colors.grayAAAAAA,
                        marginLeft: 13
                    }}>
                        {AppString.piece}
                    </Text>
                </Text>

                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.balc111111,
                }}>
                    736с.
                </Text>
            </View>
            {/* Delivery Charges */}
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 17,
                    justifyContent: "space-between"
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: colors.balc111111,
                }}>
                    {AppString.delivery}
                </Text>

                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.balc111111,
                }}>
                    15с.
                </Text>
            </View>

            {/*  J Coin View */}
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 17,
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Text style={{
                    fontSize: 21,
                    fontWeight: '500',
                    color: colors.lightOrange,
                }}>
                    J
                    <Text style={{
                        fontSize: 15,
                        fontWeight: '500',
                        color: colors.lightOrange,
                        marginLeft: 13
                    }}>
                        {"  "} coin
                    </Text>
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 7
                    }}
                >

                    <CheckmarkCircle width={14} height={14} />
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: colors.lightOrange,
                    }}>
                        -33
                    </Text>
                    <EditIcon />
                </View>
            </View>
            {/*  */}

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 17,
                    justifyContent: "space-between"
                }}
            >
                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.balc111111,
                }}>
                    {AppString.total}
                </Text>

                <Text style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: colors.balc111111,
                }}>
                    718с.
                </Text>
            </View>
        </View>
    )
}

const PaymentGateway = () => {
    return (
        <View
            style={{
                marginTop: 9,
                paddingVertical: 17.5,
                paddingHorizontal: 12,
                backgroundColor: colors.white,
                borderRadius: 13,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 100
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    gap: 7
                }}
            >
                <PaymentIcon />
                <Text style={{
                    fontSize: 17,
                    fontWeight: '400',
                    color: colors.balc111111,
                }}>
                   Корти милли
                </Text>
            </View>
            <CheckmarkCircle />
        </View>
    )
}

const BottomView = ({navigation}) => {
   return <View
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
            borderBottomWidth: 1
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                color: '#333333',
                fontFamily: '400',
                marginHorizontal: 4
              }}>
              {AppString.total + ':'}
            </Text>
          <Text
                style={{
                  fontSize: 22,
                  color: colors.lightOrange,
                  fontWeight: 'bold',
                  marginStart: 4
                }}>786c.</Text>
            </View>
            <CommonButton
            text= {AppString.confirm}
              onClick={() => {
                navigation.navigate(RouteNames.cartConfirmOrder)
              }}
            />
         
        </View>
}

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
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: 20,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <Text
            style={[
              styles.textStyle,
              { color: colors.white, fontWeight: '400', fontSize: 16, paddingHorizontal: 19 },
            ]}>
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };