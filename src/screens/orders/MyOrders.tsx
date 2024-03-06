import { FlatList, Image, Platform, StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import { Card } from "react-native-paper"
import { colors } from "../../utils/AppColors"
import { BackLogo, MenuLogo } from "../../components/Header"
import { AppString } from "../../utils/AppStrings"
import React, { useEffect, useState } from "react"

import SearchIcon from '../../../assets/Icons/searchIcon.svg';
import { appIcons, imagesUrl } from "../../utils/AppIcons"
import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import { RouteNames } from "../../utils/RouteNames"
import { data } from "../Product/ProductDetailScreen"
import { getAPICall } from "../../Netowork/Apis"
import { OrderAPI } from "../../Netowork/Constants"
import { CommonModal, PagingData } from "../HomeScreen"
import { ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs"

const categories = [
    'Все',
    AppString.not_paid,
    AppString.processing,
    AppString.sent,
    AppString.review
]

const notAll = [
    {
        price: 120,
        products: [1]
    }
]

const notPaid = [AppString.pay, AppString.changeAddress, AppString.cancel_the_order]
const treatment = [AppString.return_money, AppString.changeAddress]
const review = [AppString.recieved, AppString.logistics]
const sent = [AppString.estimate, AppString.logistics, AppString.delete]


const all = [
    {
        price: 120,
        products: [1],
        status: AppString.not_paid,
        actions: notPaid
    },
    {
        price: 120,
        products: [1],
        status: AppString.processing,
        actions: treatment
    },
    {
        price: 120,
        products: [1],
        status: AppString.sent,
        actions: review
    },
    {
        price: 120,
        products: [1],
        status: AppString.return_issue,
        actions: [AppString.delete_order]
    },
    {
        price: 120,
        products: [1],
        status: AppString.review,
        actions: sent
    }
]

export let orders = notAll

export const MyOrderScreen = ({ navigation, route }) => {

    const [type, setType] = useState(route.params.type)
    const [data, setData] = useState<CommonModal>()
    const [ordersList, setOrders] = useState<Array<any>>([]);
    const [pageData, setPageData] = useState<PagingData>()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        orders = type == 'Все' ? all : notAll
        getOrders()
    }, [])

    const getOrders = (page = 1) => {
        setLoading(true)
        getAPICall(OrderAPI.getOrders + page, (res: any) => {
            if (res.isSuccess) {
                if (res.data && res.data.data) {
                setOrders([...ordersList , ...res.data.data.orderDetails])
                setPageData(res.data.data.pageData)
                }
            }
            setData(res)
            setLoading(false)
        } )
    }

    const FetchMore =() => {
        console.warn(   pageData?.remaingPages > pageData?.currentPage)
        if (
            data?.isSuccess &&
            pageData &&
            pageData?.remaingPages > pageData?.currentPage && !loading
          ) {
            console.warn("hello")
            getOrders(pageData.currentPage + 1);
          }
    }

    return <View style={[styles.container, { padding: 0 }]}>

        <HeaderWithSearch navigation={navigation} type={type ? type : 'Все'} onClick={(item: string) => {
            orders = item == 'Все' ? all : notAll
            setType(item)

        }} />
        { data && data.isSuccess && data.data ?
         <ScrollView>
        <FlatList
            data={ordersList}
            style={{ paddingHorizontal: 6 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item, index }) =>
                <OrderItem type={type} navigation={navigation} items={item} onClick={(click: number) => {

                    if (click == 1) {//Shop Click
                        navigation.navigate(RouteNames.shopHomeScreen)
                    } else if (click == 2) {// Order Details
                        if (item.status != AppString.return_issue) {
                            navigation.navigate(RouteNames.orderDetails, { index: index, type: type, status: type == 'Все' ? item.status : type })
                        } else {
                            navigation.navigate(RouteNames.refund_details)
                        }
                    }
                }} />
            }
            ListFooterComponent={
               <View>
                { loading ? 
                    <ProgressView ht={undefined} />
                   : data?.isSuccess ? null : 
                    <RetryWhenErrorOccur
                      ht={120}
                      data={data}
                      onClick={() => {
                       getOrders(1)
                      }}
                    />
                 }
               
                </View>
            }
            
              onEndReached={FetchMore}
        /> 
        <RelatedProducts
        onclick={() => {
            navigation.push(RouteNames.product_detail);
        }}
        />
        </ScrollView>
        : 
        loading ? <ProgressView /> :
         <RetryWhenErrorOccur data={data} onClick={() => {
            setData(undefined)
            setPageData(undefined)
            setOrders([])
            getOrders()
        }} /> 
}
    </View>
}



