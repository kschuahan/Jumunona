import React, { useEffect, useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import { AppString } from "../../utils/AppStrings";
import { CustomHeader, LogoTitle } from "../../components/Header";
import EllipsisHorizontalIcon from '../../../assets/Icons/ellipsis-horizontal.svg';
import { styles } from "../../utils/AppStyles";
import { ScrollView } from "react-native-virtualized-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import CautionIcon from '../../../assets/Icons/Caution.svg';
import { colors } from "../../utils/AppColors";
import { fontFamily } from "../../utils/Fonts";
import HomeAddress from '../../../assets/Icons/HomeAddress.svg';
import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import LinearGradient from "react-native-linear-gradient";
import { RouteNames } from "../../utils/RouteNames";
import ChevronFwdOutline from '../../../assets/Icons/chevronForwardOutline.svg';
import { useIsFocused } from "@react-navigation/native";
import { getAPICall } from "../../Netowork/Apis";
import { AddressAPIs } from "../../Netowork/Constants";
import { CommonModal } from "../HomeScreen";
import { ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs";

interface AddreessModal {
    id: number;
    type: String;
    name: String;
    mobile: String;
    address: String;
    isSelected: boolean;
    reasion: string
}
let pos = 0;
export const addressList: AddreessModal[] = [
    {
        id: 1,
        type: 'home',
        name: 'Nazir',
        mobile: '18088008045',
        address: 'Tianhe District, Guangzhou City, Room 5450, Area G1, Building 88',
        isSelected: true,
        reasion: 'Tajikistan Khujand'
    },
    {
        id: 2,
        type: 'work',
        name: 'Nalive',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isSelected: false,
        reasion: 'Tajikistan Khujand'


    },

]
export const ChangeAddressScreen = ({ navigation }) => {


    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState<CommonModal>()

    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false)
    const [deletingAddressId, setDeletingAddressId] = useState('')
    const [selectedAddress, setSelectedAddress] = useState<any>()
    const [addressList, setAddressList] = useState()

    useEffect(() => {
        setRefresh(!refresh)
        getAddresses()
    }, [isFocused])


    const getAddresses = () => {
        setLoading(true)
        getAPICall(AddressAPIs.getAddresses, (res: any) => {
            setData(res)
            if (res?.isSuccess && res.data && res.data.data) {
                // console.warn(res.data.data)
                setAddressList(res.data.data ?? [])
            }
            setLoading(false)
            //  setActionLoading(false)
        })
    }

    return (
        <View style={{
            flex: 1,
        }}>


            <CustomHeader navigation={navigation} title={AppString.changeAddress} />
            {data?.isSuccess && data.data && data.data.data ?
                <View
                    style={{
                        flex: 1,
                        paddingBottom: 72
                    }}
                >
                    <ScrollView
                        style={{

                        }}
                        showsVerticalScrollIndicator={false}>
                        <CautionView />
                        <SorceAddressView data={addressList} />
                        <AddressesView data={addressList} onViewAllAddress={() => {
                            navigation.navigate(RouteNames.myAddress)
                        }} />

                    </ScrollView>
                </View>
                : loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
                    setData(undefined)
                    getAddresses()
                }}
                />}
            <CommonButton
                text={AppString.confirm_changes}
                startorange={colors.startOrange}
                endColor={colors.endOrange}
                onClick={() => {
                    navigation.goBack()
                }}
            />

        </View>


    )
}

const CautionView = () => {
    return (
        <View
            style={{
                backgroundColor: Colors.white,
                borderRadius: 13,
                marginTop: 9,
                marginHorizontal: 6,
                padding: 8,
                paddingBottom: 20,
                flexDirection: "row",
                gap: 7,
                justifyContent: "center",
                alignItems: "center"

            }}
        >
            <CautionIcon />
            <Text
                style={{
                    color: colors.lightOrange,
                    fontSize: 13,
                    fontFamily: fontFamily.regular,
                    width: "92%"
                }}
            >
                Изменение заказа может повлиять на время доставки и предоставляемые услуги, и может быть выполнено только по изначальной цене. Обратите внимание, что изменения разрешены только один раз после оплаты. Если товар уже был обменен или отправлен, или изменились стоимость доставки, изменения могут быть невозможны. Приносим извинения за возможные неудобства.
            </Text>
        </View>
    )
}

