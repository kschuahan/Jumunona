import { useEffect, useMemo, useState } from "react";
import { RouteNames } from "../../utils/RouteNames";
import { TouchableOpacity, View, ScrollView, Text, Image, FlatList, Dimensions, Alert } from "react-native";
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
import { useIsFocused } from "@react-navigation/native";
import { getAPICall, postAPICall } from "../../Netowork/Apis";
import { CartAPIs, OrderAPI } from "../../Netowork/Constants";
import { CenterProgressView, ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs";
import { PaymentWebView } from "./PaymentConfirmation";
interface CartAPIModel {
    cartId: string,
    note: string,
    byAir: boolean
    byTrain: Boolean
}
let cartAPIModel: CartAPIModel[] = []
let addingNoteForCart: any[] = []

export const CartConfirmOrderScreen = ({ navigation, route }) => {
    const [showNotePopup, setShowNotePopup] = useState(false)

    const [data, setData] = useState<CommonModal>()
    const [loading, setLoading] = useState(false)
    const [mainLoading, setMainLoading] = useState(false)
    const isFocused = useIsFocused();
    const [address, setAddress] = useState<any>()
    const [showPaymentPopup, setShowPaymentPopup] = useState(false)
    const [htmlData, setHtmlData] = useState('')
    useEffect(() => {
        callAPI()
    }, [])

    const onChangeAddress = (data: any) => {
        setAddress(data)
    };

    // getting cart produccts
    const callAPI = () => {
        setMainLoading(true)
        const ids = route.params.ids

        postAPICall({
            cartIds: ids,
        }, OrderAPI.placingOrder, true, (res: any) => {

            if (res.data && res.data.data && res.data.data.cartDetails) {
                setAddress(res.data.data.defaultAddress ? res.data.data.defaultAddress : undefined)
                let cartDetails = res.data.data.cartDetails
                cartDetails.forEach((it: any) => {
                    let array = it.products.map((it: any) => {
                        return (
                            {
                                cartId: it.cartId,
                                note: '',
                                byAir: false,
                                byTrain: true
                            }
                        )
                    }
                    )
                    cartAPIModel = [...cartAPIModel, ...array]
                })
            }
            setData(res)
            setMainLoading(false)
        }
        )
    }

    const createOrder = () => {
        setLoading(true)
        postAPICall({
            addressId: address._id,
            jCoinsUsed: 0,
            cartIds: cartAPIModel
        },
            OrderAPI.createOrder,
            true,
            (res: any) => {
                setLoading(false)
                // console.warn(res.data.data)
                if (res.isSuccess && res.data.data) {
                    setHtmlData(res.data.data)
                    setShowPaymentPopup(true)

                } else {
                    Alert.alert(res.data)
                }
            })
    }

    return (
        <View style={[styles.container, { padding: 0 }]}>
            <CustomHeader navigation={navigation} title={AppString.placing_an_order} />
            {data && data.data.data && data.isSuccess ? <View style={{ flex: 1 }}>
                <ScrollView
                    style={{ paddingHorizontal: 6 }}
                >
                    <AddressView data={address} onClick={() => {
                        isSelectingAddress = true
                        navigation.navigate(RouteNames.myAddress,
                            { isFromCart: true, onChangeAddress: onChangeAddress })
                    }} />
                    <FlatList
                        data={data.data.data.cartDetails}
                        scrollEnabled={false}
                        keyExtractor={item => {
                            return item.shopId;
                        }}
                        numColumns={1}
                        renderItem={({ item, index }) => {
                            return (

                                <CartItemListView check={item.radioButtonItem}
                                    navigation={navigation}
                                    items={item} onClick={() => {
                                        navigation.push(RouteNames.product_detail)
                                    }}
                                    onShowNotePopup={() => {
                                        setShowNotePopup(true)
                                    }}
                                />
                            );
                        }}
                    />
                    <TotalView data={data.data.data} />
                    <PaymentGateway />
                </ScrollView>
                <BottomView data={data.data.data} onCreateOrder={() => {
                    createOrder()
                }} />
            </View> : mainLoading ? <ProgressView /> :
                <RetryWhenErrorOccur data={data} onClick={() => {
                    setData(undefined)
                    callAPI()
                }} />}
            <DeliveryNotePopup isShow={showNotePopup} onOKPress={(text: string) => {
                cartAPIModel.forEach((it, index) => {
                    if (addingNoteForCart.indexOf(it.cartId) > -1) {

                        cartAPIModel[index].note = text
                    }
                })
                setShowNotePopup(false)
                console.warn(cartAPIModel)

            }} onClose={() => {
                setShowNotePopup(false)
            }} />
            <PaymentWebView isShow={showPaymentPopup} data={htmlData} onClick={() => {
                setShowPaymentPopup(false)
            }} />
            <CenterProgressView isShow={loading} />
        </View>
    )
}

const AddressView = ({ data, onClick }) => {
    return (
        <TouchableOpacity onPress={onClick}
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
            {data ? <View
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
                        color: colors.black14100D,
                        textTransform: 'capitalize'

                    }}
                >
                    {data.addressDetail}
                </Text>
                <Text
                    style={{
                        fontFamily: fontFamily.regular,
                        fontSize: 14,
                        color: colors.grayAAAAAA,
                        textTransform: 'capitalize'
                    }}
                >
                    {data.name} {data.phone}
                </Text>
            </View> : <Text
                style={{
                    fontFamily: fontFamily.bold,
                    fontWeight: 'bold',
                    fontSize: 14,
                    color: colors.black14100D,
                    textTransform: 'capitalize'

                }}
            >
                {"Add/Select your address"}
            </Text>}
            <ChevronFwdOutline
                color={colors.extraGrey}
                width={12}
                height={12}
                style={{
                    position: "absolute",
                    end: 12.5
                }}
            />
        </TouchableOpacity>
    )
}

