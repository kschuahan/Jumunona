import { Dimensions, FlatList, Image, Platform, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { Card } from "react-native-paper"
import { BackLogo, MenuLogo } from "../../components/Header"
import React, { useEffect, useState } from "react"
import { colors } from "../../utils/AppColors"
import { AppString } from "../../utils/AppStrings"
import App from "../../../App"
import PinDrop from '../../../assets/Icons/PinDrop.svg';
import { appIcons, imagesUrl } from "../../utils/AppIcons"

import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import DropDownMenu from '../../../assets/Icons/DropDownMenu.svg';
import CopyIcon from '../../../assets/Icons/CopyIcon.svg';
import ChatIcon from '../../../assets/Icons/ChatGreen.svg';
import DeliveryIcon from '../../../assets/Icons/DeliveryIcon.svg';
import CheckIcon from '../../../assets/Icons/CheckIcon.svg';


import { RelatedProducts, buttonsClick, orders, slectefListCal } from "./MyOrders"
import { RouteNames } from "../../utils/RouteNames"
import { getAPICall } from "../../Netowork/Apis"
import { OrderAPI } from "../../Netowork/Constants"
import { CommonModal } from "../HomeScreen"
import { ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs"


export const OrderDetailsScreen = ({ navigation, route }) => {
    const [type, setType] = useState(route.params.type)
    const [data, setData] = useState<CommonModal>()
    const [products, setProducts] = useState<any>()
    const [orderInfo, setOrderInfo] = useState<any>()

    const [address, setAddress] = useState<any>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getOrderDetail()
    }, [])
    const getOrderDetail = () => {
        setLoading(true)
        getAPICall(OrderAPI.getOrderDetail + route.params.orderId, (res: any) => {
            if (res.isSuccess) {
                if (res.data && res.data.data) {
                    setAddress(res.data.data.defaultAddress)
                    setProducts(res.data.data.products)
                    setOrderInfo(res.data.data.orderInformation)
                }
            }
            setData(res)
            setLoading(false)
        })
    }
    return <View style={[styles.container, { padding: 0 }]}>
        <ToolbarHeader navigation={navigation} route={route} />
        {data && data?.isSuccess && data?.data.data ?
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    ListHeaderComponent={<View style={{ paddingHorizontal: 6 }}>

                        <AddressView address={address} type={route.params.status} onClick={() => {
                            navigation.navigate(RouteNames.changeAddress)

                        }} />
                        <View style={{
                            justifyContent: 'space-between', alignItems: 'center',
                            flexDirection: 'row', backgroundColor: 'white', borderRadius: 13, padding: 10, marginTop: 9
                        }}>
                            <Text style={[styles.textStyle, { fontSize: 14, fontWeight: 'bold' }]}>{AppString.delivery}</Text>
                            <Text style={[styles.textStyle, { fontSize: 14, color: '#656565' }]}>{AppString.will_ship_until + ' 25.12.2022'}</Text>

                        </View>
                    </View>}
                    data={products}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) =>
                        <OrderItem items={item} onClick={(click: number) => {
                            if (click == 1) {
                                navigation.navigate(RouteNames.shopHomeScreen)
                            }

                        }} type={type} navigation={undefined} />
                    }
                    ListFooterComponent={
                        <View style={{ paddingHorizontal: 6 }}>
                            <CoinWord orderInfo={orderInfo} />
                            <InformationAboutOrder orderInfo={orderInfo} onClick={() => {
                                navigation.push(RouteNames.chat_screen);

                            }} />
                            {/* <RelatedProducts
                                onclick={() => {
                                    navigation.push(RouteNames.product_detail);
                                }}
                            /> */}
                        </View>
                    }
                />


                <View
                    style={{
                        backgroundColor: colors.white,
                        position: 'absolute',
                        bottom: 0,
                        width: Dimensions.get('window').width,
                        justifyContent: 'space-between',
                        paddingVertical: 12,

                        paddingEnd: 10,
                        flexDirection: 'row',
                        paddingTop: 8,
                        borderTopStartRadius: 13,
                        borderTopEndRadius: 13,
                        shadowColor: colors.black,
                        elevation: 10,
                        borderBlockColor: colors.whiteF7F7F7,
                        borderBottomWidth: 1,
                        height: 78
                    }}>

                    <FlatList
                        data={slectefListCal(products[0].status)}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        inverted
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                style={{
                                    marginStart: 10,
                                    height: 34,
                                    borderWidth: 1,
                                    borderRadius: 17,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 10,
                                    borderColor: 0 === index ? colors.lightOrange : colors.greyCCCCCC
                                }} onPress={() => {
                                    //setSelect(index)}
                                    buttonsClick(navigation, item)
                                }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: 0 === index ? colors.lightOrange : colors.black,
                                    }}>
                                    {item}
                                </Text>
                            </TouchableOpacity>}
                    />
                </View>
            </View> : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
                setData(undefined)
                getOrderDetail()
            }} />
        }

    </View>
}