const SorceAddressView = ({ data }) => {
    return (data && data.length > 0 ?
        <View
            style={{
                margin: 15,
                gap: 12
            }}
        >
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,
                    fontWeight: "bold",

                }}
            >
                {AppString.source_address}:
            </Text>
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,

                }}
            >
                {data[0].addressDetail}
            </Text>
            <Text
                style={{
                    color: colors.black636363,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,

                }}
            >
                Valijon {data[0].phone}
            </Text>
        </View>
        : null
    )
}

const AddressesView = ({ data, onViewAllAddress }) => {
    const [selectedIndex, setSelectedIndex] = useState(0)
    return (
        <View
            style={{
                backgroundColor: Colors.white,
                borderRadius: 13,
                marginTop: 14,
                marginHorizontal: 6,
                paddingHorizontal: 13,
                paddingVertical: 22
            }}
        >
            <Text
                style={{
                    color: colors.black0B0B0B,
                    fontSize: 18,
                    fontFamily: fontFamily.regular,
                    fontWeight: "bold",

                }}
            >
                {AppString.select_new_Address}:
            </Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item, index }) =>
                    <AddressInflate item={item} isSelected={index == selectedIndex} onClick={() => {
                        setSelectedIndex(index)
                    }} />}
            />
            {data && data.length > 2 ? <TouchableOpacity
                onPress={onViewAllAddress}
                style={{
                    alignSelf: "center"
                }}
            >
                <Text
                    style={{
                        color: colors.black0B0B0B,
                        fontSize: 16,
                        fontFamily: fontFamily.regular,
                        marginTop: 15

                    }}
                >
                    {AppString.all_address}
                    <ChevronFwdOutline
                        color={colors.extraGrey}
                        width={10}
                        height={10}
                        style={{ marginTop: 4 }}
                    />
                </Text>
            </TouchableOpacity> : null}
        </View>
    )
}

const AddressInflate = ({ item, isSelected, onClick }) => {
    return (
        <TouchableOpacity
            style={{
                marginVertical: 14
            }}
            onPress={onClick}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {item.type == 'home' ? <HomeAddress /> : <View style={{
                    height: 32, width: 32, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: colors.orangeFDF1EC, borderRadius: 16
                }}>
                    <Text style={[styles.textStyle, {
                        color: colors.lightOrange,
                        fontWeight: 'bold', fontSize: 17, textTransform: 'capitalize'
                    }]}>{item.name.charAt(0)}</Text>
                </View>}

                <View style={{
                    marginStart: 11,
                    gap: 6,
                    width: '80%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle, {
                            color: colors.black121212,
                            fontWeight: 'bold', fontSize: 18, textTransform: 'capitalize'
                        }]}>{item.name}</Text>
                        <Text style={[styles.textStyle, {
                            color: '#8F8F8F',
                            fontSize: 13, marginStart: 4
                        }]}>{item.phone}</Text>
                    </View>
                    <Text style={[styles.textStyle, {
                        color: '#3F3F3F',
                        fontSize: 15
                    }]}>{item.addressDetail}</Text>
                </View>
                {
                    isSelected ? <CheckmarkCircle /> : <EllipsisHorizontalNormal />
                }
            </View>

        </TouchableOpacity>
    )
}


const CommonButton = ({
    text,
    endColor = colors.endOrange,
    startorange = colors.startOrange,
    onClick,
}) => {
    return (
        <View
            style={{
                backgroundColor: colors.white,
                paddingHorizontal: 12,
                paddingTop: 7,
                borderTopLeftRadius: 13,
                borderTopRightRadius: 13,
                position: "absolute",
                bottom: 0,
                flex: 1,
                width: "100%",
                paddingBottom: 20
            }}
        >
            <TouchableOpacity
                onPress={onClick}
            >
                <LinearGradient
                    colors={[startorange, endColor]}
                    start={{ x: 0.4, y: 0 }}
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
                            { color: colors.white, fontWeight: 'bold', fontSize: 14 },
                        ]}>
                        {text}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};