export const RelatedProducts = ({ onclick }) => {
    return (
        <View style={{ marginBottom: 100, paddingStart: 6, }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
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
                                marginEnd: 6,
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
                    {items.storeName}
                </Text>
                <ChevronFwdOutline
                    color={colors.extraGrey}
                    width={10}
                    height={10}
                    style={{ marginTop: 4 }}
                />

            </TouchableOpacity>

            <Text
                style={{
                    color: colors.lightOrange, fontSize: 17, fontWeight: '400',
                }}
            >
                {
                    getButtonType(type == 'Все' ? items.status : type)
                }
            </Text>
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
                            source={{uri: items.productImage}}
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
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.black }} numberOfLines={1}>
                            {type == 'Все' ? items.status : type}  <Text style={{ fontSize: 17, fontWeight: '400', color: colors.balc111111 }} numberOfLines={1}>
                                {items.totalPrice}c.
                            </Text>
                        </Text>
                    </View>



                </View>

            {/* )} */}

        {/* /> */}

        <FlatList
            data={type == 'Все' ? items.actions : slectefListCal(type)}
            style={{ marginTop: 10 }}
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
                        borderColor: select === index ? colors.lightOrange : colors.greyCCCCCC
                    }} onPress={() => {
                        buttonsClick(navigation, item)
                    }
                    }>
                    <Text
                        style={{
                            fontSize: 14,
                            color: select === index ? colors.lightOrange : colors.black,
                        }}>
                        {item}
                    </Text>
                </TouchableOpacity>}
        />
    </TouchableOpacity >

}

export const buttonsClick = (navigation, type) => {
    console.log(type);

    if (type == AppString.pay) {
        navigation.push(RouteNames.cartConfirmOrder)
    } else if (type == AppString.changeAddress) {
         navigation.push(RouteNames.changeAddress)
    }
    else if (type == AppString.cancel_the_order) {
        // navigation.push(RouteNames.cartConfirmOrder)
    }
    else if (type == AppString.logistics) {
        navigation.push(RouteNames.logistic_screen)

    }
    else if (type == AppString.return_money) {
         navigation.push(RouteNames.select_return_region)

    }
    else if (type == AppString.recieved) {
        // navigation.push(RouteNames.cartConfirmOrder)

    }
    else if (type == AppString.delete) {
        // navigation.push(RouteNames.cartConfirmOrder)

    }
    else if (type == AppString.estimate) {
     navigation.push(RouteNames.review)

    }

}

export const slectefListCal = (type: string) => {
    if (type == AppString.processing) {
        return treatment
    } else if (type == AppString.review) {
        return review
    }
    else if (type == AppString.sent) {
        return sent
    } else {
        return notPaid
    }

}

const getButtonType = (type: string) => {
    if (type == AppString.not_paid || type == 'Все') {
        return AppString.awaiting_payment
    } else if (type == AppString.review) {
        return AppString.completed
    } else {
        return type
    }
}


const HeaderWithSearch = ({ navigation, type = 'Все', onClick }) => {

    const [select, setSelect] = useState(type)

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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackLogo navigation={navigation} />
                <SearchView />
            </View>
            <MenuLogo />
        </View>

        <FlatList
            data={categories}
            style={{ marginTop: 10 }}
            showsHorizontalScrollIndicator={false}
            horizontal
            renderItem={({ item, index }) =>
                <TouchableOpacity style={{ marginEnd: 10 }} onPress={() => {
                    onClick(item)
                    setSelect(item.toString())
                }
                }>
                    <Text
                        style={{
                            fontSize: 16,
                            color: select === item.toString() ? colors.lightOrange : colors.black,
                        }}>
                        {item}
                    </Text>
                </TouchableOpacity>}
        />
    </Card>
}


const SearchView = ({ placeholder = AppString.city_name }) => {
    const [search, setSearch] = useState('');

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: colors.whiteF6F6F6,
                borderRadius: 20,
                marginStart: 10,
                marginEnd: -10
            }}>
            <SearchIcon
                width={17}
                height={17}
                style={{ marginStart: 15 }}
                color={colors.grey}
            />
            <TextInput
                value={search}
                placeholder={'Search'}
                style={[style.searchTextInput, {
                    width: placeholder == AppString.city_name ? '80%' : '86%',
                }]}
                placeholderTextColor={colors.grey}
                onChangeText={text => {
                    setSearch(text);
                }}
            />
        </View>
    );
};


const style = StyleSheet.create({
    searchTextInput: {
        height: 33,
        width: '80%',
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 0,
        paddingStart: 10
    },
});