const InformationAboutOrder = ({ orderInfo, onClick }) => {

    const [show, setShow] = useState(true)

    return <View style={{
        backgroundColor: 'white',
        borderRadius: 13, padding: 10, marginTop: 9
    }}>


        <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
            <Text style={[styles.textStyle, { fontSize: 16, fontWeight: '500' }]}>
                {AppString.information_about_order}
            </Text>
            <TouchableOpacity onPress={() => {
                setShow(!show)
            }}>
                <DropDownMenu />
            </TouchableOpacity>
        </View>
        {show ? <View style={{ width: '100%' }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                <TitleWithSubTitle subTitle={orderInfo.orderId} />
                <TouchableOpacity>
                    <CopyIcon />
                </TouchableOpacity>
            </View>
            <TitleWithSubTitle title={AppString.noteColon} subTitle={orderInfo.note} marginStart={25} />
            <TitleWithSubTitle title={'J Coin'} subTitle={'Заработайте ' + orderInfo.jCoinsEarned + ' coins'} marginStart={70} />
            <TitleWithSubTitle title={'Заказано в:'} subTitle={orderInfo.orderDate ?? ''} marginStart={35} />
            {/* <TitleWithSubTitle title={'Оплачено в:'} subTitle="2022-02-02 15:43:02" marginStart={35} /> */}

            {<TitleWithSubTitle title={'Доставлено в:'} subTitle="2022-02-02 15:43:02" marginStart={18} />
            }

        </View> : null}

        <View style={{ height: 0.5, width: '100%', backgroundColor: colors.greyCCCCCC, marginVertical: 5, marginTop: 10 }} />

        <TouchableOpacity onPress={onClick} style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 10, paddingVertical: 5 }}>
            <ChatIcon />
            <Text style={[styles.textStyle, { fontSize: 14, color: '#606060' }]}>
                {AppString.contact_to_seller}
            </Text>
        </TouchableOpacity>
    </View>
}

const TitleWithSubTitle = ({ title = AppString.orderId, subTitle = '1231231231321321321321', marginStart = 45 }) => {

    return <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 6 }}>
        <Text style={[styles.textStyle, { fontSize: 13 }]}>
            {title}
        </Text>
        <Text style={[styles.textStyle, { fontSize: 13, marginStart: marginStart }]}>
            {subTitle}
        </Text>
    </View>
}

const CoinWord = ({ orderInfo }) => {

    return <View style={{
        alignItems: 'center',
        flexDirection: 'row', backgroundColor: 'white',
        borderRadius: 13, padding: 10, marginTop: 9
    }}>
        <View style={{
            justifyContent: 'center', alignItems: 'center',
            height: 15, width: 15, borderRadius: 8, borderColor: '#EB4B3A',
            borderWidth: 0.5, marginEnd: 4
        }}>
            <Text style={[styles.textStyle, {
                fontSize: 10,
                color: '#EB4B3A',
            }]}>{'J'}</Text>
        </View>
        <Text style={[styles.textStyle, { fontSize: 14, }]}>
            {AppString.earn} <Text style={[styles.textStyle, {
                fontSize: 16,
                color: '#EB4B3A', fontWeight: 'bold'
            }]}>{orderInfo.jCoinsEarned.toString()}</Text> Coin

        </Text>

    </View>
}


