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
import { DeleteAddress } from "../../components/Dialogs";
import { useIsFocused } from "@react-navigation/native";
let isEditedButton = false
interface AddreessModal {
    id: number;
    type: String;
    name: String;
    mobile: String;
    address: String;
    isDefault: boolean;
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
        isDefault: true,
        reasion: 'Tajikistan Khujand'
    },
    {
        id: 2,
        type: 'work',
        name: 'Nalive',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 3,
        type: 'work',
        name: '李小龙',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 4,
        type: 'work',
        name: '李小龙',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 5,
        type: 'work',
        name: '李小龙',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 6,
        type: 'work',
        name: '李小龙',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    },
    {
        id: 7,
        type: 'work',
        name: '李小龙',
        mobile: '18088008045',
        address: '广东省广州市天河区 街道街道 路路路 88号栋楼小区g1区5450房',
        isDefault: false,
        reasion: 'Tajikistan Khujand'


    }
]

export const MyAddressesScreen = ({ navigation }) => {

    const [isEdited, setisEdited] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [show, setShow] = useState(false)
    const isFocused = useIsFocused();


    useEffect(() => {
        setRefresh(!refresh)
    }, [isFocused])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <View style={{ marginBottom: -10 }}><LogoTitle title={AppString.my_addresses} /></View>,
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    if (isEdited) {
                        navigation.goBack()
                    }
                    isEditedButton = !isEditedButton
                    setisEdited(!isEdited)

                }} style={{ alignItems: 'center' }}>
                    {isEdited ? <OrangeCheck /> : <EditIcon width={15} height={15} />}
                </TouchableOpacity>
            ),

            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ alignItems: "flex-end", flexDirection: "column" }}>
                    <ChevronBackOutlineIcon width={15} height={15} />
                </TouchableOpacity>
            ),
        });
    });

    return <View style={[styles.container, {padding: 0}]} >
        <CustomHeader navigation={navigation} isEdited={isEdited} onRighButtonClick = { () => {
             if (isEdited) {
                navigation.goBack()
            }
            isEditedButton = !isEditedButton
            setisEdited(!isEdited)
        }} />
        <View style ={ { paddingTop: 9, paddingHorizontal: 6, paddingBottom: 78 }}>
        
        <FlatList
            showsVerticalScrollIndicator={false}
            data={addressList}
            renderItem={({ item, index }) =>
                <AddressInflate item={item} onClick={(click: number) => {
                    if (click == 1) {// edit address
                        navigation.navigate(RouteNames.addAndEditpassword, { data: item, index: index })
                    } else if (click == 2) {// Mark address as default
                        for (let i = 0; i < addressList.length; i++) {
                            addressList[i].isDefault = i == index
                        }
                        setRefresh(!refresh)
                    } else {// delete addess
                        pos = index
                        setShow(true)
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

            <CommonButton
                onClick={() => {
                    // setBuyShow(true);
                    navigation.navigate(RouteNames.addAndEditpassword)
                }}
            />



        </View>

        <DeleteAddress isShow={show} onCancel={() => {
            setShow(false)
        }} onConfirm={() => {
            addressList.splice(pos, 1)
            setShow(false)

        }} />
    </View>
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


const AddressInflate = ({ item, onClick }) => {

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
                {item.type == 'home' ? <HomeAddress /> : <View style={{
                    height: 32, width: 32, justifyContent: 'center',
                    alignItems: 'center', backgroundColor: colors.orangeFDF1EC, borderRadius: 16
                }}>
                    <Text style={[styles.textStyle, {
                        color: colors.lightOrange,
                        fontWeight: 'bold', fontSize: 17
                    }]}>{item.name.charAt(0)}</Text>
                </View>}

                <View style={{
                    marginStart: 11,
                    width: '80%'
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.textStyle, {
                            color: colors.black121212,
                            fontWeight: 'bold', fontSize: 17
                        }]}>{item.name}</Text>
                        <Text style={[styles.textStyle, {
                            color: '#8F8F8F',
                            fontSize: 13, marginStart: 4
                        }]}>{item.mobile}</Text>

                        {item.isDefault ? <View style={{
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
                    }]}>{item.address}</Text>
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
                    <RadioButtons isCheck={item.isDefault} onClick={() => {
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

    return ( <View
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