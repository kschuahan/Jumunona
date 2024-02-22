import { Dimensions, FlatList, Platform, Text, TouchableOpacity, View } from "react-native"
import { styles } from "../../utils/AppStyles"
import React, { useEffect, useState, } from "react";
import { AppString } from "../../utils/AppStrings";

import EditIcon from '../../../assets/Icons/editIcon.svg';
import ChevronBackOutlineIcon from '../../../assets/Icons/chevronBackOutline.svg';
import WhitePlus from '../../../assets/Icons/WhitePlus.svg';

import { BackLogo, LogoTitle } from "../../components/Header";
import { colors } from "../../utils/AppColors";
import EditAddreess from '../../../assets/Icons/EditAddreess.svg';
import { ScrollView } from "react-native-virtualized-view";
import LinearGradient from "react-native-linear-gradient";
import { RouteNames } from "../../utils/RouteNames";
import OrangeCheck from '../../../assets/Icons/CheckOrange.svg';

import CheckmarkCircle from '../../../assets/Icons/CircleOrange.svg';
import EllipsisHorizontalNormal from '../../../assets/Icons/CircleGrey.svg';
import HomeAddress from '../../../assets/Icons/HomeAddress.svg';
import { CenterProgressView, DeleteAddress, ProgressView, RetryWhenErrorOccur } from "../../components/Dialogs";
import { useIsFocused } from "@react-navigation/native";
import { getAPICall, postAPICall } from "../../Netowork/Apis";
import { AddressAPIs } from "../../Netowork/Constants";
import { CommonModal } from "../HomeScreen";
let isEditedButton = false

export const MyAddressesScreen = ({ navigation }) => {

    const [isEdited, setisEdited] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)
    const [addressList, setAddressList] = useState()
    const [data, setData] = useState<CommonModal>()
    const [deletingAddressId, setDeletingAddressId] = useState('')
    const [selectedAddress, setSelectedAddress] = useState<any>()

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
            setActionLoading(false)
        })
    }

    const setDefaultAddress = () => {
        if (selectedAddress && !selectedAddress.defaultAddress) {
            setActionLoading(true)
            postAPICall({
                updateAdress: true,
                city: selectedAddress.city,
                state:selectedAddress.state,
                country: selectedAddress.country,
                address: selectedAddress.address,
                defaultAddress: true,
                name: selectedAddress.name,
                phone: selectedAddress.phone,
                addressId: selectedAddress._id
            },
            AddressAPIs.addAddress, 
            true,
            (res: any) => {
                
              console.warn(res.data.data)
              getAddresses() 
            })
        }
    }

    const deleteAddress = () => {
        setActionLoading(true)
      postAPICall({
        addressIds: [deletingAddressId]
      },
      AddressAPIs.deleteAddress, 
      true,
      (res: any) => {
        getAddresses()
      })
    }

    return <View style={[styles.container, { padding: 0 }]} >
        <CustomHeader navigation={navigation} isEdited={isEdited} onRighButtonClick={() => {
            if (isEdited) {
                setDefaultAddress()
            }
            isEditedButton = !isEditedButton
            setisEdited(!isEdited)
        }} />


        {data?.isSuccess && data.data && data.data.data ?

            <View style={{ paddingTop: 9, paddingHorizontal: 6, paddingBottom: 20, flex: 1 }}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={addressList}
                    ListEmptyComponent={
                        <Text style={[styles.textStyle, {
                            color: colors.lightOrange,
                            paddingVertical: 100,
                            fontSize: 16, fontWeight: 'bold', textAlign: 'center'
                          }]}>Нет сохраненного адреса</Text>
                    }
                    renderItem={({ item, index }) =>
                        <AddressInflate item={item} defaultAdd= {selectedAddress != undefined ? selectedAddress : undefined} onClick={(click: number) => {
                            if (click == 1) {// edit address
                                navigation.navigate(RouteNames.addAndEditpassword, { address: item })
                            } else if (click == 2) {
                                // Mark address as default
                                for (let i = 0; i < addressList.length; i++) {
                                   // addressList[i].defaultAddress = i == index
                                    setSelectedAddress(addressList[index])
                                }
                                setRefresh(!refresh)
                            } else {
                                // delete addess
                                setDeletingAddressId(item._id)
                                setShowDeleteConfirmPopup(true)
                            }

                        }} />}
                />

                <View
                    style={{
                        backgroundColor: colors.white,
                        position: 'absolute',
                        bottom: 0,
                        width: Dimensions.get('window').width,
                        paddingVertical: 12,
                        paddingTop: 6,
                        paddingHorizontal: 10,
                        borderTopStartRadius: 13,
                        borderTopEndRadius: 13,
                        shadowColor: colors.black,
                        elevation: 10,
                        height: 78,
                        borderBlockColor: colors.whiteF7F7F7,
                    }}>
                </View>

                <CommonButton
                    onClick={() => {
                        // setBuyShow(true);
                        navigation.navigate(RouteNames.addAndEditpassword)
                    }}
                />
                <DeleteAddress isShow={showDeleteConfirmPopup} onCancel={() => {

                    setShowDeleteConfirmPopup(false)
                }} onConfirm={() => {
                    deleteAddress()
                    setShowDeleteConfirmPopup(false)

                }} />


            </View> :
            loading ? <ProgressView /> : <RetryWhenErrorOccur data={data} onClick={() => {
                setData(undefined)
                getAddresses()
            }}
            />
        }
    <CenterProgressView isShow={actionLoading} />
    </View>
}