const CartItemListView = ({ check = true, items, navigation, onClick, onShowNotePopup }) => {

    const totalPrice = useMemo(() => {
        const price = items.products.reduce((accumulator: any, currentValue: any) => accumulator + (currentValue.price), 0)
        return price;
    }, [items]);

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
                    paddingBottom: 9.5,
                    alignItems: 'center'
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
                    {items.shopName}
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
                                onPress={() => {
                                    addingNoteForCart = items.products.map((it: any) => it.cartId)
                                    console.warn(addingNoteForCart)
                                    onShowNotePopup()
                                }}
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
                                {AppString.note} {items.products.length}{AppString.piece}:
                            </Text>
                            <Text
                                style={{
                                    color: colors.lightOrange, fontSize: 15, fontWeight: "bold"
                                }}
                            >
                                {totalPrice}c.
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

    const selectedValue = useMemo(() => {
        const index = item.attr1.findIndex((element: any) => (element.isSelected))
        return item.attr1[index];
    }, [item]);
    const selectedSizes = useMemo(() => {
        const index = item.attr2.findIndex((element: any) => (element.isSelected))
        return item.attr2[index];
    }, [item]);

    return (
        <View>
            <TouchableOpacity
                disabled={true}
                onPress={onClick}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%'
                }}>

                <Image
                    source={item.productImage ? { uri: item.productImage } : appIcons.shoeImageURL}
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
                            <Text style={{ fontSize: 14, fontWeight: '600', color: colors.balc111111, width: "80%", maxHeight: 30 }} numberOfLines={1}>
                                {item.productName}

                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.balc111111 }} numberOfLines={2}>
                                {item.price}c.
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
                                {selectedValue && selectedValue.attributeValue ? selectedValue.attributeValue : "white"}
                                {"; "}
                                {selectedSizes && selectedSizes.attributeValue ? selectedSizes.attributeValue : "M"}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA }} numberOfLines={2}>
                                x{item.quantity}
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
                        {AppString.byTrain} ({item.byTrainTime}) {AppString.days}
                    </Text>
                    <Text style={{ fontSize: 13, fontWeight: '400', color: colors.grayAAAAAA, }}>
                        {AppString.byAir} ({item.byAirTime}) {AppString.days}
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
                        <RadioButtons isCheck={deliveryByTrain} onClick={() => {
                            if (!deliveryByTrain) {
                                setDeliveryByTrain(true)
                                let index = cartAPIModel.findIndex(it => it.cartId == item.cartId)
                                console.warn(index)
                                if (index > -1) {
                                    cartAPIModel[index].byAir = false
                                    cartAPIModel[index].byTrain = true
                                }
                            }
                        }} />
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
                            {item.byAirPrice}c.
                        </Text>
                        <RadioButtons
                            isCheck={!deliveryByTrain}
                            onClick={() => {
                                if (deliveryByTrain) {
                                    setDeliveryByTrain(false)
                                    let index = cartAPIModel.findIndex(it => it.cartId == item.cartId)
                                    if (index > -1) {
                                        cartAPIModel[index].byAir = true
                                        cartAPIModel[index].byTrain = false
                                    }
                                }
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

const TotalView = ({ data }) => {
    return (
        <View
            style={{
                marginTop: 9,
                paddingVertical: 10,
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
                    paddingTop: 10,
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
                        {"   "}{data.priceDetails.totalProductQuantity}
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
                    {data.priceDetails.totalPrice}с.
                </Text>
            </View>
            {/* Delivery Charges */}
            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 10,
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
                    paddingTop: 10,
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
                        0
                    </Text>
                    <EditIcon />
                </View>
            </View>
            {/*  */}

            <View
                style={{
                    flexDirection: "row",
                    width: "100%",
                    paddingTop: 10,
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
                    {data.priceDetails.totalPrice + 15}с.
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

const BottomView = ({ data, onCreateOrder }) => {
    return <View
        style={{
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            width: Dimensions.get('window').width,
            justifyContent: 'space-between',
            paddingVertical: 12,
            paddingHorizontal: 10,
            paddingTop: 10,
            flexDirection: 'row',
            borderTopStartRadius: 13,
            borderTopEndRadius: 13,
            shadowColor: colors.black,
            elevation: 10,
            height: 80,
            borderBlockColor: colors.whiteF7F7F7,
            borderBottomWidth: 1
        }}>
        <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center', marginBottom: 8
        }}>
            <Text
                style={{
                    fontSize: 14,
                    color: '#333333',
                    fontFamily: '400',
                    marginHorizontal: 4
                }}>
                {AppString.total + ` ${data.priceDetails.totalProductQuantity}шт:`}
            </Text>
            <Text
                style={{
                    fontSize: 24,
                    color: colors.lightOrange,
                    fontWeight: 'bold',
                    marginStart: 4,
                    marginBottom: 6
                }}>{data.priceDetails.totalPrice + 15}<Text
                    style={{
                        fontSize: 24,
                        color: colors.lightOrange,
                        fontWeight: '400',
                        marginStart: 4,
                        marginBottom: 6
                    }}>с.</Text></Text>
        </View>
        <CommonButton
            text={AppString.confirm}
            onClick={onCreateOrder}
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