const OrderItem = ({ items, onClick, type = AppString.processing, navigation }) => {
    const [select, setSelect] = useState(0)

    return <TouchableOpacity onPress={() => {
        onClick(2)
    }} style={{
        marginTop: 9,
        paddingTop: 9.5,
        paddingBottom: 10.5,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
        borderRadius: 13,
    }}>

        <View style={{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <TouchableOpacity
                onPress={() => {
                    onClick(1)
                }}
                style={{
                    flexDirection: "row",
                    alignItems: 'center',
                    marginBottom: 6
                }}
            >
                <Image
                    source={appIcons.china}
                    style={{ width: 18, height: 18 }}
                />
                <Text
                    style={{
                        paddingLeft: 8,
                        color: colors.black, fontSize: 16, fontWeight: 'bold',
                    }}
                >
                    {items.storeName}
                </Text>
                <ChevronFwdOutline
                    color={colors.extraGrey}
                    width={10}
                    height={10}
                    style={{ marginTop: 4 }}
                />

            </TouchableOpacity>

            {/* <Text
                style={{
                    color: colors.lightOrange, fontSize: 17, fontWeight: '400',
                }}
            >
                {
                    getButtonType(type)
                }
            </Text> */}
        </View>
        {/* <FlatList
            data={items.products}
            scrollEnabled={false}
            style={{ marginTop: 10 }}
            renderItem={({ item, index }) => ( */}
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
                    source={{ uri: items.productImage }}
                    style={{ width: 90, height: 90, borderRadius: 11, }}
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
                                {items.productName}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.balc111111 }} numberOfLines={2}>
                                {items.unitPrice}
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
                                {items.attr1}, {items.attr2}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: colors.grayAAAAAA }} numberOfLines={2}>
                                x{items.quantity}
                            </Text>
                        </View>
                    </View>


                </View>
            </TouchableOpacity>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignContent: "space-between",
                    paddingTop: 2
                }}
            >
                <View />
                <Text style={{ fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize', color: colors.black }} numberOfLines={1}>
                    {items.status}  <Text style={{ fontSize: 17, fontWeight: '400', color: colors.balc111111 }} numberOfLines={1}>
                        {items.totalPrice}c.
                    </Text>
                </Text>
            </View>



        </View>


    </TouchableOpacity >

}

const AddressView = ({ address, type = '', onClick }) => {
    return (
        <TouchableOpacity disabled={true} onPress={onClick}
            style={{
                marginTop: 5,
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 12,
                flexDirection: "row",
                backgroundColor: colors.white,
                borderRadius: 13,
                alignItems: "center",
                justifyContent: 'space-between'
            }}
        >
            <View style={{
                flexDirection: 'row', alignItems: 'center', width: "68%", gap: 9
            }}>
                {type == AppString.processing || type == AppString.sent ? <DeliveryIcon />
                    : type == AppString.review ? <CheckIcon /> : <PinDrop />}
                <View
                    style={{
                        flexDirection: "column",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: 'bold',
                            fontSize: 17,
                            color: colors.black14100D
                        }}
                    > {address.addressDetail} { }
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: colors.grey9D9D9D
                            }}
                        >{address.phone}</Text>
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '400',

                            color: colors.grey9D9D9D
                        }}
                    >
                        {type != AppString.review ?
                            (address.addressDetail + ', ' + address.city + ', ' + address.state + ', ' + address.country) : 'Оставьте отзыв и получайте бонус!'}
                    </Text>
                </View>
            </View>
            {type != AppString.review ? <TouchableOpacity style={{
                borderColor: '#9E9E9E',
                borderRadius: 17,
                borderWidth: 0.6,
                height: 29,
                width: 81,
                justifyContent: 'center',
                alignItems: 'center',

            }}
                onPress={onClick}
            >
                <Text style={[styles.textStyle, { fontSize: 13 }]}>{AppString.change}</Text>
            </TouchableOpacity> : null}
        </TouchableOpacity>
    )
}


const ToolbarHeader = ({ navigation, route }) => {


    return <Card
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            borderRadius: 13,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <BackLogo navigation={navigation} />
                <Text
                    style={{
                        fontSize: 21,
                        color: colors.black, fontWeight: 'bold',
                        textAlign: 'center',
                        width: getSubTitle(route.params.status) != '' ? undefined : '85%',
                        paddingStart: getSubTitle(route.params.status) != '' ? 0 : 30
                    }}>
                    {getTitle(route.params.status)}
                    {getSubTitle(route.params.status) != '' ? <Text
                        style={{
                            fontSize: 13,
                            color: colors.black, fontWeight: '400'
                        }}>
                        {
                            '\n' + getSubTitle(route.params.status)
                        }
                    </Text> : null}
                </Text>
            </View>
            <MenuLogo />
        </View>

    </Card>
}

const getTitle = (type: string) => {

    if (type == AppString.not_paid || type == AppString.awaiting_payment) {
        return AppString.the_order_not_has_been_paid
    } else if (type = AppString.processing) {
        return AppString.order_processing
    }
    else if (type = AppString.sent) {
        return AppString.the_order_has_been_sent
    } else {
        return AppString.order_completed
    }

}


const getSubTitle = (type: string) => {

    if (type == AppString.not_paid || type == AppString.awaiting_payment) {
        return `23 ${AppString.hours} 59 ${AppString.minute} ${AppString.until_automaticaaly_close}`

    } else {
        return ''

    }

}