const CommonButton = ({
    text = AppString.default,
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
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row'
                }}>
                <WhitePlus />
                <Text
                    style={[
                        styles.textStyle,
                        { color: colors.white, fontWeight: '400', fontSize: 16, marginStart: 9 },
                    ]}>
                    {text}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};


const AddressInflate = ({ item, defaultAdd, onClick }) => {

    return <View style={{
        padding: 10, borderRadius: 13, backgroundColor: 'white', marginBottom: 8
    }}>
        <TouchableOpacity disabled={true} style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                {item.defaultAddress ? <HomeAddress /> : <View style={{
                    height: 32, width: 32, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: colors.orangeFDF1EC, borderRadius: 16
                }}>
                    <Text style={[styles.textStyle, {
                        color: colors.lightOrange,
                        fontWeight: 'bold', fontSize: 17
                    }]}>{item.name.charAt(0).toUpperCase()}</Text>
                </View>}

                <View style={{
                    marginStart: 11,
                    width: '80%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle, {
                             color: colors.black121212,
                            fontWeight: 'bold', fontSize: 17, textTransform: 'capitalize'
                        }]}>{item.name}</Text>
                        <Text style={[styles.textStyle, {
                            color: '#8F8F8F',
                            fontSize: 13, marginStart: 4
                        }]}>{item.phone}</Text>

                        {item.defaultAddress ? <View style={{
                            borderRadius: 9,
                            borderColor: colors.lightOrange,
                            borderWidth: 0.5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 18.5,
                            width: 93,
                            marginStart: 9,
                            backgroundColor: '#FDF1EC'
                        }}>
                            <Text style={{ fontSize: 11, fontWeight: '400', color: colors.lightOrange }} numberOfLines={2}>
                                {AppString.similar}
                            </Text>
                        </View> : null}
                    </View>
                    <Text style={[styles.textStyle, {
                        color: '#3F3F3F',
                        fontSize: 15
                    }]}>{item.addressDetail} {" "} {item.city} {" "} {item.state} {" "} {item.country}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => { onClick(1) }}>
                <EditAddreess />
            </TouchableOpacity>
        </TouchableOpacity>
        {isEditedButton ? <View>
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#D9D9D9', marginVertical: 10 }} />
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <TouchableOpacity onPress={() => {
                    onClick(2)

                }} style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <RadioButtons isCheck={defaultAdd ? item._id == defaultAdd._id : item.defaultAddress} onClick={() => {
                        onClick(2)
                    }}
                    />
                    <Text style={[styles.textStyle, {
                        color: '#606060',
                        fontSize: 14, marginStart: 5
                    }]}>{AppString.default}</Text></TouchableOpacity>

                <TouchableOpacity onPress={() => { onClick(3) }}>
                    <Text style={[styles.textStyle, {
                        color: '#606060',
                        fontSize: 14
                    }]}>{AppString.delete}</Text>
                </TouchableOpacity>
            </View>
        </View> : null}
    </View>
}

const RadioButtons = ({ isCheck = false, onClick }) => {
    return true ? <TouchableOpacity onPress={onClick}>{isCheck ? (
        <CheckmarkCircle width={17} height={17} color={colors.lightOrange} />
    ) : (
        <EllipsisHorizontalNormal width={17} height={17} />
    )}</TouchableOpacity> : null
}

const CustomHeader = ({ navigation, isEdited, onRighButtonClick }) => {

    return (<View
        style={{
            elevation: 2,
            paddingHorizontal: 13,
            paddingEnd: 12,
            backgroundColor: colors.white,
            borderTopEndRadius: 0,
            borderTopStartRadius: 0,
            paddingTop: Platform.OS == 'ios' ? 20 : 20,
            paddingBottom: 5,
            marginBottom: 4
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <BackLogo navigation={navigation} />
            <LogoTitle title={AppString.my_addresses} />
            <TouchableOpacity onPress={onRighButtonClick} style={{ alignItems: 'center' }}>
                {isEdited ? <OrangeCheck /> : <EditIcon width={15} height={15} />}
            </TouchableOpacity>
        </View>
    </View>
    )
}