import { Dimensions, FlatList, Image, Platform, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { Card } from "react-native-paper"
import { BackLogo, MenuLogo } from "../../components/Header"
import React, { useState } from "react"
import { colors } from "../../utils/AppColors"
import { AppString } from "../../utils/AppStrings"
import App from "../../../App"
import PinDrop from '../../../assets/Icons/PinDrop.svg';
import { appIcons } from "../../utils/AppIcons"

import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import DropDownMenu from '../../../assets/Icons/DropDownMenu.svg';
import CopyIcon from '../../../assets/Icons/CopyIcon.svg';
import ChatIcon from '../../../assets/Icons/ChatGreen.svg';
import DeliveryIcon from '../../../assets/Icons/DeliveryIcon.svg';
import CheckIcon from '../../../assets/Icons/CheckIcon.svg';


import { RelatedProducts, buttonsClick, orders, slectefListCal } from "./MyOrders"
import { RouteNames } from "../../utils/RouteNames"


export const OrderDetailsScreen = ({ navigation, route }) => {
    const [type, setType] = useState(route.params.type)


    return <View style={[styles.container, { padding: 0 }]}>
        <ToolbarHeader navigation={navigation} route={route} />

        <FlatList

            ListHeaderComponent={<View style={{ paddingHorizontal: 6 }}>

                <AddressView type={route.params.status} onClick={() => {
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
            data={[orders[route.params.index]]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
                <OrderItem items={item} onClick={(click: number) => {
                    if (click == 1) {
                        navigation.navigate(RouteNames.shopHomeScreen)
                    }

                }} type={type} />
            }
            ListFooterComponent={
                <View style={{ paddingHorizontal: 6 }}>
                    <CoinWord />
                    <InformationAboutOrder onClick={() => {
                        navigation.push(RouteNames.chat_screen);

                    }} />
                    <RelatedProducts
                        onclick={() => {
                            navigation.push(RouteNames.product_detail);
                        }}
                    />
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
                data={type == 'Все' ? orders[route.params.index].actions : slectefListCal(type)}
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

    </View>
}

const InformationAboutOrder = ({ onClick }) => {

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
                <TitleWithSubTitle />
                <TouchableOpacity>
                    <CopyIcon />
                </TouchableOpacity>
            </View>
            <TitleWithSubTitle title={AppString.noteColon} subTitle="Хорошо упакуйте" marginStart={25} />
            <TitleWithSubTitle title={'J Coin'} subTitle="Заработайте 39 coints" marginStart={70} />
            <TitleWithSubTitle title={'Заказано в:'} subTitle="2022-02-02 15:43:02" marginStart={35} />
            <TitleWithSubTitle title={'Оплачено в:'} subTitle="2022-02-02 15:43:02" marginStart={35} />

            <TitleWithSubTitle title={'Доставлено в:'} subTitle="2022-02-02 15:43:02" marginStart={18} />


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

const CoinWord = () => {

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
            }]}>{'39'}</Text> Coin

        </Text>

    </View>
}


const OrderItem = ({ items, onClick, type = AppString.processing }) => {
    const [select, setSelect] = useState(0)

    return <TouchableOpacity disabled={true} onPress={() => {
        onClick(2)
    }} style={{
        marginTop: 9,
        paddingTop: 9.5,
        paddingBottom: 10.5,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
        borderRadius: 13,
        marginHorizontal: 6
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
                    alignItems: 'center'
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
                    Store name
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
        <FlatList
            data={items.products}
            scrollEnabled={false}
            ListFooterComponent={
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "space-between",
                        paddingTop: 2,
                    }}
                >
                    <View />
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black }} numberOfLines={1}>
                        {type}  <Text style={{ fontSize: 15, fontWeight: '400', color: colors.lightOrange }} numberOfLines={1}>
                            {"368с."}
                        </Text>
                    </Text>
                </View>
            }
            renderItem={({ item, index }) => (
                <View>
                    <TouchableOpacity
                        disabled={true}
                        onPress={onClick}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: '100%',
                            marginTop: 10

                        }}>

                        <Image
                            source={appIcons.shoeImageURL}
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
                                        若过度长的话只显示第一行
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
                                        light grey; XL
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
                            justifyContent: "space-between",
                            alignContent: "space-between",
                            paddingTop: 10,
                            paddingStart: 34

                        }}
                    >
                        <Text style={{ fontSize: 13, fontWeight: '400', color: colors.balc111111 }} numberOfLines={1}>
                            {AppString.delivery}  <Text style={{ fontSize: 13, fontWeight: '400', color: '#969696' }} numberOfLines={1}>
                                {`${AppString.byTrain} (28-34 дней)`}
                            </Text>
                        </Text>

                        <Text style={{ fontSize: 12, fontWeight: '400', color: '#9C9C9C' }} numberOfLines={1}>
                            {"с."}
                        </Text>
                    </View>
                </View>

            )}

        />


    </TouchableOpacity >

}

const AddressView = ({ type = '', onClick }) => {
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
                    >
                        {type == AppString.review ? 'Заказ завершен' : 'Valijon'}  {type != AppString.review ? <Text
                            style={{
                                fontSize: 12,
                                fontWeight: '400',
                                color: colors.grey9D9D9D
                            }}
                        >86-18620791015</Text> : null}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: '400',

                            color: colors.grey9D9D9D
                        }}
                    >
                        {type != AppString.review ?
                            ' Address of Xian Village Street, Tianhe, Guangzhou City, Guangdong Province' : 'Оставьте отзыв и получайте бонус!'}
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